using sulfone_helium_domain.Core;

namespace sulfone_helium_domain.Plugin;

public class PluginService
{
    public required ICyanPlugin Plugin { private get; init; }

    public async Task<PluginOutput> Plug(PluginInput input)
    {
        var (dir, config) = input;
        return await Plugin.Plugin(new Core.CyanPluginInput
        {
            Directory = dir,
            Config = config,
        });
    }
}