namespace sulfone_helium.Domain.Core.Questions;

public struct SelectQ : IQuestion
{
    public readonly QuestionType Type => QuestionType.Select;
    public readonly Func<string, string?>? Validate => null;

    public string Message { get; set; }
    public string Id { get; set; } // Unique identifier for the question
    public string[] Options { get; set; }

    public string? Desc { get; set; }
}
