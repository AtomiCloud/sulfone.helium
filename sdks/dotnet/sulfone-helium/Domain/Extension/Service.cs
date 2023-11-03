using sulfone_helium_domain.Core;
using sulfone_helium_domain.Service;

namespace sulfone_helium_domain.Extension;

public class ExtensionService
{
    public required ICyanExtension Ext { private get; init; }

    public async Task<IExtensionOutput> Extend(ExtensionAnswerInput answer)
    {
        short pointer = -1;
        var i = new StatelessInquirer(answer.Answers, ref pointer);
        var d = new StatelessDeterminism(answer.DeterministicState, ref pointer);
        try
        {
            var input = new CyanExtensionInput()
            {
                PrevAnswers = answer.PrevAnswers,
                Prev = answer.Prev,
            };
            var r = await Ext.Extension(i, d, input);
            return new ExtensionFinalOutput(r);
        }
        catch (OutOfAnswerException e)
        {
            return new ExtensionQnAOutput(d.States, e.Question);
        }
    }

    public async Task<string?> Validate(ExtensionValidateInput answer)
    {
        short pointer = -1;
        var i = new StatelessInquirer(answer.Answers, ref pointer);
        var d = new StatelessDeterminism(answer.DeterministicState, ref pointer);
        try
        {
            var input = new CyanExtensionInput()
            {
                PrevAnswers = answer.PrevAnswers,
                Prev = answer.Prev,
            };
            var r = await Ext.Extension(i, d, input);
            throw new ApplicationException("Not supposed to reach here for validation!");
        }
        catch (OutOfAnswerException e)
        {
            var q = e.Question;
            return q.Validate?.Invoke(answer.Validate);
        }
    }
}