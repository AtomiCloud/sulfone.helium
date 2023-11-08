interface PluginReq {
  directory: string;
  config: Record<string, any>; // Using a generic object type for ExpandoObject
}

export type { PluginReq };
