interface StringArrayAnswer {
  answer: string[];
}

interface StringAnswer {
  answer: string;
}

interface BoolAnswer {
  answer: boolean;
}

type Answer = StringAnswer | StringArrayAnswer | BoolAnswer;

function isStringAnswer(a: Answer): a is StringAnswer {
  return typeof a.answer === 'string';
}

function isStringArrayAnswer(a: Answer): a is StringArrayAnswer {
  return Array.isArray(a.answer);
}

function isBoolAnswer(a: Answer): a is BoolAnswer {
  return typeof a.answer === 'boolean';
}

export { isStringAnswer, isStringArrayAnswer, isBoolAnswer };

export type { Answer, StringAnswer, StringArrayAnswer, BoolAnswer };
