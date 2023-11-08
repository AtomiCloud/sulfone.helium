import type { ExtensionAnswerReq, ExtensionValidateReq } from "./req.js";
import type {
  ExtensionAnswerInput,
  ExtensionValidateInput,
} from "../../domain/extension/input.js";
import {
  AnswerMapper,
  CyanMapper,
  QuestionMapper,
} from "../core/core_mapper.js";
import type { Answer } from "../../domain/core/answer.js";
import type { Cyan } from "../../domain/core/cyan.js";
import type { ExtensionOutput } from "../../domain/extension/output.js";
import { isFinal } from "../../domain/extension/output.js";
import type { ExtensionRes } from "./res.js";
import { ExtensionFinalRes, ExtensionQnARes } from "./res.js";

class ExtensionMapper {
  public static extensionAnswerToDomain(
    req: ExtensionAnswerReq,
  ): ExtensionAnswerInput {
    const answers: Answer[] = req.answers.map((x) => AnswerMapper.toDomain(x));
    const prevAnswers: Answer[] = req.prevAnswers.map((x) =>
      AnswerMapper.toDomain(x),
    );
    const prevCyan: Cyan = CyanMapper.cyanReqToDomain(req.prevCyan);
    const prevExtensionAnswers: Record<string, Answer[]> = Object.fromEntries(
      Object.entries(req.prevExtensionAnswers).map(([key, value]) => [
        key,
        value.map((a) => AnswerMapper.toDomain(a) as Answer) as Answer[],
      ]) satisfies [string, Answer[]][],
    );
    const prevExtensionCyans: Record<string, Cyan> = Object.fromEntries(
      Object.entries(req.prevExtensionCyans).map(([key, value]) => [
        key,
        CyanMapper.cyanReqToDomain(value),
      ]) satisfies [string, Cyan][],
    );

    return {
      answers,
      prevAnswers,
      deterministicState: req.deterministicStates,
      prevCyan,
      prevExtensionAnswers,
      prevExtensionCyans,
    } satisfies ExtensionAnswerInput;
  }

  public static extensionValidateToDomain(
    req: ExtensionValidateReq,
  ): ExtensionValidateInput {
    return {
      answers: req.answers.map((x) => AnswerMapper.toDomain(x)),
      deterministicState: req.deterministicStates,
      prevAnswers: req.prevAnswers.map((x) => AnswerMapper.toDomain(x)),
      prevCyan: CyanMapper.cyanReqToDomain(req.prevCyan),
      prevExtensionAnswers: Object.fromEntries(
        Object.entries(req.prevExtensionAnswers).map(([key, value]) => [
          key,
          value.map((a) => AnswerMapper.toDomain(a) as Answer) as Answer[],
        ]) satisfies [string, Answer[]][],
      ),
      prevExtensionCyans: Object.fromEntries(
        Object.entries(req.prevExtensionCyans).map(([key, value]) => [
          key,
          CyanMapper.cyanReqToDomain(value),
        ]) satisfies [string, Cyan][],
      ),
      validate: req.validate,
    } satisfies ExtensionValidateInput;
  }
}

class ExtensionOutputMapper {
  public static toResp(output: ExtensionOutput): ExtensionRes {
    if (isFinal(output)) {
      return {
        cyan: CyanMapper.cyanToResp(output.data),
        type: "final",
      } satisfies ExtensionFinalRes;
    } else {
      return {
        deterministicState: output.deterministicState,
        question: QuestionMapper.questionToResp(output.question),
        type: "questionnaire",
      } satisfies ExtensionQnARes;
    }
  }
}

export { ExtensionMapper, ExtensionOutputMapper };
