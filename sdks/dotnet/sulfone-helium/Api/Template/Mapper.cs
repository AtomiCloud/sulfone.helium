using sulfone_helium.Api.Core;
using sulfone_helium.Domain.Template;

namespace sulfone_helium.Api.Template;

public static class TemplateInputMapper
{
    public static TemplateInput ToDomain(this TemplateAnswerReq req)
    {
        var answers = new Dictionary<string, sulfone_helium.Domain.Core.IAnswer>();

        foreach (var kvp in req.Answers)
        {
            answers[kvp.Key] = kvp.Value.ToDomain();
        }

        return new TemplateInput(answers, req.DeterministicStates);
    }

    public static TemplateValidateInput ToDomain(this TemplateValidateReq req)
    {
        var answers = new Dictionary<string, sulfone_helium.Domain.Core.IAnswer>();

        foreach (var kvp in req.Answers)
        {
            answers[kvp.Key] = kvp.Value.ToDomain();
        }

        return new TemplateValidateInput(answers, req.DeterministicStates, req.Validate);
    }
}

public static class TemplateOutputMapper
{
    public static TemplateRes ToResp(this ITemplateOutput output)
    {
        return output switch
        {
            TemplateFinalOutput finalOutput => new TemplateFinalRes()
            {
                Cyan = finalOutput.Data.ToResp(),
            },
            TemplateQnAOutput qnAOutput => new TemplateQnARes
            {
                DeterministicState = qnAOutput.DeterministicState,
                Question = qnAOutput.Question.ToResp(),
            },
            _ => throw new ArgumentOutOfRangeException(nameof(output)),
        };
    }
}
