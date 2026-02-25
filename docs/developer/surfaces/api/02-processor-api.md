# Processor API

**Base Path**: `http://localhost:5551`

**Key Files**:

- Node: `sdks/node/src/main.ts` → `StartProcessor()`
- Python: `sdks/python/cyanprintsdk/main.py` → `start_processor()`
- .NET: `sdks/dotnet/sulfone-helium/Server.cs` → `StartProcessor()`

## Endpoints

### POST /api/process

Process files based on glob patterns and configuration.

**Parameters**:

| Name | In   | Type           | Required | Description        |
| ---- | ---- | -------------- | -------- | ------------------ |
| body | body | `ProcessorReq` | Yes      | Processing request |

**Request Body** (`ProcessorReq`):

| Field    | Type        | Required | Description                      |
| -------- | ----------- | -------- | -------------------------------- |
| readDir  | `string`    | Yes      | Directory to read files from     |
| writeDir | `string`    | Yes      | Directory to write files to      |
| globs    | `GlobReq[]` | Yes      | Glob patterns for file matching  |
| config   | `unknown`   | Yes      | Processor-specific configuration |

**GlobReq** (CyanGlobReq):

| Field   | Type             | Required | Description                     |
| ------- | ---------------- | -------- | ------------------------------- |
| glob    | `string`         | Yes      | Glob pattern                    |
| root    | `string \| null` | No       | Root directory for pattern      |
| exclude | `string[]`       | Yes      | Exclude patterns                |
| type    | `string`         | Yes      | GlobType ("template" or "copy") |

**Response** `200 OK` (`ProcessorRes`):

| Field     | Type     | Description                                 |
| --------- | -------- | ------------------------------------------- |
| outputDir | `string` | Output directory containing processed files |

**Key Files**:

- Node: `sdks/node/src/api/processor/req.ts` → `ProcessorReq`
- Node: `sdks/node/src/api/processor/res.ts` → `ProcessorRes`
- Node: `sdks/node/src/main.ts` → Endpoint handler

## DTOs

### ProcessorReq

```typescript
interface ProcessorReq {
  readDir: string;
  writeDir: string;
  globs: CyanGlobReq[];
  config: unknown;
}

interface CyanGlobReq {
  glob: string;
  root?: string;
  exclude: string[];
  type: string;
}
```

**Key File**: `sdks/node/src/api/processor/req.ts`

### ProcessorRes

```typescript
interface ProcessorRes {
  outputDir: string;
}
```

**Key File**: `sdks/node/src/api/processor/res.ts`

## Error Codes

| Code | Meaning        | Resolution                |
| ---- | -------------- | ------------------------- |
| 400  | Bad request    | Check request body format |
| 500  | Internal error | Check container logs      |
