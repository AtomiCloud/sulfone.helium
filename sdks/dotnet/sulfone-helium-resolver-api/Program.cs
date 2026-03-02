using sulfone_helium;
using sulfone_helium.Domain.Resolver;

CyanEngine.StartResolver(
    args,
    Task<ResolverOutput> (i) =>
    {
        var (config, files) = i;

        Console.WriteLine("Config: {0}", config);
        Console.WriteLine("Files: {0}", files.Count());

        // Simple merge: just return the first file's content as-is (placeholder implementation)
        var firstFile = files.FirstOrDefault();
        if (firstFile == null)
        {
            return Task.FromResult(new ResolverOutput("", ""));
        }

        return Task.FromResult(new ResolverOutput(firstFile.Path, firstFile.Content));
    }
);
