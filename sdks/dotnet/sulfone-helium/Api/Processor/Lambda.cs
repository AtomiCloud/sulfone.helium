using sulfone_helium.Domain.Core;
using sulfone_helium.Domain.Core.FileSystem;
using sulfone_helium.Domain.Processor;

namespace sulfone_helium.Api.Processor;

public class LambdaProcessor : ICyanProcessor
{
    private readonly Func<CyanProcessorInput, CyanFileHelper, Task<ProcessorOutput>> _f;

    public LambdaProcessor(Func<CyanProcessorInput, CyanFileHelper, Task<ProcessorOutput>> f)
    {
        _f = f;
    }

    public Task<ProcessorOutput> Process(CyanProcessorInput i, CyanFileHelper fileHelper)
    {
        return this._f(i, fileHelper);
    }
}