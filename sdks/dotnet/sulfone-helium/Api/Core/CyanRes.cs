using System.Dynamic;

namespace sulfone_helium.Api.Core;

public struct CyanGlobRes
{
    public string? Root { get; init; }
    public string Glob { get; init; }
    public string[] Exclude { get; init; }
    public string Type { get; init; }
}

public struct CyanPluginRes
{
    public string Name { get; init; }
    public ExpandoObject Config { get; init; }
}

public struct CyanProcessorRes
{
    public string Name { get; init; }
    public ExpandoObject Config { get; init; }

    public CyanGlobRes[] Files { get; init; }
}

public struct CyanRes
{
    public CyanProcessorRes[] Processors { get; init; }
    public CyanPluginRes[] Plugins { get; init; }
}
