using sulfone_helium.Domain.Core;
using sulfone_helium.Domain.Resolver;

namespace sulfone_helium.Api.Resolver;

public class LambdaResolver(Func<ResolverInput, Task<ResolverOutput>> f) : ICyanResolver
{
    public Task<ResolverOutput> Resolve(ResolverInput input)
    {
        return f(input);
    }
}
