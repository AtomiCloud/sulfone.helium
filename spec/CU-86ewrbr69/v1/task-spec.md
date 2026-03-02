# Task Specification: [He] Implement Resolver SDK for all supported languages (CU-86ewrbr69)

## Source

| Field  | Value                               |
| ------ | ----------------------------------- |
| Ticket | CU-86ewrbr69                        |
| System | ClickUp                             |
| URL    | https://app.clickup.com/t/86ewrbr69 |
| Parent | CU-86ewr9nen (Resolver system)      |

## Objective

Implement Resolver SDKs for Node.js, Python, and .NET that enable developers to create resolvers - stateless services on port 5553 implementing the conflict resolution API. Resolvers receive multiple versions of the same file from different template layers and return merged content.

---

## API Contract

### Request: `POST /api/resolve`

```json
{
  "config": { "strategy": "deep-merge", "array_strategy": "append" },
  "files": [
    {
      "path": "package.json",
      "content": "{ \"name\": \"project\", \"dependencies\": {} }",
      "origin": { "template": "atomi/frontend-template:5", "layer": 4 }
    },
    {
      "path": "package.json",
      "content": "{ \"name\": \"project\", \"devDependencies\": {} }",
      "origin": { "template": "atomi/backend-template:3", "layer": 3 }
    }
  ]
}
```

### Response

```json
{
  "path": "package.json",
  "content": "{ \"name\": \"project\", \"dependencies\": {}, \"devDependencies\": {} }"
}
```

### Health Check: `GET /`

```json
{ "Status": "OK", "Message": "OK" }
```

### Port Assignment

| Artifact  | Port |
| --------- | ---- |
| Template  | 5550 |
| Processor | 5551 |
| Plugin    | 5552 |
| Resolver  | 5553 |

---

## Type Definitions

```typescript
// Domain types (adapt to each language's conventions)
interface FileOrigin {
  template: string; // Full spec: "username/template:version"
  layer: number;
}

interface ResolvedFile {
  path: string;
  content: string;
  origin: FileOrigin;
}

interface ResolverInput {
  config: Record<string, any>;
  files: ResolvedFile[];
}

interface ResolverOutput {
  path: string;
  content: string;
}

interface ICyanResolver {
  resolve(input: ResolverInput): Promise<ResolverOutput>;
}
```

---

## Acceptance Criteria

### Node.js SDK (`sdks/node/src/`)

| File                         | Types/Exports                                                      |
| ---------------------------- | ------------------------------------------------------------------ |
| `domain/resolver/input.ts`   | `ResolverInput`, `ResolvedFile`, `FileOrigin`                      |
| `domain/resolver/output.ts`  | `ResolverOutput`                                                   |
| `domain/resolver/service.ts` | `ResolverService`                                                  |
| `domain/core/cyan_script.ts` | Add `ICyanResolver` interface                                      |
| `api/resolver/req.ts`        | `ResolverReq`                                                      |
| `api/resolver/res.ts`        | `ResolverRes`                                                      |
| `api/resolver/lambda.ts`     | `LambdaResolverFn`, `LambdaResolver`                               |
| `api/resolver/mapper.ts`     | `ResolverMapper.toDomain()`, `ResolverMapper.toRes()`              |
| `main.ts`                    | Add `StartResolver()`, `StartResolverWithLambda()`, update exports |

### Python SDK (`sdks/python/cyanprintsdk/`)

| File                         | Types/Exports                                      |
| ---------------------------- | -------------------------------------------------- |
| `domain/resolver/input.py`   | `ResolverInput`, `ResolvedFile`, `FileOrigin`      |
| `domain/resolver/output.py`  | `ResolverOutput`                                   |
| `domain/resolver/service.py` | `ResolverService`                                  |
| `domain/core/cyan_script.py` | Add `ICyanResolver` interface                      |
| `api/resolver/req.py`        | `ResolverReq`                                      |
| `api/resolver/res.py`        | `ResolverRes`                                      |
| `api/resolver/fn.py`         | `LambdaResolverFn`, `LambdaResolver`               |
| `api/resolver/mapper.py`     | `ResolverMapper`                                   |
| `main.py`                    | Add `start_resolver()`, `start_resolver_with_fn()` |

### .NET SDK (`sdks/dotnet/sulfone-helium/`)

| File                         | Types/Exports                                   |
| ---------------------------- | ----------------------------------------------- |
| `Domain/Resolver/Input.cs`   | `ResolverInput`, `ResolvedFile`, `FileOrigin`   |
| `Domain/Resolver/Output.cs`  | `ResolverOutput`                                |
| `Domain/Resolver/Service.cs` | `ResolverService`                               |
| `Domain/Core/CyanScript.cs`  | Add `ICyanResolver` interface                   |
| `Api/Resolver/ReqModel.cs`   | `ResolverReq`                                   |
| `Api/Resolver/ResModel.cs`   | `ResolverRes`                                   |
| `Api/Resolver/Lambda.cs`     | `LambdaResolver` (delegate + class)             |
| `Api/Resolver/Mapper.cs`     | `ResolverMapper`                                |
| `Server.cs`                  | Add `StartResolver()` overloads to `CyanEngine` |

### Taskfile Integration

| SDK    | File                        | Task                                                          |
| ------ | --------------------------- | ------------------------------------------------------------- |
| .NET   | `sdks/dotnet/Taskfile.yaml` | `resolver` task (dir: sulfone-helium-resolver-api, port 5553) |
| Node   | `sdks/node/Taskfile.yaml`   | `resolver` task (bun resolver_test.ts)                        |
| Python | `sdks/python/Taskfile.yaml` | `resolver` task (poetry run python resolver_test.py)          |
| Root   | `Taskfile.yaml`             | Add `resolver` include for tests                              |

