import type { ICyanTemplate } from '../core/cyan_script.js';
import type { TemplateInput, TemplateValidateInput } from './input.js';
import type { TemplateFinalOutput, TemplateOutput, TemplateQnAOutput } from './output.js';
import { StatelessInquirer } from '../service/stateless_inquirer.js';
import { StatelessDeterminism } from '../service/stateless_determinism.js';
import { OutOfAnswerException } from '../service/out_of_answer_error.js';
import type { Question } from '../core/question.js';

class TemplateService {
  private readonly _template: ICyanTemplate;

  constructor(template: ICyanTemplate) {
    this._template = template;
  }

  async template(answer: TemplateInput): Promise<TemplateOutput> {
    let pointer: number = -1;
    const i = new StatelessInquirer(answer.answers, pointer);
    const d = new StatelessDeterminism(answer.deterministicState, pointer);

    try {
      const r = await this._template.template(i, d);
      return {
        data: r,
      } satisfies TemplateFinalOutput;
    } catch (e) {
      if (e instanceof OutOfAnswerException) {
        const q: Question = e.question;
        return {
          deterministicState: d.states,
          question: q,
        } satisfies TemplateQnAOutput;
      }
      throw e;
    }
  }

  async validate(answer: TemplateValidateInput): Promise<string | null> {
    let pointer: number = -1;
    const i = new StatelessInquirer(answer.answers, pointer);
    const d = new StatelessDeterminism(answer.deterministicState, pointer);

    try {
      await this._template.template(i, d);
      throw new Error('Not supposed to reach here for validation!');
    } catch (e) {
      if (e instanceof OutOfAnswerException) {
        const q: Question = e.question;
        const validateResult = q.validate?.(answer.validate);
        return validateResult || null;
      }
      throw e;
    }
  }
}

export { TemplateService };
