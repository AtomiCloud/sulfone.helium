using sulfone_helium.Domain.Core.Questions;

namespace sulfone_helium.Domain.Service;

public class OutOfAnswerException : Exception
{
    public OutOfAnswerException(string? message, IQuestion question)
        : base(message)
    {
        Question = question;
    }

    public IQuestion Question { get; }
}
