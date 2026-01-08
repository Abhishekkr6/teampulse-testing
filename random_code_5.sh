#!/usr/bin/env bash
# Generates a few random UUID-like strings and prints them.

set -euo pipefail

gen_id() {
  # 8-4-4-4-12 style using /dev/urandom
  hexdump -vn16 -e '4/4 "%08X"' /dev/urandom | \
    sed -E 's/^(.{8})(.{4})(.{4})(.{4})(.{12}).*$/\1-\2-\3-\4-\5/' | \
    tr 'A-Z' 'a-z'
}

count=${1:-3}
for _ in $(seq 1 "$count"); do
  gen_id
done



