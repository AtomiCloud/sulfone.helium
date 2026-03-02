using sulfone_helium.Domain.Resolver;

namespace sulfone_helium.Api.Resolver;

public static class ResolverMapper
{
    private static FileOrigin ToDomain(this FileOriginReq req)
    {
        return new FileOrigin(req.Template, req.Layer);
    }

    private static ResolvedFile ToDomain(this ResolvedFileReq req)
    {
        return new ResolvedFile(req.Path, req.Content, req.Origin.ToDomain());
    }

    public static ResolverInput ToDomain(this ResolverReq req)
    {
        return new ResolverInput(req.Config, req.Files.Select(x => x.ToDomain()));
    }

    public static ResolverRes ToRes(this ResolverOutput res)
    {
        return new ResolverRes { Path = res.Path, Content = res.Content };
    }
}
