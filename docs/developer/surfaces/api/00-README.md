# HTTP API Overview

**Base Paths**:
- Template: `http://localhost:5550`
- Processor: `http://localhost:5551`
- Plugin: `http://localhost:5552`

## Map

```mermaid
flowchart TD
    A[HTTP API] --> B[Template API<br/>Port 5550]
    A --> C[Processor API<br/>Port 5551]
    A --> D[Plugin API<br/>Port 5552]
    B --> E[POST /api/template/init]
    B --> F[POST /api/template/validate]
    C --> G[POST /api/process]
    D --> H[POST /api/plug]
```

| API | Port | Purpose |
|-----|------|---------|
| Template API | 5550 | Interactive questioning for Cyan config |
| Processor API | 5551 | File transformation |
| Plugin API | 5552 | Post-processing hooks |

## All Endpoints

| Endpoint | Method | Purpose | Key File |
|----------|--------|---------|----------|
| [Template Init](./01-template-api.md#post-apitemplateinit) | POST | Execute template with answers | `sdks/node/src/main.ts` |
| [Template Validate](./01-template-api.md#post-apitemplatevalidate) | POST | Validate user input | `sdks/node/src/main.ts` |
| [Process](./02-processor-api.md#post-apiprocess) | POST | Process files | `sdks/node/src/main.ts` |
| [Plug](./03-plugin-api.md#post-apiplug) | POST | Apply plugin | `sdks/node/src/main.ts` |

## Health Check

All services provide a health check endpoint:

| Endpoint | Method | Response |
|----------|--------|----------|
| `GET /` | GET | `{"Status": "OK", "Message": "OK"}` |

**Key File**: `sdks/node/src/main.ts` → `createApp()`

## Groups

### Group 1: Template Endpoints

- **[Template API](./01-template-api.md)** - `/api/template/init`, `/api/template/validate`

### Group 2: Processor Endpoint

- **[Processor API](./02-processor-api.md)** - `/api/process`

### Group 3: Plugin Endpoint

- **[Plugin API](./03-plugin-api.md)** - `/api/plug`
