namespace sulfone_helium_domain.Core.FileSystem;

public record VirtualFileStream(StreamReader Reader, StreamWriter Writer);

public record VirtualFileReference(string BaseRead, string BaseWrite, string Relative)
{
    public string Read => Path.Join(this.BaseRead, this.Relative);
    public string Write => Path.Join(this.BaseWrite, this.Relative);

    public VirtualFile ReadFile()
    {
        var content = File.ReadAllText(this.Read);
        return new VirtualFile(this.BaseRead, this.BaseWrite, this.Relative, content);
    }
}

public record VirtualFile(string BaseRead, string BaseWrite, string Relative, string Content)
{
    public string Read => Path.Join(this.BaseRead, this.Relative);
    public string Write => Path.Join(this.BaseWrite, this.Relative);

    public void WriteFile()
    {
        var parent = Directory.GetParent(this.Write);
        if (parent != null) Directory.CreateDirectory(parent.FullName);
        File.WriteAllText(this.Write, this.Content);
    }
}