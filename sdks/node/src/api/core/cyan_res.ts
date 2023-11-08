interface CyanGlobRes {
  glob: string;
  exclude: string[];
  type: string;
}

interface CyanPluginRes {
  name: string;
  config: unknown;
}

interface CyanProcessorRes {
  name: string;
  config: unknown;
  files: CyanGlobRes[];
}

interface CyanRes {
  processors: CyanProcessorRes[];
  plugins: CyanPluginRes[];
}

// export all
export type { CyanRes, CyanProcessorRes, CyanPluginRes, CyanGlobRes };
