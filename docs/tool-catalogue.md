# Full tool catalogue (31 tools)

Generated from `mcp-tools.json` at the root of `conduktor/console-plus`, which is kept in step
with the code by a coverage test. Regenerate rather than hand-edit.

The README currently documents the ten tools listed on docs.conduktor.io. This is everything
Console exposes today.

### Clusters

| Tool | What it does |
| --- | --- |
| `list-clusters` | List the Kafka clusters this Console manages: for each, its slug, name, bootstrap servers, Schema Registry, Kafka Connect clusters (with their connectSlug) and flavor (Gateway,… |
| `get-cluster` | One cluster's registration by slug: name, bootstrap servers, Schema Registry URL, Kafka Connect clusters (name, slug, url), ksqlDBs and flavor (Gateway with its admin URL, or nu… |
| `insights-cluster` | The health and shape of a whole cluster in one call: healthScore (0-100), how many topics, partitions and consumer groups it has, how those topics split across user, internal an… |

### Topics

| Tool | What it does |
| --- | --- |
| `list-topics` | Topic catalogue entries of a cluster, paged: for each topic its metadata (name, labels, description) and spec (partitions, replicationFactor, configs such as retention.ms and cl… |
| `get-topic` | One topic's catalogue entry by exact name: metadata (name, cluster, labels, description) and spec (partitions, replicationFactor, configs such as retention.ms and cleanup.policy). |
| `list-topics-with-usage` | Topics of a cluster with usage, paged and sortable: name, partitionCount, replicationFactor, recordCount, topicSize (bytes), cleanupPolicy, retention, minIsr, labels, tags, last… |
| `query-topics` | Query the topic catalogue of one Kafka cluster: filter on any indexed attribute, project only the fields you need, sort and paginate. |
| `aggregate-topics` | Group the topics of one Kafka cluster and compute one statistic per group: a count, or the sum, average, minimum or maximum of a numeric field. |
| `insights-topics` | Everything worth flagging about a cluster's topics, in one call: the most valuable ones, those running with low replication, high partition skew or a lopsided partition distribu… |
| `set-topic-labels` **(writes)** | WRITE: add or update user-defined catalogue labels on a topic. |

### Messages

| Tool | What it does |
| --- | --- |
| `get-last-messages` | The newest records on a topic: for each, partition, offset, timestamp, key and value (deserialised, with format, size and truncation metadata), headers and compression. |
| `get-record-at` | Fetch a single record from a topic at an exact partition and offset. |

### Consumer groups

| Tool | What it does |
| --- | --- |
| `list-consumer-groups` | Consumer groups of a cluster with usage, paged and sortable: name, state (Stable, Empty, Dead, ...), member count, overallLag, topics read, maxLagTimeInSeconds, groupType and la… |
| `get-consumer-group` | Get the full detail of one consumer group: its state, group type, members (with client id, host and partition assignments), and per-topic offset detail (committed offset, partit… |
| `list-consumer-groups-by-topic` | Consumer groups that read from one topic, paged and sortable: each group's name, state, member count and lag on that topic. |

### Schemas

| Tool | What it does |
| --- | --- |
| `list-subjects` | Schema Registry subjects of a cluster with their latest schema, paged: for each, format (AVRO, PROTOBUF or JSON), compatibility mode, version, schema id and the full schema text. |
| `get-subject` | One Schema Registry subject by exact name: its latest version's format (AVRO, PROTOBUF or JSON), compatibility mode, version number, schema id and schema text, plus labels. |
| `list-subject-names` | Subject names on a cluster's Schema Registry, without schema text: for each, subjectName, latest version, lastSchemaId, version count and schemaType (AVRO, PROTOBUF or JSON), pa… |
| `get-schema-version` | Get a specific version of a subject's schema from the schema registry. |
| `check-schema-compatibility` | Check whether a candidate schema is compatible with a subject's existing schemas, according to the subject's configured compatibility mode (e.g. |

### Connect

| Tool | What it does |
| --- | --- |
| `list-connectors-detailed` | List Kafka Connect connectors in a cluster with detailed status: connector class, type (source/sink), topics, state (RUNNING, PAUSED, FAILED, ...), running/failed task counts, e… |
| `get-connector` | Get one Kafka Connect connector: its deployed configuration (values of secret-looking keys such as passwords, tokens and keys are redacted) and the live status of each of its ta… |

### Gateway

| Tool | What it does |
| --- | --- |
| `list-interceptors` | Interceptors deployed on a Conduktor Gateway cluster, paged: for each, name, pluginClass, priority and its full config. |

### Access & identity

| Tool | What it does |
| --- | --- |
| `list-acl-bindings` | Kafka ACL bindings of a cluster, read live from the broker and paged: for each, principal (e.g. |
| `list-service-accounts` | Service accounts on a cluster, paged: every principal that holds ACLs plus every account registered in Console, with name, labels and the self-service application instance that… |
| `get-service-account` | One service account by name: its owning application instance (null when no self-service application claims it), labels, and its ACLs grouped per resource (type, name, patternTyp… |
| `list-certificates` | List the TLS certificates Console trusts, with subject, issuer, serial number and validity window — no key material. |

### Governance

| Tool | What it does |
| --- | --- |
| `get-stream-lineage` | Producer/consumer lineage of a cluster from its ACLs: which principals (service accounts, connectors) are allowed to write to and read from which topics. |
| `list-applications` | List self-service applications with their owner, labels and instances (instance name, cluster, resource count). |
| `query-audit-log` | Query the audit log of everything that happened on the platform: who (user or token) did what (create/update/delete/browse/restart/...) to which resource (topic, subject, connec… |

### Cost

| Tool | What it does |
| --- | --- |
| `get-chargeback-report` | Per-application cost and usage rows (storage, throughput, cost) for a time window, with period totals and a grand total. |
