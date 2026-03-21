# Plan 2: Create Artifact Build Configurations

## Goal and Scope

Create the build infrastructure for all 12 artifact-language combinations. This includes cyan.yaml files and Dockerfiles for each artifact (template, processor, plugin, resolver) across all three languages (Node.js, Python, .NET).

## Specific Files to Modify

### New Directory Structure:

```
sdks/{dotnet,node,python}/
├── template/              # Create cyan.yaml and Dockerfile
├── processor/             # Create cyan.yaml and Dockerfile
├── plugin/                # Create cyan.yaml and Dockerfile
└── resolver/              # Create cyan.yaml and Dockerfile
```

### Files to Create:

- 12 cyan.yaml files (one per artifact-language combination)
- 12 Dockerfiles (one per artifact-language combination)
- 4 Node.js entry point files in `sdks/node/src/` for each artifact

## Suggested Approach

1. **Template-driven creation**: Use the existing patterns from task-spec.md to create consistent configurations
2. **Language-specific handling**: Handle each language's requirements separately:
   - **.NET**: Use ASP.NET Core, expose correct port, use SDK project structure
   - **Node.js**: Use Bun, create entry point files, use src/ structure
   - **Python**: Use Poetry/Python, expose correct port, use cyanprintsdk structure
3. **Artifact-specific configurations**: Ensure each artifact runs on its designated port
4. **COPY strategy**: All Dockerfiles use `COPY ../` to reference SDK source from parent directory

## Edge Cases to Handle

- **Node.js entry points**: Need to create new entry point files that call existing Start\* functions from main.ts
- **Platform consistency**: Ensure all Dockerfiles use `LABEL cyanprint.dev=true`
- **Non-root users**: Set appropriate non-root user for each language
- **Port mapping**: Ensure correct exposure of ports 5550-5553 per artifact

## How to Test Independently

1. Verify `cyanprint build` works for each artifact:
   ```bash
   cyanprint build template sdks/dotnet/template
   cyanprint build processor sdks/dotnet/processor
   cyanprint build plugin sdks/dotnet/plugin
   cyanprint build resolver sdks/dotnet/resolver
   # Repeat for sdks/node/ and sdks/python/
   ```

## Integration Points with Other Plans

- **Plan 1**: Depends on removal of old Dockerfiles (no conflicts)
- **Plan 3**: Build configurations will be used by test.cyan.yaml files

## Implementation Checklist

From task-spec.md Step 3:

- [ ] All 12 `cyan.yaml` files exist (with `build:` section, registry: kirinnee)
- [ ] All 12 Dockerfiles exist and run API servers (not test runners), using `COPY ../` to reference SDK source
- [ ] Node entry point files created
