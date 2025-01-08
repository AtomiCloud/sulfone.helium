import type { Question } from '../core/question.js';

class OutOfAnswerException extends Error {
  constructor(
    message: string,
    readonly question: Question,
  ) {
    super(message);
  }
}

export { OutOfAnswerException };
