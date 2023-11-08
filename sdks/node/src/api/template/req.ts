import { AnswerReq } from "../core/answer_req.js";

interface TemplateValidateReq {
  answers: AnswerReq[];
  deterministicStates: Record<string, string>[];
  validate: string;
}

interface TemplateAnswerReq {
  answers: AnswerReq[];
  deterministicStates: Record<string, string>[];
}

// export all
export type { TemplateAnswerReq, TemplateValidateReq };
