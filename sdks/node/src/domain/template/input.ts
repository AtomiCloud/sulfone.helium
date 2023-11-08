import type { Answer } from "../core/answer.js";

interface TemplateInput {
  readonly answers: Answer[];
  readonly deterministicState: Record<string, string>[];
}

interface TemplateValidateInput {
  readonly answers: Answer[];
  readonly deterministicState: Record<string, string>[];
  readonly validate: string;
}

// export all
export type { TemplateInput, TemplateValidateInput };
