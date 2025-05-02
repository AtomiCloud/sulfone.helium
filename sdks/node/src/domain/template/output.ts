import type { Question } from '../core/question.js';
import type { Cyan } from '../core/cyan.js';

interface TemplateQnAOutput {
  readonly deterministicState: Record<string, string>;
  readonly question: Question;
}

interface TemplateFinalOutput {
  readonly data: Cyan; // Assuming Cyan is the appropriate TypeScript type or interface
}

function isFinal(output: TemplateOutput): output is TemplateFinalOutput {
  return (output as TemplateFinalOutput).data != null;
}

function isQnA(output: TemplateOutput): output is TemplateQnAOutput {
  return (output as TemplateQnAOutput).question != null;
}

type TemplateOutput = TemplateQnAOutput | TemplateFinalOutput;

export { isFinal, isQnA };

export type { TemplateOutput, TemplateFinalOutput, TemplateQnAOutput };
