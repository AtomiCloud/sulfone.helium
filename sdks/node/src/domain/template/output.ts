import { Question } from "../core/question.js";
import { Cyan } from "../core/cyan.js";

interface TemplateQnAOutput {
  readonly deterministicState: Record<string, string>[];
  readonly question: Question;
}

interface TemplateFinalOutput {
  readonly data: Cyan; // Assuming Cyan is the appropriate TypeScript type or interface
}

function isFinal(output: TemplateOutput): output is TemplateFinalOutput {
  return (output as TemplateFinalOutput).data != undefined;
}

function isQnA(output: TemplateOutput): output is TemplateQnAOutput {
  return (output as TemplateQnAOutput).question != undefined;
}

type TemplateOutput = TemplateQnAOutput | TemplateFinalOutput;

export { isFinal, isQnA };

export type { TemplateOutput, TemplateFinalOutput, TemplateQnAOutput };
