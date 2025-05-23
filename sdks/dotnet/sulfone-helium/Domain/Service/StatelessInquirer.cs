using System.Globalization;
using sulfone_helium.Domain.Core;
using sulfone_helium.Domain.Core.Questions;

namespace sulfone_helium.Domain.Service;

public class StatelessInquirer(Dictionary<string, IAnswer> answers) : IInquirer
{
    private readonly Dictionary<string, IAnswer> _answers = answers;

    private IAnswer GetAnswer(IQuestion q)
    {
        if (!_answers.ContainsKey(q.Id))
        {
            throw new OutOfAnswerException("", q);
        }

        return _answers[q.Id];
    }

    public Task<string[]> Checkbox(CheckboxQ q)
    {
        var answer = this.GetAnswer(q);
        var a = answer switch
        {
            StringArrayAnswer stringArrayAnswer => stringArrayAnswer.Answer,
            _ => throw new ArgumentOutOfRangeException(
                "Incorrect answer type. Expected: StringArrayAnswer. Got: " + answer.GetType()
            ),
        };
        return Task.FromResult(a);
    }

    public Task<string[]> Checkbox(string q, string[] options, string id, string? help)
    {
        return this.Checkbox(
            new CheckboxQ()
            {
                Message = q,
                Options = options,
                Desc = help,
                Id = id,
            }
        );
    }

    public Task<bool> Confirm(ConfirmQ q)
    {
        var answer = this.GetAnswer(q);
        var a = answer switch
        {
            BoolAnswer ans => ans.Answer,
            _ => throw new ArgumentOutOfRangeException(
                "Incorrect answer type. Expected: BoolAnswer. Got: " + answer.GetType()
            ),
        };
        return Task.FromResult(a);
    }

    public Task<bool> Confirm(string q, string id, string? help)
    {
        return this.Confirm(
            new ConfirmQ()
            {
                Message = q,
                Desc = help,
                Id = id,
            }
        );
    }

    public Task<string> Password(PasswordQ q)
    {
        var answer = this.GetAnswer(q);
        var a = answer switch
        {
            StringAnswer ans => ans.Answer,
            _ => throw new ArgumentOutOfRangeException(
                "Incorrect answer type. Expected: StringAnswer. Got: " + answer.GetType()
            ),
        };
        return Task.FromResult(a);
    }

    public Task<string> Password(string q, string id, string? help)
    {
        return this.Password(
            new PasswordQ()
            {
                Message = q,
                Desc = help,
                Id = id,
            }
        );
    }

    public Task<string> Select(SelectQ q)
    {
        var answer = this.GetAnswer(q);
        var a = answer switch
        {
            StringAnswer ans => ans.Answer,
            _ => throw new ArgumentOutOfRangeException(
                "Incorrect answer type. Expected: StringAnswer. Got: " + answer.GetType()
            ),
        };
        return Task.FromResult(a);
    }

    public Task<string> Select(string q, string[] options, string id, string? help)
    {
        return this.Select(
            new SelectQ()
            {
                Message = q,
                Desc = help,
                Options = options,
                Id = id,
            }
        );
    }

    public Task<string> Text(TextQ q)
    {
        var answer = this.GetAnswer(q);
        var a = answer switch
        {
            StringAnswer ans => ans.Answer,
            _ => throw new ArgumentOutOfRangeException(
                "Incorrect answer type. Expected: StringAnswer. Got: " + answer.GetType()
            ),
        };
        return Task.FromResult(a);
    }

    public Task<string> Text(string q, string id, string? help)
    {
        return this.Text(
            new TextQ()
            {
                Message = q,
                Desc = help,
                Id = id,
            }
        );
    }

    public Task<DateOnly> DateSelect(DateQ q)
    {
        var answer = this.GetAnswer(q);
        var a = answer switch
        {
            StringAnswer ans => ans.Answer,
            _ => throw new ArgumentOutOfRangeException(
                "Incorrect answer type. Expected: StringAnswer. Got: " + answer.GetType()
            ),
        };
        var d = DateOnly.ParseExact(a, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        return Task.FromResult(d);
    }

    public Task<DateOnly> DateSelect(string question, string id, string? help)
    {
        return this.DateSelect(
            new DateQ()
            {
                Message = question,
                Desc = help,
                Id = id,
            }
        );
    }
}
