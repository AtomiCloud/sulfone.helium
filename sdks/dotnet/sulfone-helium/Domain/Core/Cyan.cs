namespace sulfone_helium.Domain.Core;

public enum GlobType
{
    Template,
    Copy,
}

public class CyanGlob
{
    public required string Glob { get; init; }
    public required string[] Exclude { get; init; }
    public required GlobType Type { get; init; }
}

public class CyanPlugin
{
    public required string Name { get; init; }
    public required dynamic Config { get; init; }
}

public class CyanProcessor
{
    public required string Name { get; init; }
    public required IEnumerable<CyanGlob> Files { get; init; }
    public required dynamic Config { get; init; }
}

public class Cyan
{
    public required IEnumerable<CyanProcessor> Processors { get; init; }
    public required IEnumerable<CyanPlugin> Plugins { get; init; }
    
}
    
