import type { CyanPluginInput, CyanProcessorInput } from './cyan_script_model.js';
import type { IInquirer } from './inquirer.js';
import type { Cyan } from './cyan.js';
import type { IDeterminism } from './deterministic.js';
import type { PluginOutput } from '../plugin/output.js';
import type { CyanFileHelper } from './fs/cyan_fs_helper.js';
import type { ProcessorOutput } from '../processor/output.js';
import type { ResolverInput } from '../resolver/input.js';
import type { ResolverOutput } from '../resolver/output.js';

interface ICyanTemplate {
  template(inquirer: IInquirer, determinism: IDeterminism): Promise<Cyan>;
}

interface ICyanProcessor {
  process(input: CyanProcessorInput, fileHelper: CyanFileHelper): Promise<ProcessorOutput>;
}

interface ICyanPlugin {
  plugin(input: CyanPluginInput): Promise<PluginOutput>;
}

interface ICyanResolver {
  resolve(input: ResolverInput): Promise<ResolverOutput>;
}

export type { ICyanTemplate, ICyanProcessor, ICyanPlugin, ICyanResolver };
