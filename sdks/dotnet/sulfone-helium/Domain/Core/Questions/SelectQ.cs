namespace sulfone_helium.Domain.Core.Questions;

public struct SelectQ : IQuestion
{
    public QuestionType Type => QuestionType.Select;
    public Func<string, string?>? Validate => null;

    public string Message { get; set; }
    public string[] Options { get; set; }

    public string? Desc { get; set; }
}
