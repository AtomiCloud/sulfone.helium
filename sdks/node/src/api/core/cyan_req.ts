interface CyanGlobReq {
  readonly root?: string;
  readonly glob: string;
  readonly exclude: string[];
  readonly type: string;
}

interface CyanPluginReq {
  readonly name: string;
  readonly config: unknown;
}

interface CyanProcessorReq {
  readonly name: string;
  readonly config: unknown; // This is similar to ExpandoObject
  readonly files: CyanGlobReq[];
}

interface CyanReq {
  readonly processors: CyanProcessorReq[];
  readonly plugins: CyanPluginReq[];
}

// export all
export type { CyanReq, CyanProcessorReq, CyanPluginReq, CyanGlobReq };
