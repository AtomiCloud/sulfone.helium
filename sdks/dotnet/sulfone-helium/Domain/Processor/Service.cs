using Newtonsoft.Json.Linq;
using sulfone_helium_domain.Core;
using sulfone_helium_domain.Core.FileSystem;

namespace sulfone_helium_domain.Processor;

public class ProcessorService
{
    public required ICyanProcessor Processor { private get; init; }

    public async Task<ProcessorOutput> Process(ProcessorInput input)
    {
        var (read, write, globs, config) = input;
        var cyanGlobs = globs as CyanGlob[] ?? globs.ToArray();
        var helper = new CyanFileHelper(read, write, cyanGlobs);
        return await Processor.Process(new CyanProcessorInput
        {
            ReadDir = read,
            WriteDir = write,
            Globs = cyanGlobs,
            Config = config,
        }, helper);
    }
}