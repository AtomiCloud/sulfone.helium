using sulfone_helium.Domain.Core;
using sulfone_helium.Domain.Plugin;

namespace sulfone_helium.Api.Plugin;

public class LambdaPlugin(Func<CyanPluginInput, Task<PluginOutput>> f) : ICyanPlugin
{
    public async Task<PluginOutput> Plugin(CyanPluginInput input)
    {
        return await f(input);
    }
}
