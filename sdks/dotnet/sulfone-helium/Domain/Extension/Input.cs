using sulfone_helium_domain.Core;

namespace sulfone_helium_domain.Extension;

// Server Inputs (Exposed as requests)
public record ExtensionAnswerInput(
    IAnswer[] Answers,
    Dictionary<string, string>[] DeterministicState,
    IAnswer[] PrevAnswers,
    Cyan Prev
);

public record ExtensionValidateInput(
    IAnswer[] Answers,
    Dictionary<string, string>[] DeterministicState,
    IAnswer[] PrevAnswers,
    Cyan Prev,
    string Validate
);