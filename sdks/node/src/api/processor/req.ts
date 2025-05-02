import type { CyanGlobReq } from '../core/cyan_req.js';

interface ProcessorReq {
  readDir: string;
  writeDir: string;
  globs: CyanGlobReq[];
  config: unknown;
}

export type { ProcessorReq };
