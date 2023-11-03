using Microsoft.Extensions.FileSystemGlobbing;

namespace sulfone_helium_domain.Core.FileSystem;

public class CyanFileHelper
{
    private readonly string _readDir;
    private readonly string _writeDir;
    private readonly IEnumerable<CyanGlob> _globs;

    public string ReadDir => Path.GetFullPath(this._readDir);
    public string WriteDir => Path.GetFullPath(this._writeDir);

    public CyanFileHelper(string readDir, string writeDir, IEnumerable<CyanGlob> globs)
    {
        this._readDir = readDir;
        this._writeDir = writeDir;
        _globs = globs;
    }

    public IEnumerable<VirtualFile> ResolveAll()
    {
        var copy = this._globs.Where(x => x.Type == GlobType.Copy);
        var template = this._globs.Where(x => x.Type == GlobType.Template);

        foreach (var c in copy) this.Copy(c);

        return template.Select(this.Read)
            .SelectMany(x => x);
    }

    public void CopyFile(string from, string to)
    {
        var parent = Directory.GetParent(to);
        if (parent != null) Directory.CreateDirectory(parent.FullName);
        File.Copy(from, to, true);
    }

    public IEnumerable<VirtualFileStream> ReadAsStream(CyanGlob glob)
    {
        Matcher matcher = new();
        matcher.AddIncludePatterns(new[] { glob.Glob });
        matcher.AddExcludePatterns(glob.Exclude);

        var matchingFiles = matcher.GetResultsInFullPath(this.ReadDir)
            .Select(x => Path.GetRelativePath(this.ReadDir, x))
            .ToArray();
        return matchingFiles.Select(x =>
            new VirtualFileStream(
                File.OpenText(Path.Combine(this.ReadDir, x)),
                File.CreateText(Path.Combine(this.WriteDir, x))
            )
        );
    }

    public IEnumerable<VirtualFileReference> Get(CyanGlob glob)
    {
        Matcher matcher = new();
        matcher.AddIncludePatterns(new[] { glob.Glob });
        matcher.AddExcludePatterns(glob.Exclude);

        var matchingFiles = matcher.GetResultsInFullPath(this.ReadDir)
            .Select(x => Path.GetRelativePath(this.ReadDir, x))
            .ToArray();
        return matchingFiles.Select(x =>
            new VirtualFileReference(this.ReadDir, this.WriteDir, x)
        );
    }

    public IEnumerable<VirtualFile> Read(CyanGlob glob)
    {
        return this.Get(glob).Select(x => x.ReadFile());
    }

    public void Copy(CyanGlob copy)
    {
        Matcher matcher = new();
        matcher.AddIncludePatterns(new[] { copy.Glob });
        matcher.AddExcludePatterns(copy.Exclude);

        var matchingFiles = matcher.GetResultsInFullPath(this.ReadDir)
            .Select(x => Path.GetRelativePath(this.ReadDir, x))
            .ToArray();

        var files = matchingFiles.Select(x =>
            (Path.Join(this.ReadDir, x), Path.Join(this.WriteDir, x))
        );

        foreach (var (read, write) in files)
        {
            Console.WriteLine($"copy: {read} -> {write}");
            this.CopyFile(read, write);
        }
    }
}