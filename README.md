# Conduktor MCP Server

An MCP server for Apache Kafka, built into [Conduktor Console](https://www.conduktor.io/console).

Connect Claude, Cursor, or any MCP-compatible client to your Kafka clusters and ask about
topics, consumer groups, schemas and cluster health in natural language. Metadata is served by
your own Console instance, so it stays inside your network.

There is nothing to deploy. The MCP endpoint ships with Console, behind the RBAC, audit trail
and ownership rules you already run — which is what makes giving an assistant real access
reasonable in the first place.

## Setup

1. Create a Personal Access Token in Console.
2. Point your MCP client at your Console URL:

```json
{
  "mcpServers": {
    "conduktor-console": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://console.acme-corp.com/api/mcp",
        "--header",
        "Authorization: Bearer ${CONDUKTOR_API_TOKEN}"
      ],
      "env": {
        "CONDUKTOR_API_TOKEN": "your-personal-access-token"
      }
    }
  }
}
```

Replace `console.acme-corp.com` with your own Console hostname. The endpoint is `/api/mcp`.

## Tools

| Tool | What it does |
| --- | --- |
| `list-clusters` | List all Kafka clusters available in Conduktor |
| `get-cluster` | Get details about a specific cluster by its slug |
| `list-topics-with-usage` | List topics with usage metrics (message count, size, rates) |
| `get-last-messages` | Retrieve the last N messages from a topic (up to 100) |
| `insights-cluster` | Cluster health summary and serialization format breakdown |
| `insights-topics` | Topic insights — partition skew, replication issues |
| `list-subject-names` | List subject names in a cluster, filterable by schema type |
| `list-consumer-groups` | List consumer groups with state, lag and member count |
| `list-consumer-groups-by-topic` | List consumer groups consuming from a specific topic |
| `list-interceptors` | List interceptors configured in a cluster (requires Conduktor Gateway) |

## Control plane, not data plane

What reaches the model is metadata: topics, configs, offsets, consumer groups, schemas,
connectors, audit. Your records stay in Kafka unless a tool that reads them is explicitly in
play — `get-last-messages` is the only one above that touches the data plane, and it is capped.

That distinction is the point. An assistant that reasons about how your platform is *run*
needs ownership, lag, skew and history. It does not need your customers' payloads.

## One endpoint, two kinds of client

The same MCP catalogue serves your own tools — Claude Code, Cursor, a script, your internal
developer platform — and the agents Conduktor runs inside Console on a schedule or on an
audit-log event. Same tools, same RBAC, same audit trail, whether the caller is a human at a
terminal or an unattended task running at 9am on a Monday.

Which matters more than it sounds: it means automating a Kafka chore does not require handing
a service account to a script. It goes through the same bounded identity as everything else.

## What's next

The table above is what ships today, and it is deliberately the read-only slice.

The surface is expanding towards agents that do the operational work — finding reclaimable
topics, attributing cost, chasing unowned topics, nursing failed connectors — and towards
write operations, where the assistant proposes a mutation with its intent stated and a human
signs it off. Acting, not just reporting.

Watch the [release notes](https://docs.conduktor.io/guide/release-notes) for what lands when.

## Permissions

**The tools listed above are read-only.**

The server acts as the user behind the token: it inherits that user's Console RBAC, and can
only reach clusters, topics and subjects that user is already allowed to read. Scope the token
to what you intend the assistant to see.

RBAC is what holds when write lands, which is the point of running this through Console rather
than against the brokers: permissions, audit and ownership are already there.

## Documentation

- [MCP server guide](https://docs.conduktor.io/guide/conduktor-in-production/automate/mcp)
- [Product page](https://www.conduktor.io/mcp)
- [Console documentation](https://docs.conduktor.io/)

## Issues

This repository documents the MCP server and carries its registry metadata. For bugs in the
server itself, use Conduktor support or the [documentation feedback](https://docs.conduktor.io/)
channel.
