interface StringArrayAnswerReq {
  readonly answer: string[];
}

interface StringAnswerReq {
  readonly answer: string;
}

interface BoolAnswerReq {
  readonly answer: boolean;
}

type AnswerReq = StringArrayAnswerReq | StringAnswerReq | BoolAnswerReq;

function isStringAnswerReq(a: AnswerReq): a is StringAnswerReq {
  return typeof a.answer === "string";
}

function isStringArrayAnswerReq(a: AnswerReq): a is StringArrayAnswerReq {
  return Array.isArray(a.answer);
}

function isBoolAnswerReq(a: AnswerReq): a is BoolAnswerReq {
  return typeof a.answer === "boolean";
}

export { isStringAnswerReq, isStringArrayAnswerReq, isBoolAnswerReq };

export type { AnswerReq, StringAnswerReq, StringArrayAnswerReq, BoolAnswerReq };
