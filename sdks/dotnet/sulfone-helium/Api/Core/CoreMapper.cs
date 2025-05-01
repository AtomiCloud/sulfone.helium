using System.Globalization;
using sulfone_helium.Domain.Core;
using sulfone_helium.Domain.Core.Questions;

namespace sulfone_helium.Api.Core;

public static class CyanMapper
{
    public static CyanPlugin ToDomain(this CyanPluginReq req)
    {
        return new CyanPlugin { Name = req.Name, Config = req.Config.ToDynamic() };
    }

    public static CyanGlob ToDomain(this CyanGlobReq req)
    {
        return new CyanGlob
        {
            Root = req.Root,
            Glob = req.Glob,
            Exclude = req.Exclude,
            Type = req.Type switch
            {
                "template" => GlobType.Template,
                "copy" => GlobType.Copy,
                _ => throw new ArgumentOutOfRangeException(nameof(req.Type), req.Type, null),
            },
        };
    }

    public static CyanProcessor ToDomain(this CyanProcessorReq req)
    {
        return new CyanProcessor
        {
            Name = req.Name,
            Config = req.Config.ToDynamic(),
            Files = req.Files.Select(x => x.ToDomain()).ToArray(),
        };
    }

    public static Cyan ToDomain(this CyanReq req)
    {
        return new Cyan
        {
            Processors = req.Processors.Select(x => x.ToDomain()).ToArray(),
            Plugins = req.Plugins.Select(x => x.ToDomain()).ToArray(),
        };
    }

    public static CyanRes ToResp(this Cyan data)
    {
        return new CyanRes
        {
            Processors = data.Processors.Select(x => x.ToResp()).ToArray(),
            Plugins = data.Plugins.Select(x => x.ToResp()).ToArray(),
        };
    }

    public static CyanProcessorRes ToResp(this CyanProcessor data)
    {
        return new CyanProcessorRes()
        {
            Name = data.Name,
            Config = Utility.ToDynamic(data.Config),
            Files = data.Files.Select(x => x.ToResp()).ToArray(),
        };
    }

    public static CyanPluginRes ToResp(this CyanPlugin data)
    {
        return new CyanPluginRes() { Name = data.Name, Config = Utility.ToDynamic(data.Config) };
    }

    public static string ToResp(this GlobType type)
    {
        return type switch
        {
            GlobType.Template => "template",
            GlobType.Copy => "copy",
            _ => throw new ArgumentOutOfRangeException(nameof(type), type, null),
        };
    }

    public static CyanGlobRes ToResp(this CyanGlob data)
    {
        return new CyanGlobRes()
        {
            Root = data.Root,
            Glob = data.Glob,
            Exclude = data.Exclude,
            Type = data.Type.ToResp(),
        };
    }
}

public static class QuestionMapper
{
    public static QuestionRes ToResp(this IQuestion q)
    {
        return q switch
        {
            CheckboxQ checkbox => checkbox.ToResp(),
            ConfirmQ confirm => confirm.ToResp(),
            DateQ date => date.ToResp(),
            PasswordQ password => password.ToResp(),
            SelectQ select => select.ToResp(),
            TextQ text => text.ToResp(),
            _ => throw new ArgumentOutOfRangeException(nameof(q)),
        };
    }

    public static ConfirmQuestionRes ToResp(this ConfirmQ q)
    {
        return new ConfirmQuestionRes()
        {
            Default = q.Default,
            Message = q.Message,
            Id = q.Id,
            ErrorMessage = q.ErrorMessage,
            Desc = q.Desc,
        };
    }

    public static CheckboxQuestionRes ToResp(this CheckboxQ q)
    {
        return new CheckboxQuestionRes()
        {
            Message = q.Message,
            Id = q.Id,
            Desc = q.Desc,
            Options = q.Options,
        };
    }

    public static SelectQuestionRes ToResp(this SelectQ q)
    {
        return new SelectQuestionRes()
        {
            Message = q.Message,
            Id = q.Id,
            Desc = q.Desc,
            Options = q.Options,
        };
    }

    public static TextQuestionRes ToResp(this TextQ q)
    {
        return new TextQuestionRes()
        {
            Message = q.Message,
            Id = q.Id,
            Desc = q.Desc,
            Default = q.Default,
            Initial = q.Initial,
        };
    }

    public static PasswordQuestionRes ToResp(this PasswordQ q)
    {
        return new PasswordQuestionRes()
        {
            Message = q.Message,
            Id = q.Id,
            Desc = q.Desc,
            Confirmation = q.Confirmation,
        };
    }

    public static DateQuestionRes ToResp(this DateQ q)
    {
        return new DateQuestionRes()
        {
            Message = q.Message,
            Id = q.Id,
            Desc = q.Desc,
            Default = q.Default?.ToString("o", CultureInfo.InvariantCulture),
            MaxDate = q.MaxDate?.ToString("o", CultureInfo.InvariantCulture),
            MinDate = q.MinDate?.ToString("o", CultureInfo.InvariantCulture),
        };
    }
}

public static class AnswerMapper
{
    public static IAnswer ToDomain(this AnswerReq req)
    {
        return req switch
        {
            BoolAnswerReq boolAnswer => new BoolAnswer(boolAnswer.Answer),
            StringAnswerReq stringAnswer => new StringAnswer(stringAnswer.Answer),
            StringArrayAnswerReq stringArrayAnswer => new StringArrayAnswer(
                stringArrayAnswer.Answer
            ),
            _ => throw new ArgumentOutOfRangeException(nameof(req)),
        };
    }

    public static AnswerRes ToResp(this IAnswer answer)
    {
        return answer switch
        {
            BoolAnswer boolAnswer => new BoolAnswerRes() { Answer = boolAnswer.Answer },
            StringAnswer stringAnswer => new StringAnswerRes() { Answer = stringAnswer.Answer },
            StringArrayAnswer stringArrayAnswer => new StringArrayAnswerRes()
            {
                Answer = stringArrayAnswer.Answer,
            },
            _ => throw new ArgumentOutOfRangeException(nameof(answer)),
        };
    }
}
