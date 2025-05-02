namespace sulfone_helium.Domain.Core.Questions;

public struct CheckboxQ : IQuestion
{
    public readonly QuestionType Type => QuestionType.Checkbox;
    public readonly Func<string, string?>? Validate => null;

    public string Message { get; set; }
    public string Id { get; set; } // Unique identifier for the question
    public string? Desc { get; set; }
    public string[] Options { get; set; }
}
