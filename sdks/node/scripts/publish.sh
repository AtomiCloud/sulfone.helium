#!/usr/bin/env bash

[ "${NPM_API_KEY}" = '' ] && echo "❌ 'NPM_API_KEY' env var not set" && exit 1

set -eou pipefail

# install dependencies
echo "📦 Installing dependencies"
bun i
echo "✅ Dependencies installed"

echo "🛠️ Generate .npmrc"
rm .npmrc || true
echo "//registry.npmjs.org/:_authToken=${NPM_API_KEY}" >.npmrc
echo "registry=https://registry.npmjs.org/" >>.npmrc
echo "always-auth=true" >>.npmrc
echo "✅ .npmrc generated!"

# build package
echo "📦 Building package"
./node_modules/.bin/tsup
echo "✅ Package built"

echo "📦 Publishing to npm"
npm publish --access public
echo "✅ Published to npm"
