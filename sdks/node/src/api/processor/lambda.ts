import type { CyanProcessorInput } from "../../domain/core/cyan_script_model.js";
import type { CyanFileHelper } from "../../domain/core/fs/cyan_fs_helper.js";
import type { ProcessorOutput } from "../../domain/processor/output.js";
import type { ICyanProcessor } from "../../domain/core/cyan_script.js";

type LambdaProcessorFn = (
  i: CyanProcessorInput,
  fileHelper: CyanFileHelper,
) => Promise<ProcessorOutput>;

class LambdaProcessor implements ICyanProcessor {
  private readonly _f: LambdaProcessorFn;

  constructor(f: LambdaProcessorFn) {
    this._f = f;
  }

  process(
    i: CyanProcessorInput,
    fileHelper: CyanFileHelper,
  ): Promise<ProcessorOutput> {
    return this._f(i, fileHelper);
  }
}

export type { LambdaProcessorFn };
export { LambdaProcessor };
