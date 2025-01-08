import type { Answer } from './answer.js';
import type { Cyan, CyanGlob } from './cyan.js';

interface CyanExtensionInput {
  prevAnswers: Answer[];
  prevCyan: Cyan;
  prevExtensionAnswers: Record<string, Answer[]>;
  prevExtensionCyans: Record<string, Cyan>;
}

interface CyanProcessorInput {
  readDir: string;
  writeDir: string;
  globs: CyanGlob[];
  config: unknown;
}

interface CyanPluginInput {
  directory: string;
  config: unknown;
}

// export all
export type { CyanExtensionInput, CyanProcessorInput, CyanPluginInput };
