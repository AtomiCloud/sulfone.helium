using sulfone_helium.Domain.Core;

namespace sulfone_helium.Domain.Template;

public record TemplateInput(
    Dictionary<string, IAnswer> Answers,
    Dictionary<string, string> DeterministicState
);

public record TemplateValidateInput(
    Dictionary<string, IAnswer> Answers,
    Dictionary<string, string> DeterministicState,
    string Validate
);
