using System.Dynamic;

namespace sulfone_helium.Api.Plugin;

public struct PluginReq
{
    public string Directory { get; set; }

    public ExpandoObject Config { get; set; }
}
