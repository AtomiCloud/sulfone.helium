using sulfone_helium_domain.Core;
using sulfone_helium_domain.Core.Questions;

namespace sulfone_helium_domain.Template;

public interface ITemplateOutput
{
}

public record TemplateQnAOutput(
    Dictionary<string, string>[] DeterministicState,
    IQuestion Question
) : ITemplateOutput;

public record TemplateFinalOutput(Cyan Data): ITemplateOutput;