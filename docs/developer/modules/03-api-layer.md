# API Layer Module

**What**: HTTP endpoints and DTOs for Template, Processor, and Plugin services.

**Why**: Exposes domain services via HTTP protocol, enabling communication with Boron coordinator.

**Key Files**:

- `sdks/node/src/api/template/` - Template API endpoints and DTOs
- `sdks/node/src/api/processor/` - Processor API endpoints and DTOs
- `sdks/node/src/api/plugin/` - Plugin API endpoints and DTOs
- `sdks/node/src/api/core/` - Shared DTOs
- `sdks/node/src/main.ts` - Server startup and endpoint registration
- `sdks/python/cyanprintsdk/api/` - Python equivalents
- `sdks/dotnet/sulfone-helium/Api/` - .NET equivalents

## Responsibilities

What this module is responsible for:

- HTTP server startup (Express/aiohttp/ASP.NET Core)
- Endpoint registration for Template, Processor, Plugin
- Request/response DTO mapping
- Health check endpoints
- Graceful shutdown handling

## Structure

```text
api/
├── template/
│   ├── lambda.ts           # LambdaTemplate adapter
│   ├── mapper.ts           # Request/response mappers
│   ├── req.ts              # TemplateRequest DTOs
│   └── res.ts              # TemplateResponse DTOs
├── processor/
│   ├── lambda.ts           # LambdaProcessor adapter
│   ├── mapper.ts           # Request/response mappers
│   ├── req.ts              # ProcessorRequest DTOs
│   └── res.ts              # ProcessorResponse DTOs
├── plugin/
│   ├── lambda.ts           # LambdaPlugin adapter
│   ├── mapper.ts           # Request/response mappers
│   ├── req.ts              # PluginRequest DTOs
│   └── res.ts              # PluginResponse DTOs
└── core/
    ├── answer_req.ts       # Answer request DTOs
    ├── answer_res.ts       # Answer response DTOs
    ├── cyan_req.ts         # Cyan request DTOs
    ├── cyan_res.ts         # Cyan response DTOs
    ├── core_mapper.ts      # Shared mappers
    └── question_res.ts     # Question response DTOs
```

| File                  | Purpose                               |
| --------------------- | ------------------------------------- |
| `main.ts`             | Server startup, endpoint registration |
| `template/mapper.ts`  | Template request/response mapping     |
| `template/req.ts`     | Template request DTOs                 |
| `template/res.ts`     | Template response DTOs                |
| `processor/mapper.ts` | Processor request/response mapping    |
| `plugin/mapper.ts`    | Plugin request/response mapping       |
| `core/*`              | Shared DTOs and mappers               |

## Dependencies

```mermaid
flowchart LR
    A[API Layer] --> B[Domain Layer]
    C[Boron Coordinator] --> A
```

| Dependency   | Why                             |
| ------------ | ------------------------------- |
| Domain Layer | API layer calls domain services |

| Dependent         | Why                             |
| ----------------- | ------------------------------- |
| Boron Coordinator | Coordinator calls API endpoints |

## HTTP Endpoints

### Template API (Port 5550)

| Endpoint                 | Method | Purpose                       |
| ------------------------ | ------ | ----------------------------- |
| `/api/template/init`     | POST   | Execute template with answers |
| `/api/template/validate` | POST   | Validate user input           |

**Key File**: `sdks/node/src/main.ts` → `StartTemplate()`

### Processor API (Port 5551)

| Endpoint       | Method | Purpose       |
| -------------- | ------ | ------------- |
| `/api/process` | POST   | Process files |

**Key File**: `sdks/node/src/main.ts` → `StartProcessor()`

### Plugin API (Port 5552)

| Endpoint    | Method | Purpose      |
| ----------- | ------ | ------------ |
| `/api/plug` | POST   | Apply plugin |

**Key File**: `sdks/node/src/main.ts` → `StartPlugin()`

## Entry Points

| SDK    | Template                                       | Processor                                        | Plugin                                     |
| ------ | ---------------------------------------------- | ------------------------------------------------ | ------------------------------------------ |
| Node   | `StartTemplate()`, `StartTemplateWithLambda()` | `StartProcessor()`, `StartProcessorWithLambda()` | `StartPlugin()`, `StartPluginWithLambda()` |
| Python | `start_template()`, `start_template_with_fn()` | `start_processor()`, `start_processor_with_fn()` | `start_plugin()`, `start_plugin_with_fn()` |
| .NET   | `StartTemplate()`                              | `StartProcessor()`                               | `StartPlugin()`                            |

**Key Files**:

- Node: `sdks/node/src/main.ts`
- Python: `sdks/python/cyanprintsdk/main.py`
- .NET: `sdks/dotnet/sulfone-helium/Server.cs`

## Related

- [Domain Layer Module](./02-domain-layer.md) - Services called by API layer
- [Surfaces/API](../surfaces/api/) - Detailed HTTP API documentation
