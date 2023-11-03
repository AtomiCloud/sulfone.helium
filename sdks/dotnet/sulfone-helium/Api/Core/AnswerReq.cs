using System.Text.Json.Serialization;
using Swashbuckle.AspNetCore.Annotations;

namespace sulfone_helium.Api.Core;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[SwaggerDiscriminator("type")]
[JsonDerivedType(typeof(StringAnswerReq), typeDiscriminator: "string")]
[SwaggerSubType(typeof(StringAnswerReq), DiscriminatorValue = "string")]
[JsonDerivedType(typeof(BoolAnswerReq), typeDiscriminator: "boolean")]
[SwaggerSubType(typeof(BoolAnswerReq), DiscriminatorValue = "boolean")]
[JsonDerivedType(typeof(StringArrayAnswerReq), typeDiscriminator: "str_array")]
[SwaggerSubType(typeof(StringArrayAnswerReq), DiscriminatorValue = "str_array")]
public abstract class AnswerReq
{
}

public class StringArrayAnswerReq : AnswerReq
{
    public required string[] Answer { get; set; }
}

public class StringAnswerReq : AnswerReq
{
    public required string Answer { get; set; }
}

public class BoolAnswerReq : AnswerReq
{
    public required bool Answer { get; set; }
}
