using System.Text.Json.Serialization;
using Swashbuckle.AspNetCore.Annotations;

namespace sulfone_helium.Api.Core;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[SwaggerDiscriminator("type")]
[JsonDerivedType(typeof(ConfirmQuestionRes), typeDiscriminator: "confirm")]
[SwaggerSubType(typeof(ConfirmQuestionRes), DiscriminatorValue = "confirm")]
[JsonDerivedType(typeof(DateQuestionRes), typeDiscriminator: "date")]
[SwaggerSubType(typeof(DateQuestionRes), DiscriminatorValue = "date")]
[JsonDerivedType(typeof(CheckboxQuestionRes), typeDiscriminator: "checkbox")]
[SwaggerSubType(typeof(CheckboxQuestionRes), DiscriminatorValue = "checkbox")]
[JsonDerivedType(typeof(PasswordQuestionRes), typeDiscriminator: "password")]
[SwaggerSubType(typeof(PasswordQuestionRes), DiscriminatorValue = "password")]
[JsonDerivedType(typeof(TextQuestionRes), typeDiscriminator: "text")]
[SwaggerSubType(typeof(TextQuestionRes), DiscriminatorValue = "text")]
[JsonDerivedType(typeof(SelectQuestionRes), typeDiscriminator: "select")]
[SwaggerSubType(typeof(SelectQuestionRes), DiscriminatorValue = "select")]
public abstract class QuestionRes
{
    
}

public class ConfirmQuestionRes:QuestionRes
{
    public required string Message { get; set; }
    public string? Desc { get; set; }
    public string? Default { get; set; }
    public string? ErrorMessage { get; set; }
}

public class DateQuestionRes:QuestionRes
{
    public required string Message { get; set; }
    public string? Default { get; set; }
    public string? Desc { get; set; }
    public string? MinDate { get; set; }
    public string? MaxDate { get; set; }
}

public class CheckboxQuestionRes:QuestionRes
{
    public required string Message { get; set; }
    public string? Desc { get; set; }
    public required string[] Options { get; set; }
}

public class PasswordQuestionRes:QuestionRes
{
    public required string Message { get; set; }
    public string? Desc { get; set; }
    public bool? Confirmation { get; set; }
}

public class SelectQuestionRes:QuestionRes
{
    public required string Message { get; set; }
    public required string[] Options { get; set; }
    
    public string? Desc { get; set; }
}

public class TextQuestionRes:QuestionRes
{
    public required string Message { get; set;  }
    
    public string? Default { get; set;  }
    public string? Desc { get; set;  }
    public string? Initial { get; set;  }
}