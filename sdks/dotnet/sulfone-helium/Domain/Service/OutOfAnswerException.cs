using sulfone_helium_domain.Core.Questions;

namespace sulfone_helium_domain.Service;

public class OutOfAnswerException: Exception
{
    public OutOfAnswerException(string? message, IQuestion question) : base(message)
    {
        Question = question;
    }

    public IQuestion Question { get; }
}