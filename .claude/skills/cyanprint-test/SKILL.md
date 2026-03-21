---
name: cyanprint-test
description: Run CyanPrint regression tests for all artifacts across all languages
user_invocable: true
---

# CyanPrint Test Skill

Run regression tests for all 4 artifacts (Template, Processor, Plugin, Resolver) across all 3 supported languages (Node.js, Python, .NET) using CyanPrint's `cyanprint test` command.

## What `cyanprint test` Does

1. Reads `cyan.yaml` for build configuration (registry, platforms, dockerfile, context)
2. Reads `test.cyan.yaml` for test case definitions
3. Builds the Docker image from the specified Dockerfile
4. Starts a container from the built image
5. Runs each test case: sends inputs to the running API (at its designated port), compares response to snapshot
6. Cleans up container

## Required Directory Structure Per Artifact

Each artifact gets its **own subdirectory** with its own `cyan.yaml`, `Dockerfile`, `test.cyan.yaml`, `snapshots/`, and `inputs/`. This keeps test infrastructure isolated from core SDK source code.

```
sdks/{dotnet,node,python}/
├── template/              # Template artifact test directory
│   ├── cyan.yaml           # Build config for this artifact
│   ├── Dockerfile           # Runs API server (COPY ../ to reference SDK source)
│   ├── test.cyan.yaml      # Test case definitions
│   ├── snapshots/           # Expected output files
│   └── inputs/              # Input files (if needed)
├── processor/              # Processor artifact test directory
│   ├── cyan.yaml
│   ├── Dockerfile
│   ├── test.cyan.yaml
│   ├── snapshots/
│   └── inputs/
├── plugin/                # Plugin artifact test directory
│   ├── cyan.yaml
│   ├── Dockerfile
│   ├── test.cyan.yaml
│   ├── snapshots/
│   └── inputs/
└── resolver/              # Resolver artifact test directory
    ├── cyan.yaml
    ├── Dockerfile
    ├── test.cyan.yaml
    ├── snapshots/
    └── inputs/
```

The core SDK source (`sdks/dotnet/sulfone-helium/`, `sdks/node/src/`, `sdks/python/cyanprintsdk/`) is **never modified**. Dockerfiles use `COPY` from parent directory to access SDK source at build time.

## cyan.yaml Format

Each artifact subdirectory has its own `cyan.yaml`. The `context: ..` copies from the parent SDK directory to access core SDK source.

```yaml
username: atomi
name: {artifact}-{language}   # e.g., template-dotnet, resolver-python
description: CyanPrint {artifact} SDK for {language}
project: https://github.com/AtomiCloud/sulfone.helium
source: https://github.com/AtomiCloud/sulfone.helium
email: hello@atomi.cloud
tags: []

build:
  registry: kirinnee
  platforms:
    - linux/amd64
  images:
    {artifact}:
      image: {artifact}-{language}
      dockerfile: Dockerfile
      context: ..
```

## test.cyan.yaml Format

```yaml
tests:
  - name: { test_case_name }
    expected:
      type: snapshot
      value:
        path: ./snapshots/{test_case_name}
    input: ./inputs/{some_path} # for processor/plugin
    config: {} # processor config or resolver config
    resolver_inputs: [] # for resolver tests
    validate: # optional shell validation commands
      - test -f outputfile
```

## Artifact API Endpoints & Ports

| Artifact  | Port | Endpoint(s)                                              |
| --------- | ---- | -------------------------------------------------------- |
| Template  | 5550 | `POST /api/template/init`, `POST /api/template/validate` |
| Processor | 5551 | `POST /api/process`                                      |
| Plugin    | 5552 | `POST /api/plug`                                         |
| Resolver  | 5553 | `POST /api/resolve`                                      |

## Dockerfile Requirements

- All Dockerfiles must include `LABEL cyanprint.dev=true`
- CMD must run the API server, NOT a test runner
- Must be non-root (`USER bun`, `USER appuser`, etc.)
- Use `COPY ../` to reference SDK source from parent directory — core SDK code stays untouched
- The `cyanprint test` framework starts the container and hits the API at the designated port

## Dockerfile Patterns

**.NET:**

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY ../ ./
RUN useradd -m appuser && chown -R appuser /app
USER appuser
LABEL cyanprint.dev=true
CMD ["dotnet", "sulfone-helium-{artifact}-api.dll"]
EXPOSE {port}
```

**Node.js:**

```dockerfile
FROM oven/bun:1.1.31
WORKDIR /app
LABEL cyanprint.dev=true
COPY ../package.json ../bun.lockb ./
RUN bun install --frozen-lockfile
COPY ../ . .
CMD ["bun", "run", "../src/{artifact}_entry.ts"]
EXPOSE {port}
```

**Python:**

```dockerfile
FROM python:3.11-slim
WORKDIR /app
LABEL cyanprint.dev=true
COPY ../pyproject.toml ../poetry.lock* ./
RUN pip install poetry && poetry install --no-root
COPY ../ . .
CMD ["python", "-c", "from cyanprintsdk.main import start_{artifact}; start_{artifact}()"]
EXPOSE {port}
```

## How to Initialize Tests

```bash
# Auto-generate initial snapshots (run from artifact subdirectory)
cyanprint test init .

# Run tests (no --config flag — reads cyan.yaml from the artifact subdirectory)
cyanprint test template sdks/dotnet/template
cyanprint test processor sdks/dotnet/processor
cyanprint test plugin sdks/dotnet/plugin
cyanprint test resolver sdks/dotnet/resolver
```

## Running All Tests

```bash
task test:all       # Run all artifact tests across all 3 languages
task test:dotnet    # Test all .NET artifacts
task test:node      # Test all Node.js artifacts
task test:python    # Test all Python artifacts
```

## Test Coverage Requirements

**Template tests** — Test all question types, determinism, validation:

- `answer_state`: Map of question ID → `{type, value}` pairs
- `deterministic_state`: Empty `{}` for deterministic, or state for non-deterministic
- `validate`: Shell commands to validate output files exist or have expected content

**Processor tests** — Test read/write, variable replacement, custom parsers, validation:

- Multiple `input` files with different variable configurations
- Custom `config` with `vars`, `parser.varSyntax` options
- `validate` shell commands to verify output files exist or content

**Plugin tests** — Test all plugin behaviors:

- File generation, determinism validation
- Different input configurations

**Resolver tests** — Test merge strategies:

- Multiple `resolver_inputs` with different layers
- Various `config` strategies (`deep-merge`, `array_strategy`)
