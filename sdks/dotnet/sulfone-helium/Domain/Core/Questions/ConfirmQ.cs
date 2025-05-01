namespace sulfone_helium.Domain.Core.Questions;

public struct ConfirmQ : IQuestion
{
    public readonly QuestionType Type => QuestionType.Confirm;

    public string Message { get; set; }
    public string Id { get; set; }
    public string? Desc { get; set; }

    public bool? Default { get; set; }
    public string? ErrorMessage { get; set; }

    public readonly Func<string, string?>? Validate => null;
}
