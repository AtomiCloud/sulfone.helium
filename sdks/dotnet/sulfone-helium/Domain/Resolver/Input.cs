namespace sulfone_helium.Domain.Resolver;

public record FileOrigin(string Template, int Layer);

public record ResolvedFile(string Path, string Content, FileOrigin Origin);

public record ResolverInput(Dictionary<string, object> Config, IEnumerable<ResolvedFile> Files);
