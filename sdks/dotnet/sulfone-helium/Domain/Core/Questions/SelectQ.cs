namespace sulfone_helium.Domain.Core.Questions;

public struct SelectQ : IQuestion
{
    public QuestionType Type => QuestionType.Select;
    public Func<string, string?>? Validate { get; set; }

    public string Message { get; set; }
    public string Id { get; set; } // Unique identifier for the question
    public string[] Options { get; set; }

    public string? Desc { get; set; }
}
