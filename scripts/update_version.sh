#!/usr/bin/env bash

version="$1"

set -eou pipefail

root_dir="$(pwd)"

echo "🤜 Updating .NET version to ${version}"
cd "${root_dir}/sdks/dotnet" || exit
./scripts/update_version.sh "${version}"
cd "${root_dir}" || exit

echo "🤜 Updating Node version to ${version}"
cd "${root_dir}/sdks/node" || exit
./scripts/update_version.sh "${version}"
cd "${root_dir}" || exit

echo "🤜 Updating Python version to ${version}"
cd "${root_dir}/sdks/python" || exit
./scripts/update_version.sh "${version}"
cd "${root_dir}" || exit

echo "✅ All versions updated"
