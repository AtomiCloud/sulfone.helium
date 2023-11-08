using sulfone_helium.Api.Core;
using sulfone_helium.Domain.Template;

namespace sulfone_helium.Api.Template;

public static class TemplateInputMapper
{
    public static TemplateInput ToDomain(this TemplateAnswerReq req)
    {
        return new TemplateInput(
            req.Answers.Select(x => x.ToDomain()).ToArray(),
            req.DeterministicStates
        );
    }

    public static TemplateValidateInput ToDomain(this TemplateValidateReq req)
    {
        return new TemplateValidateInput(
            req.Answers.Select(x => x.ToDomain()).ToArray(),
            req.DeterministicStates,
            req.Validate
        );
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
            _ => throw new ArgumentOutOfRangeException(nameof(output))
        };
    }
}