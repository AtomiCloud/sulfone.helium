#!/usr/bin/env bash

version="$1"
package_path="$2"
set -eou pipefail

[ "$package_path" = '' ] && package_path="./sdks/python/pyproject.toml"

toml set "$package_path" tool.poetry.version "${version}" >./tmp
mv ./tmp "$package_path"
