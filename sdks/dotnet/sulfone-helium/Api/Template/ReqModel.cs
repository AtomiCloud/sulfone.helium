using sulfone_helium.Api.Core;

namespace sulfone_helium.Api.Template;

public struct TemplateValidateReq
{
    public Dictionary<string, AnswerReq> Answers { get; set; }

    public Dictionary<string, string> DeterministicStates { get; set; }

    public string Validate { get; set; }
}

public struct TemplateAnswerReq
{
    public Dictionary<string, AnswerReq> Answers { get; set; }

    public Dictionary<string, string> DeterministicStates { get; set; }
}
