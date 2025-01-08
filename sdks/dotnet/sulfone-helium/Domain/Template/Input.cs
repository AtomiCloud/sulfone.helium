using sulfone_helium.Domain.Core;

namespace sulfone_helium.Domain.Template;

public record TemplateInput(IAnswer[] Answers, Dictionary<string, string>[] DeterministicState);

public record TemplateValidateInput(
    IAnswer[] Answers,
    Dictionary<string, string>[] DeterministicState,
    string Validate
);
