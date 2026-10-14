#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PORT="${PORT:-8765}"
OUT="${1:-$ROOT/docs/thumbnail.png}"

python3 -m http.server "$PORT" --directory "$ROOT" >/dev/null 2>&1 &
SERVER=$!
trap 'kill "$SERVER"' EXIT
sleep 1

mkdir -p "$(dirname "$OUT")"
"$CHROME" --headless --disable-gpu --hide-scrollbars --virtual-time-budget=3000 \
  --window-size=1024,576 --screenshot="$OUT" "http://localhost:$PORT/demo/graph.html" 2>/dev/null

echo "wrote $OUT"
