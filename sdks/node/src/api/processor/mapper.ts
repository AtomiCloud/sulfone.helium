import type { ProcessorRes } from "./res.js";
import type { ProcessorOutput } from "../../domain/processor/output.js";
import type { ProcessorReq } from "./req.js";
import type { ProcessorInput } from "../../domain/processor/input.js";
import { CyanMapper } from "../core/core_mapper.js";

class ProcessorMapper {
  public static toDomain(req: ProcessorReq): ProcessorInput {
    return {
      readDirectory: req.readDir,
      writeDirectory: req.writeDir,
      config: req.config,
      globs: req.globs.map((x) => CyanMapper.globReqToDomain(x)),
    } satisfies ProcessorInput;
  }

  public static toRes(res: ProcessorOutput): ProcessorRes {
    return {
      outputDir: res.directory,
    };
  }
}

export { ProcessorMapper };
