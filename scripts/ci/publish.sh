#!/usr/bin/env bash

set -eou pipefail

echo "🚀 Publishing .NET package"
./sdks/dotnet/scripts/ci/publish.sh
echo "🚀 Publishing npm package"
./sdks/node/scripts/ci/publish.sh

echo "✅ All packages published"
