# Task Specification: Fix CyanPrint Test Infrastructure for All 12 Artifacts (CU-86ex00up9 v2)

## Source

| Field  | Value                             |
| ------ | --------------------------------- |
| Ticket | CU-86ex00up9                      |
| System | ClickUp                           |
| URL    | https://app.clickup.com/t/86ex009 |

## Context

v1 implemented all 12 artifact-language test combinations with `cyanprint test`. The SKILL.md documentation, CI workflow, Taskfile commands, and overall structure are correct. However, several bugs prevent `pls test:all` from passing:

1. **blob.Dockerfile `tar=1.35` pin** — Alpine 3.21 doesn't have `tar=1.35`, causing template tests to fail at build time
2. **Python Dockerfile `--no-cache-dir`** — `poetry install --no-cache-dir` is not valid for poetry 1.8.5, causing resolver and template Docker builds to fail
3. **Processor test validation errors** — `cyanprint test` doesn't include `exclude` or `root` in processor request globs, but SDK API models require them. .NET returns 500 (NullReferenceException), Python returns 400 (Pydantic validation)
4. **Leftover Docker containers** — Previous manual test runs left containers that conflicted with cyanprint's container management, causing template tests to fail with "invalid container name"

## Objective

Fix all broken tests so that `pls test:all` passes cleanly with all 12 tests passing.

## What Changed

### Fix 1: Remove `tar` Version Pin from All blob.Dockerfiles

**Files:** `sdks/dotnet/template/blob.Dockerfile`, `sdks/node/template/blob.Dockerfile`, `sdks/python/template/blob.Dockerfile`

Removed `RUN apk add --no-cache tar=1.35` — tar is pre-installed in Alpine 3.21.

### Fix 2: Remove Invalid `--no-cache-dir` from Python Dockerfiles

**Files:** `sdks/python/resolver/Dockerfile`, `sdks/python/template/Dockerfile`

Removed `--no-cache-dir` from `poetry install` command — not supported by poetry 1.8.5.

### Fix 3: Default Missing Glob Fields in SDK API Models

**Files:**

- `sdks/dotnet/sulfone-helium/Api/Core/CyanReq.cs` — `Exclude` nullable (`string[]?`)
- `sdks/dotnet/sulfone-helium/Api/Core/CoreMapper.cs` — `req.Exclude ?? []` in mapper
- `sdks/python/cyanprintsdk/api/core/cyan_req.py` — `root: Optional[str] = None`, `exclude: List[str] = []`

`cyanprint test` omits `exclude` and `root` from processor request globs. The SDK API models now default these fields so the domain model (which keeps `exclude` required) receives valid data.

**Note:** This changes API request models, not domain model interfaces. The domain `CyanGlob` keeps `exclude: List[str]` as required.

## Acceptance Criteria

1. `pls test:all` exits 0 with all 12 tests passing (4 artifacts x 3 languages)
2. No domain model interface changes
3. All pre-commit hooks pass
