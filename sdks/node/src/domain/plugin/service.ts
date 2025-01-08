import type { ICyanPlugin } from '../core/cyan_script.js';
import type { PluginInput } from './input.js';
import type { PluginOutput } from './output.js';

class PluginService {
  readonly #plugin: ICyanPlugin;

  constructor(plugin: ICyanPlugin) {
    this.#plugin = plugin;
  }

  async plug(input: PluginInput): Promise<PluginOutput> {
    const { directory, config } = input;
    return await this.#plugin.plugin({
      directory,
      config,
    });
  }
}

export { PluginService };
