namespace sulfone_helium.Domain.Core.Questions;

public struct CheckboxQ : IQuestion
{
    public QuestionType Type => QuestionType.Checkbox;
    public Func<string, string?>? Validate { get; set; }

    public string Message { get; set; }
    public string Id { get; set; } // Unique identifier for the question
    public string? Desc { get; set; }
    public string[] Options { get; set; }
}
