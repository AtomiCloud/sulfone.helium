import type { CyanRes } from '../core/cyan_res.js';
import type { QuestionRes } from '../core/question_res.js';

interface TemplateValidRes {
  valid?: string | null; // Use optional property for nullability
}

interface TemplateFinalRes {
  cyan: CyanRes;
  type: 'final';
}

interface TemplateQnARes {
  deterministicState: Record<string, string>;
  question: QuestionRes;
  type: 'questionnaire';
}

type TemplateRes = TemplateQnARes | TemplateFinalRes;

// export all
export type { TemplateRes, TemplateQnARes, TemplateFinalRes, TemplateValidRes };
