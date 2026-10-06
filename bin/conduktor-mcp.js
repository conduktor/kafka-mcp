#!/usr/bin/env node
/**
 * Thin launcher around mcp-remote.
 *
 * The endpoint lives on each customer's own Console, so there is no URL we can
 * hardcode. What this does earn over calling mcp-remote directly is failing
 * loudly and early: an MCP server that starts and then returns nothing useful
 * is painful to debug from inside a chat client, where stderr is often the only
 * channel you get and nobody reads it until something is already wrong.
 */

import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const PROG = "conduktor-mcp";

function die(message, hint) {
  console.error(`${PROG}: ${message}`);
  if (hint) console.error(`\n${hint}`);
  process.exit(1);
}

const rawUrl = process.env.CONDUKTOR_CONSOLE_URL ?? process.argv[2];
const token = process.env.CONDUKTOR_API_TOKEN;

if (!rawUrl) {
  die(
    "no Console URL",
    [
      "Set CONDUKTOR_CONSOLE_URL to your Console, or pass it as the first argument:",
      "",
      "  CONDUKTOR_CONSOLE_URL=https://console.acme-corp.com \\",
      "  CONDUKTOR_API_TOKEN=<personal access token> \\",
      `  npx ${PROG}`,
    ].join("\n"),
  );
}

if (!token) {
  die(
    "no API token",
    "Set CONDUKTOR_API_TOKEN. Create a Personal Access Token in Console under Settings.",
  );
}

let base;
try {
  base = new URL(rawUrl);
} catch {
  die(`'${rawUrl}' is not a valid URL`, "Expected something like https://console.acme-corp.com");
}

if (base.protocol !== "https:" && base.hostname !== "localhost") {
  // The token is a bearer credential; over plain http it is on the wire in clear.
  die(
    `refusing to send your token over ${base.protocol}//`,
    "Use https, or localhost if you are pointing at a local Console.",
  );
}

// Accept both the Console root and a URL already ending in /api/mcp, so pasting
// either out of the docs works.
const path = base.pathname.replace(/\/+$/, "");
const endpoint = path.endsWith("/api/mcp")
  ? `${base.origin}${path}`
  : `${base.origin}${path}/api/mcp`;

const require = createRequire(import.meta.url);
let mcpRemote;
try {
  mcpRemote = require.resolve("mcp-remote/dist/proxy.js");
} catch {
  die("could not resolve mcp-remote", "Reinstall the package: npm i -g @conduktor/mcp");
}

const child = spawn(
  process.execPath,
  [mcpRemote, endpoint, "--header", `Authorization: Bearer ${token}`, ...process.argv.slice(3)],
  { stdio: "inherit" },
);

child.on("error", (err) => die(`failed to start mcp-remote: ${err.message}`));
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});
