import type { Question } from "../core/question.js";
import type { Cyan } from "../core/cyan.js";

interface ExtensionQnAOutput {
  deterministicState: Record<string, string>[];
  question: Question;
}

interface ExtensionFinalOutput {
  data: Cyan;
}

function isFinal(output: ExtensionOutput): output is ExtensionFinalOutput {
  return (output as ExtensionFinalOutput).data != null;
}

function isQnA(output: ExtensionOutput): output is ExtensionQnAOutput {
  return (output as ExtensionQnAOutput).question != null;
}

type ExtensionOutput = ExtensionQnAOutput | ExtensionFinalOutput;

export { isFinal, isQnA };
export type { ExtensionOutput, ExtensionFinalOutput, ExtensionQnAOutput };
