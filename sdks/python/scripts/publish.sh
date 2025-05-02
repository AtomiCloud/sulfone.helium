#!/usr/bin/env bash

[ "${PYPI_TOKEN}" = '' ] && echo "❌ 'PYPI_TOKEN' env var not set" && exit 1

set -eou pipefail

echo "🛠️ Configuring poetry token"
poetry config pypi-token.pypi "${PYPI_TOKEN}"
echo "✅ Poetry token configured"

# build package
echo "📦 Building package"
poetry build
echo "✅ Package built"

echo "📦 Publishing to pypi"
poetry publish
echo "✅ Published to pypi"
