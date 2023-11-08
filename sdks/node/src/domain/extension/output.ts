import type { Question } from "../core/question.js";
import type { Cyan } from "../core/cyan.js";

// TypeScript equivalent of the C# record ExtensionQnAOutput
interface ExtensionQnAOutput {
  deterministicState: Record<string, string>[];
  question: Question;
}

// TypeScript equivalent of the C# record ExtensionFinalOutput
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
// export all
export type { ExtensionOutput, ExtensionFinalOutput, ExtensionQnAOutput };
