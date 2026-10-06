# TODO — expand the tool table once the wider catalogue is released

The README documents the ten tools listed on
[docs.conduktor.io](https://docs.conduktor.io/guide/conduktor-in-production/automate/mcp).

Console ships considerably more than that today, across domains the current table does not
cover at all — cost attribution, lineage, access control, certificates, service accounts,
audit querying, schema compatibility, and aggregate/query operations over topics. At least one
of them mutates state rather than only reading it, which the README's read-only framing will
need to follow.

**Source of truth:** `mcp-tools.json` at the root of `conduktor/console-plus`. It carries each
tool's name, description and enforced permissions, and is kept in step with the code by a
coverage test — regenerate the table from it rather than hand-maintaining a copy.

The full list as it stands is in [`tool-catalogue.md`](tool-catalogue.md): 31 tools, one of
which writes (`set-topic-labels`).

## Why this is a draft and not a merge

The public docs still describe ten. Merging would put the other twenty-one in the README ahead
of `docs.conduktor.io`, in the file most likely to be read and repeated by models — a product
announcement made from a repository.

Ordering therefore matters: public docs first, this README second.

## When the time comes

- [ ] Regenerate the tool table from `mcp-tools.json`, grouped by domain rather than one flat list
- [ ] Mark which tools write, and revise the Permissions section — "the tools listed above are
      read-only" stops being true
- [ ] Update the architecture diagram: `docs/architecture.svg` says `read-only, checked per call`
- [ ] Revisit `What's next` — it currently promises what will by then have shipped
- [ ] Bump `version` in `server.json`; the push republishes to the MCP registry via OIDC

## Worth knowing

Competitors win the "which Kafka MCP server should I use" question partly on breadth of tooling
and documentation quality. The gap between what Console does and what its public documentation
claims is, on this evidence, the larger lever — larger than anything this repository can do.
