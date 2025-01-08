import type { CyanGlob } from '../core/cyan.js';

interface ProcessorInput {
  readonly readDirectory: string;
  readonly writeDirectory: string;
  readonly globs: CyanGlob[];
  readonly config: unknown;
}

export type { ProcessorInput };
