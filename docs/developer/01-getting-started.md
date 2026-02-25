# Getting Started

Setup and quickstart guide for Helium SDKs.

## Prerequisites

- Docker (for running containers)
- Node.js 22+, Python 3.12+, or .NET 8 (depending on your chosen SDK)

## Installation

### Node.js / TypeScript

**Package**: `@atomicloud/cyan-sdk` on npm

```bash
npm install @atomicloud/cyan-sdk
```

**TypeScript Configuration**:
Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2022",
    "strict": true
  }
}
```

### Python

**Package**: `cyanprintsdk` on PyPI

```bash
pip install cyanprintsdk
```

Or with Poetry:

```bash
poetry add cyanprintsdk
```

**Python Version**: Requires Python 3.12+

### .NET/C#

**Package**: `AtomiCloud.CyanPrint` on NuGet

```bash
dotnet add package AtomiCloud.CyanPrint
```

**.NET Version**: Requires .NET 8.0+

## Development Setup

For contributors working on Helium itself:

### Using Taskfile (Recommended)

```bash
pls setup
```

This sets up the development environment with all required tools.

If you have direnv installed, the Nix development shell will be automatically loaded when entering the directory, providing:

- Node.js 22
- Python 3.12
- .NET 8
- Go
- Poetry
- Bun

### Per-SDK Setup

#### Node.js SDK

```bash
cd sdks/node
bun install
bun run build
```

#### Python SDK

```bash
cd sdks/python
poetry install
```

#### .NET SDK

```bash
cd sdks/dotnet
dotnet restore
dotnet build
```

## Quick Start

Create your first CyanPrint template in 5 minutes.

### 1. Create a Template Project

```bash
mkdir my-first-template
cd my-first-template
npm init -y
npm install @atomicloud/cyan-sdk
```

### 2. Create the Template Script

Create `template.ts`:

```typescript
import { StartTemplateWithLambda, type IInquirer, type Cyan, GlobType } from '@atomicloud/cyan-sdk';

const template = async (prompt: IInquirer): Promise<Cyan> => {
  const name = await prompt.text('What is your name?', 'name', null);
  const language = await prompt.select('What programming language?', ['TypeScript', 'Python', 'Go'], 'lang', null);
  const useTests = await prompt.confirm('Include tests?', 'tests', null);

  return {
    processors: [
      {
        name: 'my-processor',
        files: [
          {
            glob: '**/*',
            type: GlobType.Template,
          },
        ],
        config: {
          name,
          language,
          useTests,
        },
      },
    ],
    plugins: [],
  };
};

StartTemplateWithLambda(template);
```

### 3. Build and Run

```bash
# Build the TypeScript (uses tsconfig.json)
npx tsc

# Run the template server (typically via Docker in actual use)
node dist/template.js
```

The template server will start on port 5550 and listen for:

- `POST /api/template/init` - Initialize with answers
- `POST /api/template/validate` - Validate input

### 4. Test the Template

```bash
curl -X POST http://localhost:5550/api/template/init \
  -H "Content-Type: application/json" \
  -d '{"answers": {}, "deterministicStates": {}}'
```

Response:

```json
{
  "deterministicStates": {},
  "question": {
    "type": "text",
    "message": "What is your name?"
  }
}
```

## What You Just Did

You created a CyanPrint template that:

1. Prompts the user for their name using `prompt.text()`
2. Offers a language selection using `prompt.select()`
3. Asks a yes/no question using `prompt.confirm()`
4. Returns a structured object with the collected answers

The checkpoint-based flow means the template throws an exception when it needs input, allowing the coordinator to prompt the user and retry.

## Verification

Verify your installation:

### Node.js

```typescript
import { StartTemplateWithLambda } from '@atomicloud/cyan-sdk';
console.log('Helium SDK loaded successfully');
```

### Python

```python
from cyanprintsdk import start_template
print("Helium SDK loaded successfully")
```

### .NET

```csharp
using Sulfone.Helium;
// SDK loads successfully
```

## Version Compatibility

| Helium Version | CyanPrint Platform |
| -------------- | ------------------ |
| 2.0.x          | Current            |
| 1.x            | Deprecated         |

All three SDKs are versioned in lockstep to ensure API compatibility.

## Next Steps

- [Architecture](./02-architecture.md) - System overview
- [Features](./features/) - What this component does
- [Concepts](./concepts/) - Domain terminology
