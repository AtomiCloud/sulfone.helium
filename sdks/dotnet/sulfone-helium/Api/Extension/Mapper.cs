using sulfone_helium.Api.Core;
using sulfone_helium.Domain.Core;
using sulfone_helium.Domain.Extension;

namespace sulfone_helium.Api.Extension;

public static class ExtensionMapper
{
    public static ExtensionAnswerInput ToDomain(this ExtensionAnswerReq req)
    {
        return new ExtensionAnswerInput(
            req.Answers.Select(x => x.ToDomain()).ToArray(),
            req.DeterministicStates,
            req.PrevAnswers.Select(x => x.ToDomain()).ToArray(),
            req.PrevCyan.ToDomain(),
            req.PrevExtensionAnswers.Select(kv => new KeyValuePair<string, IEnumerable<IAnswer>>(
                    kv.Key,
                    kv.Value.Select(a => a.ToDomain())
                ))
                .ToDictionary(kv => kv.Key, kv => kv.Value),
            req.PrevExtensionCyans.Select(kv => new KeyValuePair<string, Cyan>(
                    kv.Key,
                    kv.Value.ToDomain()
                ))
                .ToDictionary(kv => kv.Key, kv => kv.Value)
        );
    }

    public static ExtensionValidateInput ToDomain(this ExtensionValidateReq req)
    {
        return new ExtensionValidateInput(
            req.Answers.Select(x => x.ToDomain()).ToArray(),
            req.DeterministicStates,
            req.PrevAnswers.Select(x => x.ToDomain()).ToArray(),
            req.PrevCyan.ToDomain(),
            req.PrevExtensionAnswers.Select(kv => new KeyValuePair<string, IEnumerable<IAnswer>>(
                    kv.Key,
                    kv.Value.Select(a => a.ToDomain())
                ))
                .ToDictionary(kv => kv.Key, kv => kv.Value),
            req.PrevExtensionCyans.Select(kv => new KeyValuePair<string, Cyan>(
                    kv.Key,
                    kv.Value.ToDomain()
                ))
                .ToDictionary(kv => kv.Key, kv => kv.Value),
            req.Validate
        );
    }
}

public static class ExtensionOutputMapper
{
    public static ExtensionRes ToResp(this IExtensionOutput output)
    {
        return output switch
        {
            ExtensionFinalOutput finalOutput => new ExtensionFinalRes()
            {
                Cyan = finalOutput.Data.ToResp(),
            },
            ExtensionQnAOutput qnAOutput => new ExtensionQnARes
            {
                DeterministicState = qnAOutput.DeterministicState,
                Question = qnAOutput.Question.ToResp(),
            },
            _ => throw new ArgumentOutOfRangeException(nameof(output)),
        };
    }
}
