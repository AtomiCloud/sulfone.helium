# Task Specification: Regression Test All 4 Artifacts Across All 3 Languages Using CyanPrint's New Testing Command (CU-86ex00up9)

## Source

| Field  | Value                               |
| ------ | ----------------------------------- |
| Ticket | CU-86ex00up9                        |
| System | ClickUp                             |
| URL    | https://app.clickup.com/t/86ex00up9 |

## Objective

Use CyanPrint's new `cyanprint test` command to run regression tests on all 4 artifacts (Template, Processor, Plugin, Resolver) across all 3 supported languages (Node.js, Python, .NET). This involves: (1) understanding and documenting the new testing infrastructure, (2) creating the build configuration for all 12 artifact-language combinations, (3) creating and running tests for all 12, and (4) removing all old k6/docker-compose-based testing infrastructure.

---

## Step 1: Remove Old Artifacts and Tests

Before creating anything new, delete all existing test artifacts and infrastructure:

| File/Directory                            | Reason                                       |
| ----------------------------------------- | -------------------------------------------- |
| `docker-compose.template.yaml`            | Replaced by cyanprint test                   |
| `docker-compose.resolver.yaml`            | Replaced by cyanprint test                   |
| `k6/`                                     | Old k6 test runner directory                 |
| `scripts/test.sh`                         | Old test orchestration script                |
| `tasks/Taskfile.test.yaml`                | Old test task definition                     |
| `.github/workflows/⚡reusable-tests.yaml` | Old reusable test workflow                   |
| `sdks/node/template_test.ts`              | Old test runner (replaced by cyanprint test) |
| `sdks/node/resolver_test.ts`              | Old test runner                              |
| `sdks/python/template_test.py`            | Old test runner                              |
| `sdks/python/resolver_test.py`            | Old test runner                              |
| `sdks/dotnet/template.Dockerfile`         | Will be replaced                             |
| `sdks/dotnet/resolver.Dockerfile`         | Will be replaced                             |
| `sdks/node/template.Dockerfile`           | Will be replaced                             |
| `sdks/node/resolver.Dockerfile`           | Will be replaced                             |
| `sdks/python/template.Dockerfile`         | Will be replaced                             |
| `sdks/python/resolver.Dockerfile`         | Will be replaced                             |

Also remove from CI (`.github/workflows/ci.yaml`): the `template-test` job that uses `⚡reusable-tests.yaml`.

---

## Step 2: Write a Skill for the CyanPrint Test Infrastructure

**Location:** `.claude/skills/cyanprint-test/SKILL.md`

Document the complete pattern so it can be reused. The skill should cover:

### What `cyanprint test` Does

1. Reads `cyan.yaml` for build configuration (registry, platforms, dockerfile, context)
2. Reads `test.cyan.yaml` for test case definitions
3. Builds the Docker image from the specified Dockerfile
4. Starts a container from the built image
5. Runs each test case: sends inputs to the running API (at its designated port), compares response to snapshot
6. Cleans up container

### Required Directory Structure Per Artifact

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

### cyan.yaml Format

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

### test.cyan.yaml Format

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

### Artifact API Endpoints & Ports

| Artifact  | Port | Endpoint(s)                                              |
| --------- | ---- | -------------------------------------------------------- |
| Template  | 5550 | `POST /api/template/init`, `POST /api/template/validate` |
| Processor | 5551 | `POST /api/process`                                      |
| Plugin    | 5552 | `POST /api/plug`                                         |
| Resolver  | 5553 | `POST /api/resolve`                                      |

### Dockerfile Requirements

- All Dockerfiles must include `LABEL cyanprint.dev=true`
- CMD must run the API server, NOT a test runner
- Must be non-root (`USER bun`, `USER appuser`, etc.)
- Use `COPY ../` to reference SDK source from parent directory — core SDK code stays untouched
- The `cyanprint test` framework starts the container and hits the API at the designated port

### How to Initialize Tests

```bash
# Auto-generate initial snapshots (run from artifact subdirectory)
cyanprint test init .

# Run tests (no --config flag — reads cyan.yaml from the artifact subdirectory)
cyanprint test template sdks/dotnet/template
cyanprint test processor sdks/dotnet/processor
cyanprint test plugin sdks/dotnet/plugin
cyanprint test resolver sdks/dotnet/resolver
```

---

## Step 3: Create 12 Artifact Builds

Each artifact gets its **own subdirectory** under each SDK. Each subdirectory contains:

1. A `cyan.yaml` with `build:` section
2. A `Dockerfile` that runs the API server (using `COPY ../` to reference SDK source)

### The 12 Subdirectories

```
sdks/dotnet/template/   — cyan.yaml + Dockerfile
sdks/dotnet/processor/  — cyan.yaml + Dockerfile
sdks/dotnet/plugin/     — cyan.yaml + Dockerfile
sdks/dotnet/resolver/   — cyan.yaml + Dockerfile

sdks/node/template/     — cyan.yaml + Dockerfile
sdks/node/processor/    — cyan.yaml + Dockerfile
sdks/node/plugin/       — cyan.yaml + Dockerfile
sdks/node/resolver/     — cyan.yaml + Dockerfile

sdks/python/template/   — cyan.yaml + Dockerfile
sdks/python/processor/  — cyan.yaml + Dockerfile
sdks/python/plugin/      — cyan.yaml + Dockerfile
sdks/python/resolver/   — cyan.yaml + Dockerfile
```

### Dockerfile Patterns

