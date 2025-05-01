using sulfone_helium.Domain.Core;
using sulfone_helium.Domain.Core.Questions;

namespace sulfone_helium.Domain.Template;

public interface ITemplateOutput { }

public record TemplateQnAOutput(Dictionary<string, string> DeterministicState, IQuestion Question)
    : ITemplateOutput;

public record TemplateFinalOutput(Cyan Data) : ITemplateOutput;
