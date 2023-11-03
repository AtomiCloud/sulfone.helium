using sulfone_helium_domain.Core;

namespace sulfone_helium_domain.Template;

public record TemplateInput(
    IAnswer[] Answers,
    Dictionary<string, string>[] DeterministicState
);

public record TemplateValidateInput(
    IAnswer[] Answers,
    Dictionary<string, string>[] DeterministicState,
    string Validate
);