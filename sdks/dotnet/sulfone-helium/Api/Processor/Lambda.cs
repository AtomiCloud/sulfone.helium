using sulfone_helium.Domain.Core;
using sulfone_helium.Domain.Core.FileSystem;
using sulfone_helium.Domain.Processor;

namespace sulfone_helium.Api.Processor;

public class LambdaProcessor(Func<CyanProcessorInput, CyanFileHelper, Task<ProcessorOutput>> f)
    : ICyanProcessor
{
    public Task<ProcessorOutput> Process(CyanProcessorInput i, CyanFileHelper fileHelper)
    {
        return f(i, fileHelper);
    }
}
