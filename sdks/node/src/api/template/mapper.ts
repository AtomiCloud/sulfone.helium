import type { TemplateAnswerReq, TemplateValidateReq } from './req.js';
import type { TemplateInput, TemplateValidateInput } from '../../domain/template/input.js';
import { AnswerMapper, CyanMapper, QuestionMapper } from '../core/core_mapper.js';
import { isFinal, isQnA, type TemplateOutput } from '../../domain/template/output.js';
import type { TemplateFinalRes, TemplateQnARes, TemplateRes } from './res.js';
import type { Answer } from '../../domain/core/answer.js';

class TemplateInputMapper {
  public static answerToDomain(req: TemplateAnswerReq): TemplateInput {
    const answers: Record<string, Answer> = {};

    // Convert each answer from API format to domain format
    for (const [id, answer] of Object.entries(req.answers)) {
      answers[id] = AnswerMapper.toDomain(answer);
    }

    return {
      deterministicState: req.deterministicStates,
      answers,
    } satisfies TemplateInput;
  }

  public static validateToDomain(req: TemplateValidateReq): TemplateValidateInput {
    const answers: Record<string, Answer> = {};

    // Convert each answer from API format to domain format
    for (const [id, answer] of Object.entries(req.answers)) {
      answers[id] = AnswerMapper.toDomain(answer);
    }

    return {
      deterministicState: req.deterministicStates,
      answers,
      validate: req.validate,
    } satisfies TemplateValidateInput;
  }
}

class TemplateOutputMapper {
  public static ToResp(output: TemplateOutput): TemplateRes {
    if (isQnA(output)) {
      return {
        type: 'questionnaire',
        deterministicState: output.deterministicState,
        question: QuestionMapper.questionToResp(output.question),
      } satisfies TemplateQnARes;
    }
    if (isFinal(output)) {
      return {
        cyan: CyanMapper.cyanToResp(output.data),
        type: 'final',
      } satisfies TemplateFinalRes;
    }
    throw new Error(`Invalid output type ${JSON.stringify(output)}`);
  }
}

export { TemplateInputMapper, TemplateOutputMapper };
