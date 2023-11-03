using sulfone_helium_domain.Core.FileSystem;
using sulfone_helium_domain.Plugin;
using sulfone_helium_domain.Processor;

namespace sulfone_helium_domain.Core;

public interface ICyanTemplate
{
    Task<Cyan> Template(IInquirer inquirer, IDeterminism determinism);
}

public interface ICyanExtension
{
    Task<Cyan> Extension(IInquirer inquirer, IDeterminism determinism, CyanExtensionInput input);
}

public interface ICyanProcessor
{
    Task<ProcessorOutput> Process(CyanProcessorInput input, CyanFileHelper fileHelper);
}

public interface ICyanPlugin
{
    Task<PluginOutput> Plugin(CyanPluginInput input);
}