All Dockerfiles use `COPY ../` to reference the SDK source from the parent directory, keeping core SDK code untouched.

**.NET** — SDK source is at `../`:

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

**Node.js** — SDK source is at `../`:

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

**Python** — SDK source is at `../`:

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

### Node Entry Points

Each artifact needs an entry point file at `src/{artifact}_entry.ts` in `sdks/node/`. Create these minimal files that import and call the appropriate `Start*` function from `main.ts`. The Dockerfile's `CMD` points to `../src/{artifact}_entry.ts`.

---

## Step 4: Create and Run Tests

For each of the 12 artifact subdirectories, create `test.cyan.yaml` with comprehensive test cases that exercise all features of the artifact, then run `cyanprint test <artifact> <path>` to verify.

### Test Coverage Requirements

Test **all features** within each artifact type (not just 2 test cases):

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

### Test Case Reference

**Template tests** — Send answer states to `/api/template/init`, expect questionnaire responses or final cyan output:

```yaml
tests:
  - name: init_q1
    expected:
      type: snapshot
      value:
        path: ./snapshots/init_q1
  - name: complete_questionnaire
    expected:
      type: snapshot
      value:
        path: ./snapshots/complete_questionnaire
```

**Processor tests** — Send ProcessorInput to `/api/process`, expect output files, optionally validate:

```yaml
tests:
  - name: basic_variable_replacement
    expected:
      type: snapshot
      value:
        path: ./snapshots/basic_variable_replacement
    input: ./inputs/basic
    config:
      vars:
        name: 'World'
    validate:
      - test -f output.txt
```

**Plugin tests** — Send PluginInput to `/api/plug`, validate output:

```yaml
tests:
  - name: generates_deterministic_file
    expected:
      type: snapshot
      value:
        path: ./snapshots/generates_deterministic_file
    validate:
      - test -f outputfile
```

**Resolver tests** — Send multiple file versions to `/api/resolve`, expect merged output (no `validate` support):

```yaml
tests:
  - name: simple_merge
    expected:
      type: snapshot
      value:
        path: ./snapshots/simple_merge
    config: {}
    resolver_inputs:
      - path: ./inputs/template-a
        origin:
          template: template-a
          layer: 0
      - path: ./inputs/template-b
        origin:
          template: template-b
          layer: 1
```

---

## Step 5: Update Taskfile.yaml

Add `cyanprint test` commands to root `Taskfile.yaml`:

```yaml
tasks:
  setup:
    cmds:
      - task: dotnet:setup
      - task: node:setup
      - task: python:setup

  test:all:
    desc: 'Run all artifact tests across all 3 languages'
    cmds:
      - task: test:dotnet
      - task: test:node
      - task: test:python

  test:dotnet:
    desc: 'Test all .NET artifacts'
    cmds:
      - cyanprint test template sdks/dotnet/template
      - cyanprint test processor sdks/dotnet/processor
      - cyanprint test plugin sdks/dotnet/plugin
      - cyanprint test resolver sdks/dotnet/resolver

  test:node:
    desc: 'Test all Node.js artifacts'
    cmds:
      - cyanprint test template sdks/node/template
      - cyanprint test processor sdks/node/processor
      - cyanprint test plugin sdks/node/plugin
      - cyanprint test resolver sdks/node/resolver

  test:python:
    desc: 'Test all Python artifacts'
    cmds:
      - cyanprint test template sdks/python/template
      - cyanprint test processor sdks/python/processor
      - cyanprint test plugin sdks/python/plugin
      - cyanprint test resolver sdks/python/resolver
```

---

## Step 6: Update CI

Update `.github/workflows/ci.yaml` to replace the old `template-test` job with `cyanprint test` based jobs. Create `.github/workflows/⚡reusable-cyanprint-test.yaml` that runs `cyanprint test <artifact>` for all 3 languages.

---

## Acceptance Criteria

- [ ] Old artifacts and test infrastructure fully removed (Step 1)
- [ ] Skill `.claude/skills/cyanprint-test/SKILL.md` exists and documents the full pattern (Step 2)
- [ ] All 12 `cyan.yaml` files exist (with `build:` section, registry: kirinnee) (Step 3)
- [ ] All 12 Dockerfiles exist and run API servers (not test runners), using `COPY ../` to reference SDK source (Step 3)
- [ ] All 12 `test.cyan.yaml` files exist with comprehensive test cases covering all artifact features (Step 4)
- [ ] `snapshots/` directories exist for all 12 (Step 4)
- [ ] Root `Taskfile.yaml` has `test:all`, `test:dotnet`, `test:node`, `test:python` tasks (Step 5)
- [ ] CI updated to run `cyanprint test` for all artifacts (Step 6)
- [ ] `task test:all` passes for all 12 combinations

---

## Out of Scope

- Modifying SDK source code (domain logic, API handlers, type definitions)
- Unit tests for SDK internals
- Setting up the CyanPrint registry/daemon (assumed pre-configured)

---

## Constraints

- All Dockerfiles must use `LABEL cyanprint.dev=true`
- All artifact servers must listen on their designated ports (5550/5551/5552/5553)
- Dockerfiles must be non-root
- All state files (`.kagent/`) must not be committed
- `cyanprint test` requires the CyanPrint daemon running (`cyanprint daemon start`)
- Core SDK source code (`sdks/*/src/`, `sdks/*/cyanprintsdk/`, `sdks/*/sulfone-helium/`) is never modified
