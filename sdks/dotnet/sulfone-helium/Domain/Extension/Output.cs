using sulfone_helium.Domain.Core;
using sulfone_helium.Domain.Core.Questions;

namespace sulfone_helium.Domain.Extension;

public interface IExtensionOutput { }

public record ExtensionQnAOutput(
    Dictionary<string, string>[] DeterministicState,
    IQuestion Question
) : IExtensionOutput;

public record ExtensionFinalOutput(Cyan Data) : IExtensionOutput;
