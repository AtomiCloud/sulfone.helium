using HandlebarsDotNet;
using sulfone_helium;
using sulfone_helium_processor_console;
using sulfone_helium.Domain;
using sulfone_helium.Domain.Processor;


CyanEngine.StartProcessor(args, Task<ProcessorOutput> (i, fileHelper) =>
{
    var (readDir, writeDir, globs, config) = i;

    Console.WriteLine("ReadDir: {0}", readDir);
    Console.WriteLine("WriteDir: {0}", writeDir);
    Console.WriteLine("Globs: {0}", globs.ToJson());
    Console.WriteLine("Config: {0}", config.ToJson());

    var handleBarsConfig = config.ToObject<HandleBarsConfig>();

    Console.WriteLine("HandleBarsConfig: {0}", handleBarsConfig.ToJson());

    var files = fileHelper.ResolveAll();

    var parsed = files.Select(x =>
    {
        try
        {
            return x with
            {
                Content = Handlebars.Compile(x.Content)(handleBarsConfig?.Vars ?? new Dictionary<string, string>())
            };
        }
        catch (Exception e)
        {
            Console.WriteLine("Error parsing file: {0}/{1}", x.BaseRead, x.Relative);
            Console.WriteLine("Error: {0}", e);
            return x;
        }
    });

    foreach (var parse in parsed) parse.WriteFile();
    var o = new ProcessorOutput(fileHelper.WriteDir);
    return Task.FromResult(o);
});