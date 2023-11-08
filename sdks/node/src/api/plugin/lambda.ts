import type { ICyanPlugin } from "../../domain/core/cyan_script.js";
import type { PluginOutput } from "../../domain/plugin/output.js";
import type { CyanPluginInput } from "../../domain/core/cyan_script_model.js";

type LambdaPluginFn = (input: CyanPluginInput) => Promise<PluginOutput>;

class LambdaPlugin implements ICyanPlugin {
  private readonly _f: LambdaPluginFn;

  constructor(f: LambdaPluginFn) {
    this._f = f;
  }

  async plugin(input: CyanPluginInput): Promise<PluginOutput> {
    return await this._f(input);
  }
}

export type { LambdaPluginFn };
export { LambdaPlugin };
