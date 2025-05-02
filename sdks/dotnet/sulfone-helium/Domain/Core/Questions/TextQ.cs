namespace sulfone_helium.Domain.Core.Questions;

public struct TextQ : IQuestion
{
    public readonly QuestionType Type => QuestionType.Text;
    public Func<string, string?>? Validate { get; set; }

    public string Message { get; set; }
    public string Id { get; set; }
    public string? Default { get; set; }
    public string? Desc { get; set; }
    public string? Initial { get; set; }
}
