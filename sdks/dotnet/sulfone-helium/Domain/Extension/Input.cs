using sulfone_helium.Domain.Core;

namespace sulfone_helium.Domain.Extension;

// Server Inputs (Exposed as requests)
public record ExtensionAnswerInput(
    IAnswer[] Answers,
    Dictionary<string, string>[] DeterministicState,
    IAnswer[] PrevAnswers,
    Cyan PrevCyan,
    Dictionary<string, IEnumerable<IAnswer>> PrevExtensionAnswers,
    Dictionary<string, Cyan> PrevExtensionCyans
);

public record ExtensionValidateInput(
    IAnswer[] Answers,
    Dictionary<string, string>[] DeterministicState,
    IAnswer[] PrevAnswers,
    Cyan PrevCyan,
    Dictionary<string, IEnumerable<IAnswer>> PrevExtensionAnswers,
    Dictionary<string, Cyan> PrevExtensionCyans,
    string Validate
);
