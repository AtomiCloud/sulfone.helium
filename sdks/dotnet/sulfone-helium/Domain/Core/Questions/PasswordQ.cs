namespace sulfone_helium.Domain.Core.Questions;

public struct PasswordQ : IQuestion
{
    public readonly QuestionType Type => QuestionType.Password;
    public Func<string, string?>? Validate { get; set; }

    public string Message { get; set; }
    public string Id { get; set; }
    public string? Desc { get; set; }
    public bool? Confirmation { get; set; }
}
