using sulfone_helium.Api.Core;

namespace sulfone_helium.Api.Extension;

public struct ExtensionValidateReq
{
    public AnswerReq[] Answers { get; set; }

    public Dictionary<string, string>[] DeterministicStates { get; set; }

    public AnswerReq[] PrevAnswers { get; set; }

    public CyanReq PrevCyan { get; set; }

    public string Validate { get; set; }
}

public struct ExtensionAnswerReq
{
    public AnswerReq[] Answers { get; set; }

    public Dictionary<string, string>[] DeterministicStates { get; set; }
    
    public AnswerReq[] PrevAnswers { get; set; }

    public CyanReq PrevCyan { get; set; }
}