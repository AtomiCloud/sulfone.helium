using sulfone_helium;
using sulfone_helium.Domain.Plugin;

CyanEngine.StartPlugin(
    args,
    Task<PluginOutput> (i) =>
    {
        var (dir, config) = i;

        Console.WriteLine("Directory: {0}", dir);
        Console.WriteLine("Config: {0}", config);

        return Task.FromResult(new PluginOutput(dir));
    }
);
