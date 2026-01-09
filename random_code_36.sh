#!/usr/bin/env bash
# Random password generator (Unix shell)

set -euo pipefail

LENGTH="${1:-16}"
COUNT="${2:-5}"

if ! [[ "$LENGTH" =~ ^[0-9]+$ ]] || ! [[ "$COUNT" =~ ^[0-9]+$ ]]; then
  echo "Usage: $0 [length] [count]" >&2
  exit 1
fi

echo "Random Password Generator"
printf '%0.s=' $(seq 1 24); echo
echo

for i in $(seq 1 "$COUNT"); do
  pw=$(LC_ALL=C tr -dc 'A-Za-z0-9!@#$%^&*_' </dev/urandom | head -c "$LENGTH" || true)
  printf 'Password %2d: %s\n' "$i" "$pw"
done

echo
date +"Generated at: %Y-%m-%d %H:%M:%S"


