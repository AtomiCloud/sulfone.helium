import type { ExtensionAnswerInput, ExtensionValidateInput } from "./input.js";
import type { ICyanExtension } from "../core/cyan_script.js";
import type { CyanExtensionInput } from "../core/cyan_script_model.js";
import type {
  ExtensionFinalOutput,
  ExtensionOutput,
  ExtensionQnAOutput,
} from "./output.js";
import type { Question } from "../core/question.js";
import { StatelessDeterminism } from "../service/stateless_determinism.js";
import { StatelessInquirer } from "../service/stateless_inquirer.js";
import { OutOfAnswerException } from "../service/out_of_answer_error.js";

class ExtensionService {
  private ext!: ICyanExtension;

  constructor(ext: ICyanExtension) {
    this.ext = ext;
  }

  async extend(answer: ExtensionAnswerInput): Promise<ExtensionOutput> {
    let pointer: number = -1;
    const i = new StatelessInquirer(answer.answers, pointer);
    const d = new StatelessDeterminism(answer.deterministicState, pointer);

    try {
      const input: CyanExtensionInput = {
        prevAnswers: answer.prevAnswers,
        prevCyan: answer.prevCyan,
        prevExtensionAnswers: answer.prevExtensionAnswers,
        prevExtensionCyans: answer.prevExtensionCyans,
      };
      const r = await this.ext.extension(i, d, input);
      return {
        data: r,
      } satisfies ExtensionFinalOutput;
    } catch (e) {
      if (e instanceof OutOfAnswerException) {
        return {
          deterministicState: d.states,
          question: e.question,
        } satisfies ExtensionQnAOutput;
      } else {
        throw e;
      }
    }
  }

  async validate(answer: ExtensionValidateInput): Promise<string | null> {
    let pointer: number = -1;
    const i = new StatelessInquirer(answer.answers, pointer);
    const d = new StatelessDeterminism(answer.deterministicState, pointer);

    try {
      const input: CyanExtensionInput = {
        prevAnswers: answer.prevAnswers,
        prevCyan: answer.prevCyan,
        prevExtensionAnswers: answer.prevExtensionAnswers,
        prevExtensionCyans: answer.prevExtensionCyans,
      };
      await this.ext.extension(i, d, input);
      throw new Error("Not supposed to reach here for validation!");
    } catch (e) {
      if (e instanceof OutOfAnswerException) {
        const q: Question = e.question;
        if (q.validate == null) return null;
        return q.validate(answer.validate) as string | null;
      } else {
        throw e;
      }
    }
  }
}

export { ExtensionService };
