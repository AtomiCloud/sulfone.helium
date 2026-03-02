# Resolver API

**Base Path**: `http://localhost:5553`

**Key Files**:

- Node: `sdks/node/src/main.ts` → `StartResolver()`
- Python: `sdks/python/cyanprintsdk/main.py` → `start_resolver()`
- .NET: `sdks/dotnet/sulfone-helium/Server.cs` → `StartResolver()`

## Endpoints

### POST /api/resolve

Resolve conflicts between multiple file versions from different template layers.

**Parameters**:

| Name | In   | Type          | Required | Description        |
| ---- | ---- | ------------- | -------- | ------------------ |
| body | body | `ResolverReq` | Yes      | Resolution request |

**Request Body** (`ResolverReq`):

| Field  | Type                | Required | Description                                      |
| ------ | ------------------- | -------- | ------------------------------------------------ |
| config | `object`            | Yes      | Resolver-specific configuration (merge strategy) |
| files  | `ResolvedFileReq[]` | Yes      | Array of file versions to merge                  |

**ResolvedFileReq**:

| Field   | Type            | Required | Description                           |
| ------- | --------------- | -------- | ------------------------------------- |
| path    | `string`        | Yes      | File path (same for all versions)     |
| content | `string`        | Yes      | File content                          |
| origin  | `FileOriginReq` | Yes      | Source template and layer information |

**FileOriginReq**:

| Field    | Type     | Required | Description                                            |
| -------- | -------- | -------- | ------------------------------------------------------ |
| template | `string` | Yes      | Full template spec (e.g., "username/template:version") |
| layer    | `number` | Yes      | Layer number in the template stack                     |

**Response** `200 OK` (`ResolverRes`):

| Field   | Type     | Description         |
| ------- | -------- | ------------------- |
| path    | `string` | File path           |
| content | `string` | Merged file content |

**Key Files**:

- Node: `sdks/node/src/api/resolver/req.ts` → `ResolverReq`
- Node: `sdks/node/src/api/resolver/res.ts` → `ResolverRes`
- Node: `sdks/node/src/main.ts` → Endpoint handler

## DTOs

### ResolverReq

```typescript
interface ResolverReq {
  config: Record<string, unknown>;
  files: ResolvedFileReq[];
}

interface ResolvedFileReq {
  path: string;
  content: string;
  origin: FileOriginReq;
}

interface FileOriginReq {
  template: string;
  layer: number;
}
```

**Key File**: `sdks/node/src/api/resolver/req.ts`

### ResolverRes

```typescript
interface ResolverRes {
  path: string;
  content: string;
}
```

**Key File**: `sdks/node/src/api/resolver/res.ts`

## Error Codes

| Code | Meaning        | Resolution                |
| ---- | -------------- | ------------------------- |
| 400  | Bad request    | Check request body format |
| 500  | Internal error | Check container logs      |
