using sulfone_helium.Api.Core;
using sulfone_helium.Domain.Processor;

namespace sulfone_helium.Api.Processor;

public static class ProcessorMapper
{
    public static ProcessorInput ToDomain(this ProcessorReq req)
    {
        return new ProcessorInput(
            req.ReadDir,
            req.WriteDir,
            req.Globs.Select(x => x.ToDomain()),
            req.Config.ToDynamic()
        );
    }

    public static ProcessorRes ToRes(this ProcessorOutput res)
    {
        return new ProcessorRes { OutputDir = res.Directory };
    }
}
