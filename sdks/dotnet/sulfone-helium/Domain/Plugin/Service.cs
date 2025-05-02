using sulfone_helium.Domain.Core;

namespace sulfone_helium.Domain.Plugin;

public class PluginService
{
    public required ICyanPlugin Plugin { private get; init; }

    public async Task<PluginOutput> Plug(PluginInput input)
    {
        var (dir, config) = input;
        return await Plugin.Plugin(new CyanPluginInput { Directory = dir, Config = config });
    }
}
