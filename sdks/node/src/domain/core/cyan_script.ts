import type { CyanExtensionInput, CyanPluginInput, CyanProcessorInput } from './cyan_script_model.js';
import type { IInquirer } from './inquirer.js';
import type { Cyan } from './cyan.js';
import type { IDeterminism } from './deterministic.js';
import { PluginOutput } from '../plugin/output.js';
import { CyanFileHelper } from './fs/cyan_fs_helper.js';
import type { ProcessorOutput } from '../processor/output.js';

interface ICyanTemplate {
  template(inquirer: IInquirer, determinism: IDeterminism): Promise<Cyan>;
}

interface ICyanExtension {
  extension(inquirer: IInquirer, determinism: IDeterminism, input: CyanExtensionInput): Promise<Cyan>;
}

interface ICyanProcessor {
  process(input: CyanProcessorInput, fileHelper: CyanFileHelper): Promise<ProcessorOutput>;
}

interface ICyanPlugin {
  plugin(input: CyanPluginInput): Promise<PluginOutput>;
}

export type { ICyanTemplate, ICyanExtension, ICyanProcessor, ICyanPlugin };
