#!/usr/bin/env bash

version="$1"

set -eou pipefail

echo "🤜 Updating .NET version to ${version}"
./sdks/dotnet/scripts/ci/update_version.sh "${version}"
echo "🤜 Updating Node version to ${version}"
./sdks/node/scripts/ci/update_version.sh "${version}"
