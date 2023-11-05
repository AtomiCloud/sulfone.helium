#!/usr/bin/env bash

set -eou pipefail

rm .git/hooks/*
sg release || true
