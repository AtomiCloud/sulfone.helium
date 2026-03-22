#!/usr/bin/env bash
set -euo pipefail

echo "Running CyanPrint tests for all 12 artifact-language combinations"
echo "==============================================================="

failures=0

for lang in dotnet node python; do
  for artifact in template processor plugin resolver; do
    echo ""
    echo "--- $lang/$artifact ---"
    if cyanprint test "$artifact" "sdks/$lang/$artifact"; then
      echo "PASS: $lang/$artifact"
    else
      echo "FAIL: $lang/$artifact"
      failures=$((failures + 1))
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
