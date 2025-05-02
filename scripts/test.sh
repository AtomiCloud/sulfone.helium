#!/usr/bin/env bash

compose_file="$1"
k6_file="$2"

set -eou pipefail

trap "kill 0" EXIT

# check if compose file is provided, and if the file exists
if [ -z "$compose_file" ] || [ ! -f "$compose_file" ]; then
  echo "❌ Compose file not provided or doesn't exist: $compose_file"
  exit 1
fi

# check if k6 file is provided, and if the file exists
if [ -z "$k6_file" ] || [ ! -f "./k6/$k6_file" ]; then
  echo "❌ K6 file not provided or doesn't exist: ./k6/$k6_file"
  exit 1
fi

cleanup() {
  echo "🧹 Cleaning up containers..."
  docker compose -f "$compose_file" down
}
trap "cleanup" EXIT

echo "🔥 Starting all langauges' test templates..."
docker compose -f "$compose_file" up -d --build
echo "🔥 All test templates started"

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

echo "🏃‍➡️ Running C# API test"
PORT=5550 k6 run "k6/$k6_file"
echo "🎉 C# API test completed"

echo "🏃‍➡️ Running Node API test"
PORT=5551 k6 run "k6/$k6_file"
echo "🎉 Node API test completed"

echo "🏃‍➡️ Running Python API test"
PORT=5552 k6 run "k6/$k6_file"
echo "🎉 Python API test completed"

echo "✅ All tests completed"
