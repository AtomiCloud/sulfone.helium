#!/usr/bin/env bash

[ "${RELEASE}" = '' ] && echo "❌ 'RELEASE' env var not set" && exit 1

[ "${GITHUB_SHA}" = '' ] && echo "❌ 'GITHUB_SHA' env var not set" && exit 1
[ "${GITHUB_BRANCH}" = '' ] && echo "❌ 'GITHUB_BRANCH' env var not set" && exit 1
[ "${GITHUB_REPO_REF}" = '' ] && echo "❌ 'GITHUB_REPO_REF' env var not set" && exit 1

[ "${NPM_API_KEY}" = '' ] && echo "❌ 'NPM_API_KEY' env var not set" && exit 1

set -eou pipefail

SHA="$(echo "${GITHUB_SHA}" | head -c 6)"
# shellcheck disable=SC2001
BRANCH="$(echo "${GITHUB_BRANCH}" | sed 's/[._-]*$//')"
RELEASE_VERSION="${SHA}-${BRANCH}"

echo "🪵 Current Branch: $BRANCH"

# skip dir
echo "📂 Going to directory: sdks/node"
cd sdks/node || exit
echo "✅ In directory: $(pwd)"

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

if [ "${RELEASE}" == "true" ]; then
  # build package
  echo "📦 Building package"
  ./node_modules/.bin/tsup
  echo "✅ Package built"

  echo "📦 Publishing to npm"
  npm publish --access public
  echo "✅ Published to npm"
else
  echo "🔍 Pre-release detected, building with version suffix, $RELEASE_VERSION"

  # suffix versioning
  current_version="$(jq -r '.version' ./package.json)"
  ./scripts/ci/update_version.sh "${current_version}-${RELEASE_VERSION}"

  echo "📦 Building package"
  ./node_modules/.bin/tsup
  echo "✅ Package built"

  echo "📦 Publishing to npm with tag 'next'"
  npm publish --access public --tag next
  echo "✅ Published to npm with tag 'next'"
fi
