using System.Text.Json.Serialization;
using Swashbuckle.AspNetCore.Annotations;

namespace sulfone_helium.Api.Core;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[SwaggerDiscriminator("type")]
[JsonDerivedType(typeof(StringAnswerRes), typeDiscriminator: "string")]
[SwaggerSubType(typeof(StringAnswerRes), DiscriminatorValue = "string")]
[JsonDerivedType(typeof(BoolAnswerRes), typeDiscriminator: "boolean")]
[SwaggerSubType(typeof(BoolAnswerRes), DiscriminatorValue = "boolean")]
[JsonDerivedType(typeof(StringArrayAnswerRes), typeDiscriminator: "str_array")]
[SwaggerSubType(typeof(StringArrayAnswerRes), DiscriminatorValue = "str_array")]
public abstract class AnswerRes
{
}

public class StringArrayAnswerRes : AnswerRes
{
    public required string[] Answer { get; set; }
}

public class StringAnswerRes : AnswerRes
{
    public required string Answer { get; set; }
}

public class BoolAnswerRes : AnswerRes
{
    public required bool Answer { get; set; }
}
