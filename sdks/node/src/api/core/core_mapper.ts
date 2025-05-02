import type { CyanGlobReq, CyanPluginReq, CyanProcessorReq, CyanReq } from './cyan_req.js';
import type { Cyan, CyanGlob, CyanPlugin, CyanProcessor } from '../../domain/core/cyan.js';
import { GlobType } from '../../domain/core/cyan.js';
import type { CyanGlobRes, CyanPluginRes, CyanProcessorRes, CyanRes } from './cyan_res.js';
import type { CheckboxQ, ConfirmQ, DateQ, PasswordQ, Question, SelectQ, TextQ } from '../../domain/core/question.js';

import type {
  CheckboxQuestionRes,
  ConfirmQuestionRes,
  DateQuestionRes,
  PasswordQuestionRes,
  QuestionRes,
  SelectQuestionRes,
  TextQuestionRes,
} from './question_res.js';
import { type Answer, isBoolAnswer, isStringAnswer, isStringArrayAnswer } from '../../domain/core/answer.js';
import type { AnswerRes } from './answer_res.js';
import { type AnswerReq, isBoolAnswerReq, isStringAnswerReq } from './answer_req.js';
import { QuestionType } from '../../domain/core/question.js';

export class CyanMapper {
  static pluginReqToDomain(req: CyanPluginReq): CyanPlugin {
    return {
      name: req.name,
      config: req.config,
    };
  }

  static globReqToDomain(req: CyanGlobReq): CyanGlob {
    const type = (() => {
      switch (req.type) {
        case 'template':
          return GlobType.Template;
        case 'copy':
          return GlobType.Copy;
        default:
          throw new Error(`Invalid req.type: ${req.type}`);
      }
    })();
    return {
      root: req.root,
      glob: req.glob,
      exclude: req.exclude,
      type,
    };
  }

  static processorReqToDomain(req: CyanProcessorReq): CyanProcessor {
    return {
      name: req.name,
      config: req.config,
      files: req.files.map(x => CyanMapper.globReqToDomain(x)),
    };
  }

  static cyanReqToDomain(req: CyanReq): Cyan {
    return {
      processors: req.processors.map(x => CyanMapper.processorReqToDomain(x)),
      plugins: req.plugins.map(x => CyanMapper.pluginReqToDomain(x)),
    };
  }

  static cyanToResp(data: Cyan): CyanRes {
    return {
      processors: data.processors.map(x => CyanMapper.processorToResp(x)),
      plugins: data.plugins.map(x => CyanMapper.pluginToResp(x)),
    };
  }

  static processorToResp(data: CyanProcessor): CyanProcessorRes {
    return {
      name: data.name,
      config: data.config,
      files: data.files.map(x => CyanMapper.globToResp(x)),
    };
  }

  static pluginToResp(data: CyanPlugin): CyanPluginRes {
    return {
      name: data.name,
      config: data.config,
    };
  }

  static globTypeToResp(type: GlobType): string {
    switch (type) {
      case GlobType.Template:
        return 'template';
      case GlobType.Copy:
        return 'copy';
      default:
        throw new Error(`Invalid GlobType: ${type}`);
    }
  }

  static globToResp(data: CyanGlob): CyanGlobRes {
    return {
      root: data.root,
      glob: data.glob,
      exclude: data.exclude,
      type: CyanMapper.globTypeToResp(data.type),
    };
  }
}

export class QuestionMapper {
  static questionToResp(q: Question): QuestionRes {
    switch (q.type) {
      case QuestionType.Select:
        return QuestionMapper.selectToResp(q);
      case QuestionType.Text:
        return QuestionMapper.textToResp(q);
      case QuestionType.Password:
        return QuestionMapper.passwordToResp(q);
      case QuestionType.DateSelect:
        return QuestionMapper.dateToResp(q);
      case QuestionType.Confirm:
        return QuestionMapper.confirmToResp(q);
      case QuestionType.Checkbox:
        return QuestionMapper.checkboxToResp(q);
      default:
        throw new Error(`Invalid question type: ${q}`);
    }
  }

  static confirmToResp(q: ConfirmQ): ConfirmQuestionRes {
    return {
      default: q.default ?? null,
      message: q.message,
      id: q.id,
      errorMessage: q.errorMessage ?? null,
      desc: q.desc ?? null,
      type: 'confirm',
    };
  }

  static checkboxToResp(q: CheckboxQ): CheckboxQuestionRes {
    return {
      message: q.message,
      id: q.id,
      desc: q.desc ?? null,
      options: q.options,
      type: 'checkbox',
    };
  }

  static selectToResp(q: SelectQ): SelectQuestionRes {
    return {
      message: q.message,
      id: q.id,
      desc: q.desc ?? null,
      options: q.options,
      type: 'select',
    };
  }

  static textToResp(q: TextQ): TextQuestionRes {
    return {
      message: q.message,
      id: q.id,
      desc: q.desc ?? null,
      default: q.default ?? null,
      initial: q.initial ?? null,
      type: 'text',
    };
  }

  static passwordToResp(q: PasswordQ): PasswordQuestionRes {
    return {
      message: q.message,
      id: q.id,
      desc: q.desc ?? null,
      confirmation: q.confirmation ?? null,
      type: 'password',
    };
  }

  static dateToResp(q: DateQ): DateQuestionRes {
    return {
      message: q.message,
      id: q.id,
      desc: q.desc ?? null,
      default: q.default ? q.default.toISOString().split('T')[0] : null,
      maxDate: q.maxDate ? q.maxDate.toISOString().split('T')[0] : null,
      minDate: q.minDate ? q.minDate.toISOString().split('T')[0] : null,
      type: 'date',
    };
  }
}

export class AnswerMapper {
  static toDomain(req: AnswerReq): Answer {
    if (isBoolAnswerReq(req)) {
      return { answer: req.answer };
    }
    if (isStringAnswerReq(req)) {
      return { answer: req.answer };
    }
    if (isStringArrayAnswer(req)) {
      return { answer: req.answer };
    }
    throw new Error(`Invalid answer request type: ${req}`);
  }

  static toResp(answer: Answer): AnswerRes {
    if (isBoolAnswer(answer)) {
      return { answer: answer.answer };
    }
    if (isStringAnswer(answer)) {
      return { answer: answer.answer };
    }
    if (isStringArrayAnswer(answer)) {
      return { answer: answer.answer };
    }
    throw new Error(`Invalid answer type: ${answer}`);
  }
}
