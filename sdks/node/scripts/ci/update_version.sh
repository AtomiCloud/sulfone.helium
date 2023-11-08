#!/usr/bin/env bash

version="$1"

set -eou pipefail

package_path="./sdks/node/package.json"
jq --arg new_version "${version}" '.version = $new_version' "${package_path}" >tmp
mv tmp "${package_path}"
