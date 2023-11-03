using sulfone_helium_domain.Core;
using sulfone_helium_domain.Service;

namespace sulfone_helium_domain.Template;

public interface ITemplateService
{
}

public class TemplateService : ITemplateService
{
    private readonly ICyanTemplate _template;

    public TemplateService(ICyanTemplate template)
    {
        _template = template;
    }

    public async Task<ITemplateOutput> Template(TemplateInput answer)
    {
        short pointer = -1;
        var i = new StatelessInquirer(answer.Answers, ref pointer);
        var d = new StatelessDeterminism(answer.DeterministicState, ref pointer);
        try
        {
            var r = await _template.Template(i, d);
            return new TemplateFinalOutput(r);
        }
        catch (OutOfAnswerException e)
        {
            return new TemplateQnAOutput(d.States, e.Question);
        }
    }

    public async Task<string?> Validate(TemplateValidateInput answer)
    {
        short pointer = -1;
        var i = new StatelessInquirer(answer.Answers, ref pointer);
        var d = new StatelessDeterminism(answer.DeterministicState, ref pointer);
        try
        {
            var r = await _template.Template(i, d);
            throw new ApplicationException("Not supposed to reach here for validation!");

        }
        catch (OutOfAnswerException e)
        {
            var q = e.Question;
            return q.Validate?.Invoke(answer.Validate);
        }
    }
}