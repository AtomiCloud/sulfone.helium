import type { IInquirer } from '../core/inquirer.js';
import type { Answer } from '../core/answer.js';
import { isBoolAnswer, isStringAnswer, isStringArrayAnswer } from '../core/answer.js';
import { OutOfAnswerException } from './out_of_answer_error.js';
import type { CheckboxQ, ConfirmQ, DateQ, PasswordQ, Question, SelectQ, TextQ } from '../core/question.js';
import { QuestionType } from '../core/question.js';

class StatelessInquirer implements IInquirer {
  readonly #answers: Record<string, Answer>;

  constructor(answers: Record<string, Answer>) {
    this.#answers = answers;
  }

  private getAnswer(q: Question): Answer {
    if (!this.#answers[q.id]) {
      throw new OutOfAnswerException('', q);
    }

    return this.#answers[q.id];
  }

  checkbox(q: string, options: string[], id: string, help?: string | null): Promise<string[]>;
  checkbox(q: CheckboxQ): Promise<string[]>;
  async checkbox(q: CheckboxQ | string, options?: string[], id?: string, help?: string | null): Promise<string[]> {
    if (typeof q === 'string') {
      if (options == null) {
        throw new Error('options cannot be null');
      }
      if (id == null) {
        throw new Error('id cannot be null');
      }
      return this.checkbox({
        message: q,
        options,
        desc: help,
        type: QuestionType.Checkbox,
        id,
      });
    }
    const answer = this.getAnswer(q);
    if (isStringArrayAnswer(answer)) return Promise.resolve(answer.answer);

    throw new Error('Incorrect answer type. Expected: StringArrayAnswer. Got: ' + typeof answer);
  }

  confirm(q: ConfirmQ): Promise<boolean>;
  confirm(q: string, id: string, help?: string | null): Promise<boolean>;

  async confirm(q: ConfirmQ | string, id?: string, help?: string | null): Promise<boolean> {
    if (typeof q === 'string') {
      if (id == null) {
        throw new Error('id cannot be null');
      }
      return this.confirm({
        message: q,
        desc: help,
        type: QuestionType.Confirm,
        id,
      });
    }
    const answer = this.getAnswer(q);

    if (isBoolAnswer(answer)) return Promise.resolve(answer.answer);
    throw new Error('Incorrect answer type. Expected: BoolAnswer. Got: ' + typeof answer);
  }

  password(q: string, id: string, help?: string | null): Promise<string>;
  password(q: PasswordQ): Promise<string>;
  async password(q: PasswordQ | string, id?: string, help?: string | null): Promise<string> {
    if (typeof q === 'string') {
      if (id == null) {
        throw new Error('id cannot be null');
      }
      return this.password({
        type: QuestionType.Password,
        message: q,
        desc: help,
        id,
      });
    }
    const answer = this.getAnswer(q);

    if (isStringAnswer(answer)) return Promise.resolve(answer.answer);
    throw new Error('Incorrect answer type. Expected: StringAnswer. Got: ' + typeof answer);
  }

  select(q: SelectQ): Promise<string>;
  select(q: string, options: string[], id: string, help?: string | null): Promise<string>;
  async select(q: SelectQ | string, options?: string[], id?: string, help?: string | null): Promise<string> {
    if (typeof q === 'string') {
      if (options == null) {
        throw new Error('options cannot be null');
      }
      if (id == null) {
        throw new Error('id cannot be null');
      }
      return this.select({
        type: QuestionType.Select,
        options,
        message: q,
        desc: help,
        id,
      });
    }
    const answer = this.getAnswer(q);

    if (isStringAnswer(answer)) return Promise.resolve(answer.answer);
    throw new Error('Incorrect answer type. Expected: StringAnswer. Got: ' + typeof answer);
  }

  text(q: TextQ): Promise<string>;
  text(q: string, id: string, help?: string | null): Promise<string>;
  async text(q: TextQ | string, id?: string, help?: string | null): Promise<string> {
    if (typeof q === 'string') {
      if (id == null) {
        throw new Error('id cannot be null');
      }
      return this.text({
        type: QuestionType.Text,
        message: q,
        desc: help,
        id,
      });
    }
    const answer = this.getAnswer(q);

    if (isStringAnswer(answer)) return Promise.resolve(answer.answer);
    throw new Error('Incorrect answer type. Expected: StringAnswer. Got: ' + typeof answer);
  }

  dateSelect(q: DateQ): Promise<string>;
  dateSelect(q: string, id: string, help?: string | null): Promise<string>;

  async dateSelect(q: DateQ | string, id?: string, help?: string | null): Promise<string> {
    if (typeof q === 'string') {
      if (id == null) {
        throw new Error('id cannot be null');
      }
      return this.dateSelect({
        type: QuestionType.DateSelect,
        message: q,
        desc: help,
        id,
      });
    }
    const answer = this.getAnswer(q);
    if (isStringAnswer(answer)) return Promise.resolve(answer.answer);
    throw new Error('Incorrect answer type. Expected: StringAnswer. Got: ' + typeof answer);
  }
}

export { StatelessInquirer };
