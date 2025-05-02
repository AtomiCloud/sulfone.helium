import type { AnswerReq } from '../core/answer_req.js';

interface TemplateValidateReq {
  answers: Record<string, AnswerReq>;
  deterministicStates: Record<string, string>;
  validate: string;
}

interface TemplateAnswerReq {
  answers: Record<string, AnswerReq>;
  deterministicStates: Record<string, string>;
}

// export all
export type { TemplateAnswerReq, TemplateValidateReq };
