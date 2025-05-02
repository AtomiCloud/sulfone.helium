using sulfone_helium.Domain.Core.Questions;

namespace sulfone_helium.Domain.Service;

public class OutOfAnswerException(string? message, IQuestion question) : Exception(message)
{
    public IQuestion Question { get; } = question;
}
