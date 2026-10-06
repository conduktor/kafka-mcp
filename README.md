# Conduktor MCP Server

An MCP server for Apache Kafka, built into [Conduktor Console](https://www.conduktor.io/console).

Connect Claude, Cursor, or any MCP-compatible client to your Kafka clusters and ask about
topics, consumer groups, schemas and cluster health in natural language. Metadata is served by
your own Console instance, so it stays inside your network.

There is nothing to deploy. The MCP endpoint ships with Console.

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

## Permissions

Every tool is read-only.

The server acts as the user behind the token: it inherits that user's Console RBAC, and can
only reach clusters, topics and subjects that user is already allowed to read. Scope the token
to what you intend the assistant to see.

## Documentation

- [MCP server guide](https://docs.conduktor.io/guide/conduktor-in-production/automate/mcp)
- [Product page](https://www.conduktor.io/mcp)
- [Console documentation](https://docs.conduktor.io/)

## Issues

This repository documents the MCP server and carries its registry metadata. For bugs in the
server itself, use Conduktor support or the [documentation feedback](https://docs.conduktor.io/)
channel.
