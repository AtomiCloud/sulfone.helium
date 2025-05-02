#!/usr/bin/env bash

set -eou pipefail

root_dir="$(pwd)"

echo "🚀 Publishing .NET package"
cd "${root_dir}/sdks/dotnet" || exit
./scripts/publish.sh
cd "${root_dir}" || exit

echo "🚀 Publishing Python package"
cd "${root_dir}/sdks/python" || exit
./scripts/publish.sh
cd "${root_dir}" || exit

echo "🚀 Publishing npm package"
cd "${root_dir}/sdks/node" || exit
./scripts/publish.sh
cd "${root_dir}" || exit

echo "✅ All packages published"
