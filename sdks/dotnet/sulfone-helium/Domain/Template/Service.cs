using sulfone_helium.Domain.Core;
using sulfone_helium.Domain.Service;

namespace sulfone_helium.Domain.Template;

public class TemplateService(ICyanTemplate template)
{
    public async Task<ITemplateOutput> Template(TemplateInput answer)
    {
        var i = new StatelessInquirer(answer.Answers);
        var d = new StatelessDeterminism(answer.DeterministicState);
        try
        {
            var r = await template.Template(i, d);
            return new TemplateFinalOutput(r);
        }
        catch (OutOfAnswerException e)
        {
            return new TemplateQnAOutput(d.States, e.Question);
        }
    }

    public async Task<string?> Validate(TemplateValidateInput answer)
    {
        var i = new StatelessInquirer(answer.Answers);
        var d = new StatelessDeterminism(answer.DeterministicState);
        try
        {
            var r = await template.Template(i, d);
            throw new ApplicationException("Not supposed to reach here for validation!");
        }
        catch (OutOfAnswerException e)
        {
            var q = e.Question;
            var r = q.Validate?.Invoke(answer.Validate);
            return r == "" ? null : r;
        }
    }
}