### Test Infrastructure

| File                              | Purpose                            |
| --------------------------------- | ---------------------------------- |
| `docker-compose.resolver.yaml`    | Multi-language resolver containers |
| `k6/resolver-api-test.js`         | K6 test cases                      |
| `sdks/dotnet/resolver.Dockerfile` | C# resolver image                  |
| `sdks/node/resolver.Dockerfile`   | Node resolver image                |
| `sdks/python/resolver.Dockerfile` | Python resolver image              |

### Example Projects (for Testing)

| SDK    | Files                                                            |
| ------ | ---------------------------------------------------------------- |
| .NET   | `sulfone-helium-resolver-api/Program.cs`, `.csproj` (add to sln) |
| Node   | `resolver_test.ts`                                               |
| Python | `resolver_test.py`                                               |

---

## Test Execution

### Command

```bash
pls resolver:test
```

### Flow

```text
pls resolver:test
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│ Root Taskfile.yaml                                          │
│   resolver:                                                 │
│     taskfile: tasks/Taskfile.test.yaml                      │
│     vars:                                                   │
│       COMPOSE_FILE: docker-compose.resolver.yaml            │
│       K6_FILE: resolver-api-test.js                         │
└─────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│ scripts/test.sh                                             │
│   1. docker compose -f docker-compose.resolver.yaml up -d   │
│   2. Wait for health on 5553, 5554, 5555                    │
│   3. PORT=5553 k6 run k6/resolver-api-test.js  (C#)         │
│   4. PORT=5554 k6 run k6/resolver-api-test.js  (Node)       │
│   5. PORT=5555 k6 run k6/resolver-api-test.js  (Python)     │
│   6. Cleanup containers                                     │
└─────────────────────────────────────────────────────────────┘
```

### Container Port Mapping

| Service         | Container Port | Host Port | K6 `PORT` |
| --------------- | -------------- | --------- | --------- |
| resolver-dotnet | 5553           | 5553      | 5553      |
| resolver-node   | 5553           | 5554      | 5554      |
| resolver-python | 5553           | 5555      | 5555      |

---

## Reference Patterns

| Pattern         | Node.js                       | Python                        | .NET                           |
| --------------- | ----------------------------- | ----------------------------- | ------------------------------ |
| Domain input    | `domain/processor/input.ts`   | `domain/processor/input.py`   | `Domain/Processor/Input.cs`    |
| Domain output   | `domain/processor/output.ts`  | `domain/processor/output.py`  | `Domain/Processor/Output.cs`   |
| Domain service  | `domain/processor/service.ts` | `domain/processor/service.py` | `Domain/Processor/Service.cs`  |
| Interface       | `domain/core/cyan_script.ts`  | `domain/core/cyan_script.py`  | `Domain/Core/CyanScript.cs`    |
| API req         | `api/processor/req.ts`        | `api/processor/req.py`        | `Api/Processor/ReqModel.cs`    |
| API res         | `api/processor/res.ts`        | `api/processor/res.py`        | `Api/Processor/ResModel.cs`    |
| API lambda      | `api/processor/lambda.ts`     | `api/processor/fn.py`         | `Api/Processor/Lambda.cs`      |
| API mapper      | `api/processor/mapper.ts`     | `api/processor/mapper.py`     | `Api/Processor/Mapper.cs`      |
| Entry point     | `main.ts`                     | `main.py`                     | `Server.cs`                    |
| Taskfile task   | `template` task               | `template` task               | `template`, `processor` tasks  |
| Dockerfile      | `template.Dockerfile`         | `template.Dockerfile`         | `template.Dockerfile`          |
| Example project | `template_test.ts`            | `template_test.py`            | `sulfone-helium-template-api/` |

---

## Technical Decisions

| Decision                   | Choice                                  | Reason                                 |
| -------------------------- | --------------------------------------- | -------------------------------------- |
| `FileOrigin.template`      | Full spec `"username/template:version"` | User clarification                     |
| `FileOrigin` fields        | `template`, `layer` only                | Version embedded in template string    |
| `ResolverService`          | No `CyanFileHelper`                     | Receives content directly, no file ops |
| `LambdaResolver` signature | `ResolverInput` only                    | No file system access                  |
| Error handling             | Implementer responsibility              | SDK is thin wrapper                    |
| Python lambda file         | `fn.py`                                 | Follows local pattern                  |
| Build tool                 | `pls`                                   | Superset of `task`                     |
| Internal port              | 5553 (all SDKs)                         | Consistent with other artifacts        |

---

## Definition of Done

- [ ] All acceptance criteria met
- [ ] `pls setup` succeeds for all SDKs
- [ ] `pls dotnet:resolver` starts on port 5553
- [ ] `pls node:resolver` starts on port 5553
- [ ] `pls python:resolver` starts on port 5553
- [ ] `pls resolver:test` passes all K6 tests
- [ ] TypeScript resolver SDK files compile correctly (specific TS errors introduced by this task are fixed; pre-existing external type conflicts in node_modules are out of scope)
- [ ] .NET builds (`dotnet build`)
- [ ] `pre-commit run --all` passes
- [ ] Follows existing patterns exactly
- [ ] Ticket ID in commit message

---

## Out of Scope

- Unit tests (not required for this task)
- Actual resolver implementations (json-merger, yaml-merger, etc.)
- Plugin SDK (noted as missing, separate task)
- VFS layerer changes (Iridium)
- Resolver registry (Zinc)
- Resolver containers (Boron)
- Resolver UI (Argon)
