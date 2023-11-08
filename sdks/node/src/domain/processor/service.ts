import type { ICyanProcessor } from "../core/cyan_script.js";
import type { ProcessorInput } from "./input.js";
import type { ProcessorOutput } from "./output.js";
import { CyanFileHelper } from "../core/fs/cyan_fs_helper.js";

class ProcessorService {
  private _processor: ICyanProcessor;

  constructor(processor: ICyanProcessor) {
    this._processor = processor;
  }

  async process(input: ProcessorInput): Promise<ProcessorOutput> {
    const { readDirectory, writeDirectory, globs, config } = input;
    const helper = new CyanFileHelper(readDirectory, writeDirectory, globs);
    return await this._processor.process(
      {
        readDir: readDirectory,
        writeDir: writeDirectory,
        globs,
        config: config,
      },
      helper,
    );
  }
}

export { ProcessorService };
