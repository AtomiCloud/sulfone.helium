using sulfone_helium.Domain.Core;
using sulfone_helium.Domain.Plugin;

namespace sulfone_helium.Api.Plugin;

public class LambdaPlugin : ICyanPlugin
{
    private readonly Func<CyanPluginInput, Task<PluginOutput>> _f;

    public LambdaPlugin(Func<CyanPluginInput, Task<PluginOutput>> f)
    {
        _f = f;
    }

    public async Task<PluginOutput> Plugin(CyanPluginInput input)
    {
        return await this._f(input);
    }
}
