import type { PluginRes } from "./res.js";
import type { PluginOutput } from "../../domain/plugin/output.js";
import type { PluginReq } from "./req.js";
import type { PluginInput } from "../../domain/plugin/input.js";

class PluginMapper {
  public static ToDomain(req: PluginReq): PluginInput {
    return {
      directory: req.directory,
      config: req.config,
    } satisfies PluginInput;
  }

  public static ToRes(res: PluginOutput): PluginRes {
    return {
      outputDir: res.directory,
    };
  }
}

export { PluginMapper };
