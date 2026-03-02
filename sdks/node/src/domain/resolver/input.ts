interface FileOrigin {
  readonly template: string;
  readonly layer: number;
}

interface ResolvedFile {
  readonly path: string;
  readonly content: string;
  readonly origin: FileOrigin;
}

interface ResolverInput {
  readonly config: Record<string, unknown>;
  readonly files: ResolvedFile[];
}

export type { FileOrigin, ResolvedFile, ResolverInput };
