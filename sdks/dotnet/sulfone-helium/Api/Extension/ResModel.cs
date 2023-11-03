using System.Text.Json.Serialization;
using sulfone_helium.Api.Core;
using Swashbuckle.AspNetCore.Annotations;

namespace sulfone_helium.Api.Extension;

public struct ExtensionValidRes
{
    public string? Valid { get; set; }
}

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[SwaggerDiscriminator("type")]
[JsonDerivedType(typeof(ExtensionFinalRes), typeDiscriminator: "final")]
[SwaggerSubType(typeof(ExtensionFinalRes), DiscriminatorValue = "final")]
[JsonDerivedType(typeof(ExtensionQnARes), typeDiscriminator: "questionnaire")]
[SwaggerSubType(typeof(ExtensionQnARes), DiscriminatorValue = "questionnaire")]

public abstract class ExtensionRes
{
}

public class ExtensionFinalRes : ExtensionRes
{
    public CyanRes Cyan { get; set; }
}

public class ExtensionQnARes : ExtensionRes
{
    public required Dictionary<string, string>[] DeterministicState { get; set; }
    public required QuestionRes Question { get; set; }
}

