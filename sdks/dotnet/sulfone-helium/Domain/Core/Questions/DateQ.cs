namespace sulfone_helium_domain.Core.Questions;

public struct DateQ : IQuestion
{
    public QuestionType Type => QuestionType.DateSelect;
    public string Message { get; set; }
    public string? Default { get; set; }
    public string? Desc { get; set; }
    public Func<string, string?>? Validate { get; set; }

    public DateOnly? MinDate { get; set; }
    public DateOnly? MaxDate { get; set; }
}