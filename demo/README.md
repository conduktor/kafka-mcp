# Try it in two minutes

A Kafka cluster, Conduktor Console and the MCP endpoint, running locally.

```bash
cd demo
docker compose up -d
```

Console comes up on [localhost:8080](http://localhost:8080) — `admin@conduktor.io` /
`adminP4ss!` — with a cluster already connected and seeded:

| | |
| --- | --- |
| `orders` | 6 partitions, 400 records, fully consumed by `order-processor` |
| `clickstream` | 12 partitions, 900 records, `analytics-etl` is behind |
| `payments`, `shipments`, `audit-events` | smaller topics |
| `legacy-imports` | no producer, no consumer — the reclaim candidate |

## Point an assistant at it

Create a Personal Access Token in Console (**Settings → API keys**), then:

```json
{
  "mcpServers": {
    "conduktor-demo": {
      "command": "npx",
      "args": ["-y", "@conduktor/mcp"],
      "env": {
        "CONDUKTOR_CONSOLE_URL": "http://localhost:8080",
        "CONDUKTOR_API_TOKEN": "paste-your-token"
      }
    }
  }
}
```

Then ask it things that have an answer in this estate:

> *Which topics is nobody consuming?*
> *Which consumer group is falling behind, and by how much?*
> *What's the partition skew on clickstream?*
> *Show me the last few orders.*

`legacy-imports` and `analytics-etl` exist so those questions return something
interesting rather than an empty list.

## Checking the endpoint by hand

```bash
curl -s -o /dev/null -w '%{http_code}\n' -X POST http://localhost:8080/api/mcp
# 401 — the endpoint is up and refusing an unauthenticated call
```

## Notes

Console runs on the **Free plan** here. MCP is enabled by default, so the tools work without a
licence, but a handful that sit behind licensed features (chargeback, lineage) will not return
data on this stack.

Redpanda stands in for Kafka: one container instead of a broker plus a controller, healthy in
seconds, and the wire protocol is identical as far as the tools are concerned.

```bash
docker compose down -v   # when you're done
```
