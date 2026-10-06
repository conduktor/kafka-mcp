#!/usr/bin/env bash
# Topics with traffic, one healthy consumer group, one lagging. Without this the
# estate is empty and every tool answers "nothing here".
set -euo pipefail
B="redpanda:9092"
# depends_on already gates on Redpanda being healthy; just confirm the
# broker answers before producing.
until rpk -X brokers="$B" topic list >/dev/null 2>&1; do sleep 2; done

create() { rpk -X brokers="$B" topic create "$1" -p "$2" -r 1 2>/dev/null || true; }
create orders 6 ; create payments 3 ; create shipments 3
create clickstream 12 ; create audit-events 1 ; create legacy-imports 1

for i in $(seq 1 400); do
  echo "{\"orderId\":$i,\"amount\":$((RANDOM % 500)),\"currency\":\"EUR\"}"
done | rpk -X brokers="$B" topic produce orders --format '%v\n' >/dev/null

for i in $(seq 1 150); do
  echo "{\"paymentId\":$i,\"status\":\"settled\"}"
done | rpk -X brokers="$B" topic produce payments --format '%v\n' >/dev/null

for i in $(seq 1 900); do
  echo "{\"session\":\"s$i\",\"path\":\"/product/$((RANDOM % 80))\"}"
done | rpk -X brokers="$B" topic produce clickstream --format '%v\n' >/dev/null

# Reads everything: healthy group, no lag.
rpk -X brokers="$B" topic consume orders -g order-processor -n 400 >/dev/null 2>&1 || true
# Reads a fraction: the group you want an assistant to notice.
rpk -X brokers="$B" topic consume clickstream -g analytics-etl -n 50 >/dev/null 2>&1 || true
# legacy-imports has no producer and no consumer — the reclaim candidate.

echo "seeded: 6 topics, 1450 records, order-processor healthy, analytics-etl lagging"
