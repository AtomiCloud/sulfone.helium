#!/usr/bin/env bash

[ "${MAIN_BRANCH}" = '' ] && echo "❌ 'MAIN_BRANCH' env var not set" && exit 1

[ "${GITHUB_SHA}" = '' ] && echo "❌ 'GITHUB_SHA' env var not set" && exit 1
[ "${GITHUB_BRANCH}" = '' ] && echo "❌ 'GITHUB_BRANCH' env var not set" && exit 1
[ "${GITHUB_REPO_REF}" = '' ] && echo "❌ 'GITHUB_REPO_REF' env var not set" && exit 1

[ "${NUGET_API_KEY}" = '' ] && echo "❌ 'NUGET_API_KEY' env var not set" && exit 1

set -eou pipefail

SHA="$(echo "${GITHUB_SHA}" | head -c 6)"
# shellcheck disable=SC2001
BRANCH="$(echo "${GITHUB_BRANCH}" | sed 's/[._-]*$//')"
RELEASE_VERSION="${SHA}-${BRANCH}"

echo "🪵 Current Branch: $BRANCH"
ehco "🪵 Main Branch: ${MAIN_BRANCH}"

if [ "$BRANCH" == "$MAIN_BRANCH" ]; then
  echo "🔍 Full release detected, building with version"
  dotnet pack ./sdks/dotnet/sulfone-helium/sulfone-helium.csproj --output nupkgs
else
  echo "🔍 Pre-release detected, building with version suffix, $RELEASE_VERSION"
  dotnet pack ./sdks/dotnet/sulfone-helium/sulfone-helium.csproj --version-suffix "$RELEASE_VERSION" --output nupkgs
fi

echo "📦 Publishing packages..."
dotnet nuget push ./nupkgs/*.nukpg --api-key "${NUGET_API_KEY}" --source "https://api.nuget.org/v3/index.json" --skip-duplicate
echo "✅ Packages published!"
