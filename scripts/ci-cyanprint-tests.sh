#!/usr/bin/env bash
set -euo pipefail

# Ensure template snapshot directories exist (git can't track empty dirs)
for lang in dotnet node python; do
  mkdir -p "sdks/$lang/template/snapshots/default_answers"
done

echo "Running CyanPrint tests for all 12 artifact-language combinations"
echo "==============================================================="

failures=0

for lang in dotnet node python; do
  for artifact in template processor plugin resolver; do
    echo ""
    echo "--- $lang/$artifact ---"

    # For processor tests, capture container logs for debugging
    if [ "$artifact" = "processor" ]; then
      # Start log capture in background
      (
        # Wait for cyan-processor container to appear
        for _ in $(seq 1 30); do
          container=$(docker ps --filter "name=cyan-processor" --format '{{.Names}}' 2>/dev/null | head -1)
          [ -n "$container" ] && break
          sleep 0.5
        done
        if [ -n "$container" ]; then
          # Stream container logs until the container stops
          docker logs -f "$container" 2>&1 || true
        fi
      ) >/tmp/processor-${lang}-container.log 2>&1 &
      log_pid=$!
    fi

    if cyanprint test "$artifact" "sdks/$lang/$artifact"; then
      echo "PASS: $lang/$artifact"
    else
      echo "FAIL: $lang/$artifact"
      failures=$((failures + 1))
    fi

    if [ "$artifact" = "processor" ]; then
      # Stop log capture
      kill "$log_pid" 2>/dev/null || true
      wait "$log_pid" 2>/dev/null || true
      echo "--- Container logs for $lang/$artifact ---"
      cat /tmp/processor-${lang}-container.log || true
      echo "--- End container logs ---"
    fi
  done
done

echo ""
echo "==============================================================="
if [ "$failures" -eq 0 ]; then
  echo "All 12 tests passed"
else
  echo "$failures test(s) failed"
  exit 1
fi
