interface FileOriginReq {
  template: string;
  layer: number;
}

interface ResolvedFileReq {
  path: string;
  content: string;
  origin: FileOriginReq;
}

interface ResolverReq {
  config: Record<string, unknown>;
  files: ResolvedFileReq[];
}

export type { FileOriginReq, ResolvedFileReq, ResolverReq };
