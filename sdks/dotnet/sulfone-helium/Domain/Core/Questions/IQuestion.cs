namespace sulfone_helium.Domain.Core.Questions;

public enum QuestionType
{
    Text = 0,
    DateSelect = 1,
    Select = 2,
    Checkbox = 3,
    Password = 4,
    Confirm = 5,
}

public interface IQuestion
{
    // union discriminator
    QuestionType Type { get; }
    string Message { get; }
    string? Desc { get; }
    public Func<string, string?>? Validate { get; }
}
