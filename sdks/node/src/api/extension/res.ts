import type { CyanRes } from '../core/cyan_res.js';
import type { QuestionRes } from '../core/question_res.js';

interface ExtensionValidRes {
  valid: string | null;
}

interface ExtensionFinalRes {
  cyan: CyanRes;
  type: 'final'; // Type discriminator value
}

interface ExtensionQnARes {
  deterministicState: Record<string, string>[];
  question: QuestionRes;
  type: 'questionnaire'; // Type discriminator value
}

type ExtensionRes = ExtensionQnARes | ExtensionFinalRes;

// export all
export type { ExtensionRes, ExtensionQnARes, ExtensionFinalRes, ExtensionValidRes };
