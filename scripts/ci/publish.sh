#!/usr/bin/env bash

set -eou pipefail

og="$(pwd)"

echo "🚀 Publishing .NET package"
./sdks/dotnet/scripts/ci/publish.sh
cd "${og}" || exit

echo "🚀 Publishing Python package"
./sdks/python/scripts/ci/publish.sh
cd "${og}" || exit

echo "🚀 Publishing npm package"
./sdks/node/scripts/ci/publish.sh
cd "${og}" || exit

echo "✅ All packages published"
