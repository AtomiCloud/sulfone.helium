using HandlebarsDotNet;
using sulfone_helium;
using sulfone_helium_domain.Processor;


CyanEngine.StartProcessor(args, Task<ProcessorOutput> (i, fileHelper) =>
{
    var (readDir, writeDir, globs, config) = i;
    var handleBarsConfig = config.ToObject<HandleBarsConfig>();

    var files = fileHelper.ResolveAll();

    var parsed = files.Select(x => x with
    {
        Content = Handlebars.Compile(x.Content)(handleBarsConfig?.Vars ?? new Dictionary<string, string>())
    });

    foreach (var parse in parsed) parse.WriteFile();
    var o = new ProcessorOutput(fileHelper.WriteDir);
    return Task.FromResult(o);
});