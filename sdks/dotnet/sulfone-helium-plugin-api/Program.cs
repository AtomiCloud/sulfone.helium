using sulfone_helium;
using sulfone_helium.Domain.Plugin;

CyanEngine.StartPlugin(
    args,
    (i) =>
    {
        var (dir, config) = i;

        Console.WriteLine("Directory: {0}", dir);

        return Task.FromResult(new PluginOutput(dir));
    }
);
