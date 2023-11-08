interface StringArrayAnswerRes {
  readonly answer: string[];
}

interface StringAnswerRes {
  readonly answer: string;
}

interface BoolAnswerRes {
  readonly answer: boolean;
}

type AnswerRes = StringArrayAnswerRes | StringAnswerRes | BoolAnswerRes;

// export all
export type { AnswerRes, StringAnswerRes, StringArrayAnswerRes, BoolAnswerRes };
