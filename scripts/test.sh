#!/usr/bin/env bash

set -eou pipefail

trap "kill 0" EXIT

echo "🔥 Starting all langauges' test templates..."
docker compose up -d --build
echo "🔥 All test templates started"

# Ensure we clean up containers when the script exits
trap "echo '🧹 Cleaning up containers...' && docker compose down" EXIT

# wait till all containers are ready, use curl to ping :5550, :5551, :5552
while ! curl -s http://localhost:5550 | grep -q "OK"; do
  sleep 1
done

while ! curl -s http://localhost:5551 | grep -q "OK"; do
  sleep 1
done

while ! curl -s http://localhost:5552 | grep -q "OK"; do
  sleep 1
done

echo "🎉 All test templates are ready"

PORT=5550 k6 run k6/template-api-test.js
echo "🎉 C# Template API test completed"
PORT=5551 k6 run k6/template-api-test.js
echo "🎉 Node Template API test completed"
PORT=5552 k6 run k6/template-api-test.js
echo "🎉 Python Template API test completed"

echo "✅ All tests completed"
