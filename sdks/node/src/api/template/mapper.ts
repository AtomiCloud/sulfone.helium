import type { TemplateAnswerReq, TemplateValidateReq } from "./req.js";
import type {
  TemplateInput,
  TemplateValidateInput,
} from "../../domain/template/input.js";
import {
  AnswerMapper,
  CyanMapper,
  QuestionMapper,
} from "../core/core_mapper.js";
import {
  isFinal,
  isQnA,
  TemplateOutput,
} from "../../domain/template/output.js";
import { TemplateFinalRes, TemplateQnARes, TemplateRes } from "./res.js";

class TemplateInputMapper {
  public static answerToDomain(req: TemplateAnswerReq): TemplateInput {
    return {
      deterministicState: req.deterministicStates,
      answers: req.answers.map((x) => AnswerMapper.toDomain(x)),
    } satisfies TemplateInput;
  }

  public static validateToDomain(
    req: TemplateValidateReq,
  ): TemplateValidateInput {
    return {
      deterministicState: req.deterministicStates,
      answers: req.answers.map((x) => AnswerMapper.toDomain(x)),
      validate: req.validate,
    } satisfies TemplateValidateInput;
  }
}

class TemplateOutputMapper {
  public static ToResp(output: TemplateOutput): TemplateRes {
    if (isQnA(output)) {
      return {
        type: "questionnaire",
        deterministicState: output.deterministicState,
        question: QuestionMapper.questionToResp(output.question),
      } satisfies TemplateQnARes;
    } else if (isFinal(output)) {
      return {
        cyan: CyanMapper.cyanToResp(output.data),
        type: "final",
      } satisfies TemplateFinalRes;
    } else {
      throw new Error(`Invalid output type ${JSON.stringify(output)}`);
    }
  }
}

export { TemplateInputMapper, TemplateOutputMapper };
