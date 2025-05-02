using System.Dynamic;

namespace sulfone_helium.Api.Core;

public readonly struct CyanGlobRes
{
    public string? Root { get; init; }
    public string Glob { get; init; }
    public string[] Exclude { get; init; }
    public string Type { get; init; }
}

public readonly struct CyanPluginRes
{
    public string Name { get; init; }
    public ExpandoObject Config { get; init; }
}

public readonly struct CyanProcessorRes
{
    public string Name { get; init; }
    public ExpandoObject Config { get; init; }

    public CyanGlobRes[] Files { get; init; }
}

public readonly struct CyanRes
{
    public CyanProcessorRes[] Processors { get; init; }
    public CyanPluginRes[] Plugins { get; init; }
}
