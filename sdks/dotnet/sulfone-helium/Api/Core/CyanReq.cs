using System.Dynamic;

namespace sulfone_helium.Api.Core;

public readonly struct CyanGlobReq
{
    public string? Root { get; init; }
    public string Glob { get; init; }
    public string[] Exclude { get; init; }
    public string Type { get; init; }
}

public readonly struct CyanPluginReq
{
    public string Name { get; init; }
    public ExpandoObject Config { get; init; }
}

public readonly struct CyanProcessorReq
{
    public string Name { get; init; }
    public ExpandoObject Config { get; init; }

    public CyanGlobReq[] Files { get; init; }
}

public readonly struct CyanReq
{
    public CyanProcessorReq[] Processors { get; init; }
    public CyanPluginReq[] Plugins { get; init; }
}
