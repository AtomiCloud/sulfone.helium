namespace sulfone_helium.Api.Resolver;

public struct FileOriginReq
{
    public string Template { get; set; }
    public int Layer { get; set; }
}

public struct ResolvedFileReq
{
    public string Path { get; set; }
    public string Content { get; set; }
    public FileOriginReq Origin { get; set; }
}

public struct ResolverReq
{
    public Dictionary<string, object> Config { get; set; }
    public IEnumerable<ResolvedFileReq> Files { get; set; }
}
