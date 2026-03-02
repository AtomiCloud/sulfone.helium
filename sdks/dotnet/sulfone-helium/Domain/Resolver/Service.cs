using sulfone_helium.Domain.Core;

namespace sulfone_helium.Domain.Resolver;

public class ResolverService
{
    public required ICyanResolver Resolver { private get; init; }

    public async Task<ResolverOutput> Resolve(ResolverInput input)
    {
        return await Resolver.Resolve(input);
    }
}
