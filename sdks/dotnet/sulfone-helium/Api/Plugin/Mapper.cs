using sulfone_helium_domain.Core;
using sulfone_helium_domain.Plugin;

namespace sulfone_helium.Api.Plugin;

public static class PluginMapper
{
    public static PluginInput ToDomain(this PluginReq req)
    {
        return new PluginInput(req.Directory, req.Config.ToDynamic());
    }

    public static PluginRes ToRes(this PluginOutput res)
    {
        return new PluginRes
        {
            OutputDir = res.Directory,
        };
    }
}