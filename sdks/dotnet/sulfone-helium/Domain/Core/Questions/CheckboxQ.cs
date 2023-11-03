namespace sulfone_helium_domain.Core.Questions;

public struct CheckboxQ : IQuestion
{
    public QuestionType Type => QuestionType.Checkbox;
    public Func<string, string?>? Validate => null;

    public string Message { get; set; }
    public string? Desc { get; set; }
    public string[] Options { get; set; }
}