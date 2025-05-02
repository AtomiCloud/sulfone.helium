interface PluginReq {
  directory: string;
  config: Record<string, unknown>; // Using a generic object type for ExpandoObject
}

export type { PluginReq };
