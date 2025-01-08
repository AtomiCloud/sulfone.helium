import type { AnswerReq } from '../core/answer_req.js';
import type { CyanReq } from '../core/cyan_req.js';

interface ExtensionValidateReq {
  answers: AnswerReq[];
  deterministicStates: Record<string, string>[];
  prevAnswers: AnswerReq[];
  prevCyan: CyanReq;
  prevExtensionAnswers: Record<string, AnswerReq[]>;
  prevExtensionCyans: Record<string, CyanReq>;
  validate: string;
}

interface ExtensionAnswerReq {
  answers: AnswerReq[];
  deterministicStates: Record<string, string>[];
  prevAnswers: AnswerReq[];
  prevCyan: CyanReq;
  prevExtensionAnswers: Record<string, AnswerReq[]>;
  prevExtensionCyans: Record<string, CyanReq>;
}

// export all
export type { ExtensionAnswerReq, ExtensionValidateReq };
