namespace sulfone_helium_domain.Core.Questions;

public struct ConfirmQ: IQuestion
{
    public QuestionType Type => QuestionType.Confirm;
    
    public string Message { get; set; }
    public string? Desc { get; set;  }

    public string? Default { get; set; }
    public string? ErrorMessage { get; set; }
    
    public Func<string, string?>? Validate => null;
    
}