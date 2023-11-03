using sulfone_helium_domain.Core;
using sulfone_helium_domain.Core.Questions;

namespace sulfone_helium_domain.Extension;

public interface IExtensionOutput
{
}

public record ExtensionQnAOutput(
    Dictionary<string, string>[] DeterministicState,
    IQuestion Question
) : IExtensionOutput;

public record ExtensionFinalOutput(Cyan Data): IExtensionOutput;