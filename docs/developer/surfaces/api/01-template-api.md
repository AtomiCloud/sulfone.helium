# Template API

**Base Path**: `http://localhost:5550`

**Key Files**:

- Node: `sdks/node/src/main.ts` → `StartTemplate()`
- Python: `sdks/python/cyanprintsdk/main.py` → `start_template()`
- .NET: `sdks/dotnet/sulfone-helium/Server.cs` → `StartTemplate()`

## Endpoints

### POST /api/template/init

Execute template with accumulated answers.

**Parameters**:

| Name | In   | Type                | Required | Description                     |
| ---- | ---- | ------------------- | -------- | ------------------------------- |
| body | body | `TemplateAnswerReq` | Yes      | Answers and deterministic state |

**Request Body** (`TemplateAnswerReq`):

| Field               | Type                        | Required | Description                                 |
| ------------------- | --------------------------- | -------- | ------------------------------------------- |
| answers             | `Record<string, AnswerReq>` | Yes      | Accumulated answers from previous questions |
| deterministicStates | `Record<string, string>`    | Yes      | Cached non-deterministic values             |

**Response** `200 OK`:

Returns either a question response (questionnaire) or final response (final).

**Questionnaire Response** (`TemplateQnARes`):

| Field              | Type                     | Description                                |
| ------------------ | ------------------------ | ------------------------------------------ |
| type               | `"questionnaire"`        | Discriminator indicating question response |
| deterministicState | `Record<string, string>` | Updated deterministic state                |
| question           | `QuestionRes`            | Next question to ask                       |

**Final Response** (`TemplateFinalRes`):

| Field | Type      | Description                             |
| ----- | --------- | --------------------------------------- |
| type  | `"final"` | Discriminator indicating final response |
| cyan  | `CyanRes` | Completed Cyan config                   |

**Key Files**:

- Node: `sdks/node/src/api/template/req.ts` → `TemplateAnswerReq`
- Node: `sdks/node/src/api/template/res.ts` → `TemplateRes`, `TemplateQnARes`, `TemplateFinalRes`
- Node: `sdks/node/src/main.ts` → Endpoint handler

---

### POST /api/template/validate

Validate user input for the current question.

**Parameters**:

| Name | In   | Type                  | Required | Description                   |
| ---- | ---- | --------------------- | -------- | ----------------------------- |
| body | body | `TemplateValidateReq` | Yes      | Answers and value to validate |

**Request Body** (`TemplateValidateReq`):

| Field               | Type                        | Required | Description                     |
| ------------------- | --------------------------- | -------- | ------------------------------- |
| answers             | `Record<string, AnswerReq>` | Yes      | Accumulated answers             |
| deterministicStates | `Record<string, string>`    | Yes      | Cached non-deterministic values |
| validate            | `string`                    | Yes      | User input to validate          |

**Response** `200 OK` (`TemplateValidRes`):

| Field | Type             | Description                                              |
| ----- | ---------------- | -------------------------------------------------------- |
| valid | `string \| null` | Error message if invalid, null if valid (optional field) |

**Key Files**:

- Node: `sdks/node/src/api/template/req.ts` → `TemplateValidateReq`
- Node: `sdks/node/src/api/template/res.ts` → `TemplateValidRes`
- Node: `sdks/node/src/main.ts` → Endpoint handler

## DTOs

### TemplateAnswerReq

```typescript
interface TemplateAnswerReq {
  answers: Record<string, AnswerReq>;
  deterministicStates: Record<string, string>;
}
```

**Key File**: `sdks/node/src/api/template/req.ts`

### TemplateQnARes

```typescript
interface TemplateQnARes {
  type: 'questionnaire';
  deterministicState: Record<string, string>;
  question: QuestionRes;
}
```

**Key File**: `sdks/node/src/api/template/res.ts`

### TemplateFinalRes

```typescript
interface TemplateFinalRes {
  type: 'final';
  cyan: CyanRes;
}
```

**Key File**: `sdks/node/src/api/template/res.ts`

### AnswerReq

```typescript
// Structural union — differentiated by the type of the answer field
type AnswerReq = StringAnswerReq | StringArrayAnswerReq | BoolAnswerReq;

interface StringAnswerReq {
  answer: string;
}

interface StringArrayAnswerReq {
  answer: string[];
}

interface BoolAnswerReq {
  answer: boolean;
}
```

**Key File**: `sdks/node/src/api/core/answer_req.ts`

### QuestionRes

```typescript
interface QuestionRes {
  type: QuestionType;
  id: string;
  message: string;
  desc?: string | null;
  // Type-specific fields...
}
```

**Key File**: `sdks/node/src/api/core/question_res.ts`

### CyanRes

```typescript
interface CyanRes {
  processors: CyanProcessorRes[];
  plugins: CyanPluginRes[];
}

interface CyanProcessorRes {
  name: string;
  config: unknown;
  files: CyanGlobRes[];
}

interface CyanPluginRes {
  name: string;
  config: unknown;
}

interface CyanGlobRes {
  glob: string;
  root?: string | null;
  exclude: string[];
  type: string; // "template" or "copy"
}
```

**Key File**: `sdks/node/src/api/core/cyan_res.ts`

**Note**: The `type` field in `CyanGlobRes` is a string literal (`"template"` or `"copy"`), not the `GlobType` enum. The domain layer uses the `GlobType` enum, which is mapped to string literals in the API layer.

## Error Codes

| Code | Meaning        | Resolution                |
| ---- | -------------- | ------------------------- |
| 400  | Bad request    | Check request body format |
| 500  | Internal error | Check container logs      |
