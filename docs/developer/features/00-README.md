# Features Overview

Brief description of what this section contains.

## Map

How items in this section relate:

```mermaid
flowchart TD
    A[Template API] --> B[Cyan Config]
    B --> C[Processor API]
    B --> D[Plugin API]
    A --> E[IInquirer]
    A --> F[IDeterminism]
    C --> G[CyanFileHelper]
```

| Item | Role |
|------|------|
| Template API | Interactive questioning → Cyan config |
| Processor API | File transformation based on Cyan config |
| Plugin API | Post-processing hooks after processing |
| IInquirer | 6 question types for prompting |
| IDeterminism | Cached non-deterministic values |
| CyanFileHelper | Virtual file system for processors |

## All Features

| Item | What | Why | Key Files |
|------|------|-----|-----------|
| [Template API](./01-template-api.md) | Interactive prompting for Cyan config generation | Enables user input collection without server-side state | `sdks/node/src/domain/template/service.ts` |
| [Processor API](./02-processor-api.md) | File transformation engines | Apply templating logic to generate files | `sdks/node/src/domain/processor/service.ts` |
| [Plugin API](./03-plugin-api.md) | Post-processing utilities | Add/remove/transform files after processing | `sdks/node/src/domain/plugin/service.ts` |

## Groups

### Group 1: Core APIs

- **[Template API](./01-template-api.md)** - Interactive prompting → Cyan config
- **[Processor API](./02-processor-api.md)** - File transformation
- **[Plugin API](./03-plugin-api.md)** - Post-processing hooks
