import type { Answer } from "../core/answer.js";
import type { Cyan } from "../core/cyan.js";

interface ExtensionAnswerInput {
  answers: Answer[];
  deterministicState: Record<string, string>[];
  prevAnswers: Answer[];
  prevCyan: Cyan;
  prevExtensionAnswers: Record<string, Answer[]>;
  prevExtensionCyans: Record<string, Cyan>;
}

interface ExtensionValidateInput {
  answers: Answer[];
  deterministicState: Record<string, string>[];
  prevAnswers: Answer[];
  prevCyan: Cyan;
  prevExtensionAnswers: Record<string, Answer[]>;
  prevExtensionCyans: Record<string, Cyan>;
  validate: string;
}

// export all
export type { ExtensionAnswerInput, ExtensionValidateInput };
