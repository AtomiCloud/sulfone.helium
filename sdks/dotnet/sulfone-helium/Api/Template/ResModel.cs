using System.Text.Json.Serialization;
using sulfone_helium.Api.Core;
using Swashbuckle.AspNetCore.Annotations;

namespace sulfone_helium.Api.Template;

public struct TemplateValidRes
{
    public string? Valid { get; set; }
}

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[SwaggerDiscriminator("type")]
[JsonDerivedType(typeof(TemplateFinalRes), typeDiscriminator: "final")]
[SwaggerSubType(typeof(TemplateFinalRes), DiscriminatorValue = "final")]
[JsonDerivedType(typeof(TemplateQnARes), typeDiscriminator: "questionnaire")]
[SwaggerSubType(typeof(TemplateQnARes), DiscriminatorValue = "questionnaire")]

public abstract class TemplateRes
{
}

public class TemplateFinalRes : TemplateRes
{
    public CyanRes Cyan { get; set; }
}

public class TemplateQnARes : TemplateRes
{
    public required Dictionary<string, string>[] DeterministicState { get; set; }
    public required QuestionRes Question { get; set; }
}

