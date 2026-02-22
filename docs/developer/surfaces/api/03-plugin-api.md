# Plugin API

**Base Path**: `http://localhost:5552`

**Key Files**:
- Node: `sdks/node/src/main.ts` → `StartPlugin()`
- Python: `sdks/python/cyanprintsdk/main.py` → `start_plugin()`
- .NET: `sdks/dotnet/sulfone-helium/Server.cs` → `StartPlugin()`

## Endpoints

### POST /api/plug

Apply plugin to processed files.

**Parameters**:

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| body | body | `PluginReq` | Yes | Plugin request |

**Request Body** (`PluginReq`):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| directory | `string` | Yes | Output directory containing processed files |
| config | `Record<string, unknown>` | Yes | Plugin-specific configuration |

**Response** `200 OK` (`PluginRes`):

| Field | Type | Description |
|-------|------|-------------|
| outputDir | `string` | Output directory containing processed files |

**Key Files**:
- Node: `sdks/node/src/api/plugin/req.ts` → `PluginReq`
- Node: `sdks/node/src/api/plugin/res.ts` → `PluginRes`
- Node: `sdks/node/src/main.ts` → Endpoint handler

## DTOs

### PluginReq

```typescript
interface PluginReq {
  directory: string;
  config: Record<string, unknown>;
}
```

**Key File**: `sdks/node/src/api/plugin/req.ts`

### PluginRes

```typescript
interface PluginRes {
  outputDir: string;
}
```

**Key File**: `sdks/node/src/api/plugin/res.ts`

## Error Codes

| Code | Meaning | Resolution |
|------|---------|------------|
| 400 | Bad request | Check request body format |
| 500 | Internal error | Check container logs |
