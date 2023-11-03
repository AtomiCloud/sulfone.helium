using System.Globalization;
using sulfone_helium_domain.Core;
using sulfone_helium_domain.Core.Questions;

namespace sulfone_helium_domain.Service;

public class StatelessInquirer : IInquirer
{
    private readonly IAnswer[] _answers;
    private short _pointer;

    public StatelessInquirer(IAnswer[] answers, ref short pointer)
    {
        _answers = answers;
        _pointer = pointer;
    }

    private IAnswer GetAnswer(IQuestion q)
    {
        if (this._pointer == this._answers.Length - 1)
        {
            throw new OutOfAnswerException("", q);
        }

        return this._answers[++this._pointer];
    }

    public Task<string[]> Checkbox(CheckboxQ q)
    {
        var answer = this.GetAnswer(q);
        var a = answer switch
        {
            StringArrayAnswer stringArrayAnswer => stringArrayAnswer.Answer,
            _ => throw new ArgumentOutOfRangeException("Incorrect answer type. Expected: StringArrayAnswer. Got: " +
                                                       answer.GetType())
        };
        return Task.FromResult(a);
    }

    public Task<string[]> Checkbox(string q, string[] options, string? help)
    {
        return this.Checkbox(new CheckboxQ()
        {
            Message = q,
            Options = options,
            Desc = help,
        });
    }

    public Task<bool> Confirm(ConfirmQ q)
    {
        var answer = this.GetAnswer(q);
        var a = answer switch
        {
            BoolAnswer ans => ans.Answer,
            _ => throw new ArgumentOutOfRangeException("Incorrect answer type. Expected: BoolAnswer. Got: " +
                                                       answer.GetType())
        };
        return Task.FromResult(a);
    }

    public Task<bool> Confirm(string q, string? help)
    {
        return this.Confirm(new ConfirmQ()
        {
            Message = q,
            Desc = help,
        });
    }

    public Task<string> Password(PasswordQ q)
    {
        var answer = this.GetAnswer(q);
        var a = answer switch
        {
            StringAnswer ans => ans.Answer,
            _ => throw new ArgumentOutOfRangeException("Incorrect answer type. Expected: StringAnswer. Got: " +
                                                       answer.GetType())
        };
        return Task.FromResult(a);
    }

    public Task<string> Password(string q, string? help)
    {
        return this.Password(new PasswordQ()
        {
            Message = q,
            Desc = help,
        });
    }

    public Task<string> Select(SelectQ q)
    {
        var answer = this.GetAnswer(q);
        var a = answer switch
        {
            StringAnswer ans => ans.Answer,
            _ => throw new ArgumentOutOfRangeException("Incorrect answer type. Expected: StringAnswer. Got: " +
                                                       answer.GetType())
        };
        return Task.FromResult(a);
    }

    public Task<string> Select(string q, string[] options, string? help)
    {
        return this.Select(new SelectQ()
        {
            Message = q,
            Desc = help,
            Options = options,
        });
    }

    public Task<string> Text(TextQ q)
    {
        var answer = this.GetAnswer(q);
        var a = answer switch
        {
            StringAnswer ans => ans.Answer,
            _ => throw new ArgumentOutOfRangeException("Incorrect answer type. Expected: StringAnswer. Got: " +
                                                       answer.GetType())
        };
        return Task.FromResult(a);
    }

    public Task<string> Text(string q, string? help)
    {
        return this.Text(new TextQ()
        {
            Message = q,
            Desc = help,
        });
    }

    public Task<DateOnly> DateSelect(DateQ q)
    {
        var answer = this.GetAnswer(q);
        var a = answer switch
        {
            StringAnswer ans => ans.Answer,
            _ => throw new ArgumentOutOfRangeException("Incorrect answer type. Expected: StringAnswer. Got: " +
                                                       answer.GetType())
        };
        var d = DateOnly.ParseExact(a, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        return Task.FromResult(d);
    }

    public Task<DateOnly> DateSelect(string question, string? help)
    {
        return this.DateSelect(new DateQ()
        {
            Message = question,
            Desc = help,
        });
    }
}