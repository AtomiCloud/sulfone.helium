using Newtonsoft.Json.Linq;

namespace sulfone_helium.Domain.Core;

// User-viewed input
public readonly struct CyanExtensionInput
{
    public void Deconstruct(
        out IEnumerable<IAnswer> prevAnswers,
        out Cyan prevCyan,
        out Dictionary<string, IEnumerable<IAnswer>> prevExtensionAnswers,
        out Dictionary<string, Cyan> prevExtensionCyans
    )
    {
        prevAnswers = PrevAnswers;
        prevCyan = PrevCyan;
        prevExtensionAnswers = PrevExtensionAnswers;
        prevExtensionCyans = PrevExtensionCyans;
    }

    public required IEnumerable<IAnswer> PrevAnswers { get; init; }
    public required Cyan PrevCyan { get; init; }
    public required Dictionary<string, IEnumerable<IAnswer>> PrevExtensionAnswers { get; init; }
    public required Dictionary<string, Cyan> PrevExtensionCyans { get; init; }
}

public readonly struct CyanProcessorInput
{
    public void Deconstruct(
        out string readDir,
        out string writeDir,
        out IEnumerable<CyanGlob> globs,
        out JObject config
    )
    {
        readDir = ReadDir;
        writeDir = WriteDir;
        globs = Globs;
        config = Config;
    }

    public required string ReadDir { get; init; }
    public required string WriteDir { get; init; }

    public required IEnumerable<CyanGlob> Globs { get; init; }
    public required JObject Config { get; init; }
}

public readonly struct CyanPluginInput
{
    public void Deconstruct(out string directory, out JObject config)
    {
        directory = Directory;
        config = Config;
    }

    public required string Directory { get; init; }
    public required JObject Config { get; init; }
}
