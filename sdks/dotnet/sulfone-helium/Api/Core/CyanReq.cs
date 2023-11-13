using System.Dynamic;

namespace sulfone_helium.Api.Core;

public struct CyanGlobReq
{
    public string? Root { get; init; }
    public string Glob { get; init; }
    public string[] Exclude { get; init; }
    public string Type { get; init; }
}

public struct CyanPluginReq
{
    public string Name { get; init; }
    public ExpandoObject Config { get; init; }
}

public struct CyanProcessorReq
{
    public string Name { get; init; }
    public ExpandoObject Config { get; init; }

    public CyanGlobReq[] Files { get; init; }
}

public struct CyanReq
{
    public CyanProcessorReq[] Processors { get; init; }
    public CyanPluginReq[] Plugins { get; init; }
}