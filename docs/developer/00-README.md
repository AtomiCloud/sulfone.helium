# Helium Developer Documentation

Helium is the **Cyan SDK** collection for CyanPrint - providing multi-language SDKs (Node.js, Python, .NET) for building templates, processors, and plugins.

## Package Information

| Language | Package | Version |
|----------|---------|---------|
| Node.js | `@atomicloud/cyan-sdk` | 2.0.1 |
| Python | `cyanprintsdk` | 2.0.1 |
| .NET | `AtomiCloud.CyanPrint` | 2.0.1 |

## Quick Links

- [Getting Started](./01-getting-started.md) - Setup and quickstart
- [Architecture](./02-architecture.md) - System overview and design decisions
- [Concepts](./concepts/) - Domain terminology and ideas
- [Features](./features/) - Complex services requiring documentation
- [Modules](./modules/) - Code organization and structure
- [Surfaces](./surfaces/) - External interfaces (HTTP API)

## Start Here

1. **New users**: Start with [Getting Started](./01-getting-started.md)
2. **Understanding the system**: Read [Architecture](./02-architecture.md)
3. **Learning concepts**: Explore [Concepts](./concepts/)
4. **Building features**: See [Features](./features/)
5. **API reference**: Check [Surfaces](./surfaces/)

## Overview

Helium provides SDKs for building CyanPrint artifacts:

- **Templates**: Interactive question-based artifacts that collect user input
- **Processors**: File transformation engines that apply templating logic
- **Plugins**: Post-processing utilities for file modification and side effects

## SDK Locations

| Language | Path |
|----------|------|
| .NET | `sdks/dotnet/sulfone-helium/` |
| Node.js | `sdks/node/` |
| Python | `sdks/python/cyanprintsdk/` |
