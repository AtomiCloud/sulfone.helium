#!/usr/bin/env bash

compose_file="$1"
k6_file="$2"
port_dotnet="${3:-5550}"
port_node="${4:-5551}"
port_python="${5:-5552}"

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

echo "🔥 Starting all languages' test templates..."
docker compose -f "$compose_file" up -d --build
echo "🔥 All test templates started"

# wait till all containers are ready (with timeout)
max_attempts=60
attempt=0
while ! curl -s --max-time 2 "http://localhost:$port_dotnet" | grep -q "OK"; do
  sleep 1
  attempt=$((attempt + 1))
  if [ $attempt -ge $max_attempts ]; then
    echo "❌ Timeout waiting for .NET container on port $port_dotnet"
    exit 1
  fi
done

attempt=0
while ! curl -s --max-time 2 "http://localhost:$port_node" | grep -q "OK"; do
  sleep 1
  attempt=$((attempt + 1))
  if [ $attempt -ge $max_attempts ]; then
    echo "❌ Timeout waiting for Node container on port $port_node"
    exit 1
  fi
done

attempt=0
while ! curl -s --max-time 2 "http://localhost:$port_python" | grep -q "OK"; do
  sleep 1
  attempt=$((attempt + 1))
  if [ $attempt -ge $max_attempts ]; then
    echo "❌ Timeout waiting for Python container on port $port_python"
    exit 1
  fi
done

echo "🎉 All test templates are ready"

echo "🏃‍➡️ Running C# API test"
PORT="$port_dotnet" k6 run "k6/$k6_file"
echo "🎉 C# API test completed"

echo "🏃‍➡️ Running Node API test"
PORT="$port_node" k6 run "k6/$k6_file"
echo "🎉 Node API test completed"

echo "🏃‍➡️ Running Python API test"
PORT="$port_python" k6 run "k6/$k6_file"
echo "🎉 Python API test completed"

echo "✅ All tests completed"
