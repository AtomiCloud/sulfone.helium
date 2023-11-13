enum GlobType {
  Template,
  Copy,
}

interface CyanGlob {
  root?: string;
  glob: string;
  exclude: string[];
  type: GlobType;
}

interface CyanPlugin {
  name: string;
  config: unknown;
}

interface CyanProcessor {
  name: string;
  files: CyanGlob[];
  config: unknown;
}

interface Cyan {
  processors: CyanProcessor[];
  plugins: CyanPlugin[];
}

// export all
export { GlobType };
export type { Cyan, CyanProcessor, CyanPlugin, CyanGlob };
