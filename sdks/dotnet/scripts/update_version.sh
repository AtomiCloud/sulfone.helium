#!/usr/bin/env bash

version="$1"

set -eou pipefail

xmlstarlet ed -L -u '//Project/PropertyGroup/VersionPrefix' -v "$version" ./sulfone-helium/sulfone-helium.csproj
