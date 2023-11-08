import type {
  CyanExtensionInput,
  CyanPluginInput,
  CyanProcessorInput,
} from "./cyan_script_model.js";
import type { IInquirer } from "./inquirer.js";
import type { Cyan } from "./cyan.js";
import type { IDeterminism } from "./deterministic.js";
import { PluginOutput } from "../plugin/output.js";
import { CyanFileHelper } from "./fs/cyan_fs_helper.js";
import type { ProcessorOutput } from "../processor/output.js";

interface ICyanTemplate {
  template(inquirer: IInquirer, determinism: IDeterminism): Promise<Cyan>;
}

// TypeScript equivalent of the C# interface ICyanExtension
interface ICyanExtension {
  extension(
    inquirer: IInquirer,
    determinism: IDeterminism,
    input: CyanExtensionInput,
  ): Promise<Cyan>;
}

// TypeScript equivalent of the C# interface ICyanProcessor
interface ICyanProcessor {
  process(
    input: CyanProcessorInput,
    fileHelper: CyanFileHelper,
  ): Promise<ProcessorOutput>;
}

// TypeScript equivalent of the C# interface ICyanPlugin
interface ICyanPlugin {
  plugin(input: CyanPluginInput): Promise<PluginOutput>;
}

// export all
export type { ICyanTemplate, ICyanExtension, ICyanProcessor, ICyanPlugin };
