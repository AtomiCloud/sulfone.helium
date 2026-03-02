import type { ResolverRes } from './res.js';
import type { ResolverOutput } from '../../domain/resolver/output.js';
import type { ResolverReq, ResolvedFileReq } from './req.js';
import type { ResolverInput, ResolvedFile, FileOrigin } from '../../domain/resolver/input.js';

class ResolverMapper {
  private static toFileOrigin(req: ResolvedFileReq['origin']): FileOrigin {
    return {
      template: req.template,
      layer: req.layer,
    } satisfies FileOrigin;
  }

  private static toResolvedFile(req: ResolvedFileReq): ResolvedFile {
    return {
      path: req.path,
      content: req.content,
      origin: ResolverMapper.toFileOrigin(req.origin),
    } satisfies ResolvedFile;
  }

  public static toDomain(req: ResolverReq): ResolverInput {
    return {
      config: req.config,
      files: req.files.map(x => ResolverMapper.toResolvedFile(x)),
    } satisfies ResolverInput;
  }

  public static toRes(res: ResolverOutput): ResolverRes {
    return {
      path: res.path,
      content: res.content,
    };
  }
}

export { ResolverMapper };
