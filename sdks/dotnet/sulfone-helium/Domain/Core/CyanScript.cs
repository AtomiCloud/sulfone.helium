using sulfone_helium.Domain.Core.FileSystem;
using sulfone_helium.Domain.Plugin;
using sulfone_helium.Domain.Processor;

namespace sulfone_helium.Domain.Core;

public interface ICyanTemplate
{
    Task<Cyan> Template(IInquirer inquirer, IDeterminism determinism);
}

public interface ICyanProcessor
{
    Task<ProcessorOutput> Process(CyanProcessorInput input, CyanFileHelper fileHelper);
}

public interface ICyanPlugin
{
    Task<PluginOutput> Plugin(CyanPluginInput input);
}
