#!/usr/bin/env bash
# Generates random UUID-like strings and prints them.
# Usage: random_code_5.sh [OPTIONS] [COUNT]
#   -h, --help       Show this help message
#   -v, --version    Show version information
#   -u, --upper      Use uppercase letters (default: lowercase)
#   -n, --no-dash    Remove dashes from output
#   -o FILE          Write output to FILE instead of stdout
#   -s, --stats      Show statistics after generation

set -euo pipefail

VERSION="1.1.0"
FORMAT="lower"
DASHES=true
OUTPUT_FILE=""
SHOW_STATS=false
COUNT=3

show_help() {
  cat << EOF
UUID Generator v${VERSION}

Usage: $0 [OPTIONS] [COUNT]

Options:
  -h, --help       Show this help message
  -v, --version    Show version information
  -u, --upper      Use uppercase letters (default: lowercase)
  -n, --no-dash    Remove dashes from output
  -o FILE          Write output to FILE instead of stdout
  -s, --stats      Show statistics after generation

Arguments:
  COUNT            Number of UUIDs to generate (default: 3)

Examples:
  $0                    # Generate 3 lowercase UUIDs
  $0 10                 # Generate 10 lowercase UUIDs
  $0 -u 5               # Generate 5 uppercase UUIDs
  $0 -n -o ids.txt 20   # Generate 20 UUIDs without dashes to ids.txt
  $0 -s 100             # Generate 100 UUIDs with statistics

EOF
}

show_version() {
  echo "UUID Generator v${VERSION}"
}

gen_id() {
  local uuid
  # 8-4-4-4-12 style using /dev/urandom
  uuid=$(hexdump -vn16 -e '4/4 "%08X"' /dev/urandom | \
    sed -E 's/^(.{8})(.{4})(.{4})(.{4})(.{12}).*$/\1-\2-\3-\4-\5/')
  
  if [[ "$FORMAT" == "lower" ]]; then
    uuid=$(echo "$uuid" | tr 'A-Z' 'a-z')
  fi
  
  if [[ "$DASHES" == false ]]; then
    uuid=$(echo "$uuid" | tr -d '-')
  fi
  
  echo "$uuid"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -h|--help)
      show_help
      exit 0
      ;;
    -v|--version)
      show_version
      exit 0
      ;;
    -u|--upper)
      FORMAT="upper"
      shift
      ;;
    -n|--no-dash)
      DASHES=false
      shift
      ;;
    -o)
      OUTPUT_FILE="$2"
      shift 2
      ;;
    -s|--stats)
      SHOW_STATS=true
      shift
      ;;
    -*)
      echo "Unknown option: $1" >&2
      echo "Use -h or --help for usage information." >&2
      exit 1
      ;;
    *)
      if [[ "$1" =~ ^[0-9]+$ ]]; then
        COUNT="$1"
      else
        echo "Invalid argument: $1 (expected a number)" >&2
        exit 1
      fi
      shift
      ;;
  esac
done

# Generate UUIDs
if [[ -n "$OUTPUT_FILE" ]]; then
  > "$OUTPUT_FILE"  # Clear/create file
  START_TIME=$(date +%s.%N)
  for _ in $(seq 1 "$COUNT"); do
    gen_id >> "$OUTPUT_FILE"
  done
  END_TIME=$(date +%s.%N)
  echo "Generated $COUNT UUIDs and wrote to $OUTPUT_FILE" >&2
else
  START_TIME=$(date +%s.%N)
  for _ in $(seq 1 "$COUNT"); do
    gen_id
  done
  END_TIME=$(date +%s.%N)
fi

# Show statistics if requested
if [[ "$SHOW_STATS" == true ]]; then
  ELAPSED=$(echo "$END_TIME - $START_TIME" | bc)
  RATE=$(echo "scale=2; $COUNT / $ELAPSED" | bc)
  echo "" >&2
  echo "Statistics:" >&2
  echo "  Generated: $COUNT UUIDs" >&2
  echo "  Time: ${ELAPSED}s" >&2
  echo "  Rate: ${RATE} UUIDs/sec" >&2
fi
