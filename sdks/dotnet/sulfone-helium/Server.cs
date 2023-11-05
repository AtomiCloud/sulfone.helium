using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using sulfone_helium_domain.Core;
using sulfone_helium_domain.Core.FileSystem;
using sulfone_helium_domain.Extension;
using sulfone_helium_domain.Plugin;
using sulfone_helium_domain.Processor;
using sulfone_helium_domain.Template;
using sulfone_helium.Api.Extension;
using sulfone_helium.Api.Plugin;
using sulfone_helium.Api.Processor;
using sulfone_helium.Api.Template;

namespace sulfone_helium;


public struct StatusMessage
{
    public string Message { get; set; }
    public string Status { get; set; }
}

public static class CyanEngine
{
    public static void StartPlugin(string[] args, ICyanPlugin plugin)
    {
        var builder = WebApplication.CreateBuilder(args);

        var p = new PluginService { Plugin = plugin };

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
            c.EnableAnnotations(enableAnnotationsForInheritance: true, enableAnnotationsForPolymorphism: true));


        var app = builder.Build();


        app.UseSwagger();
        app.UseSwaggerUI();


        app.MapGet("/", StatusMessage () => new StatusMessage{Status = "OK", Message = "OK"});
        
        app.MapPost("/api/plug", async Task<PluginRes> (PluginReq req) =>
        {
            var resp = await p.Plug(req.ToDomain());
            return resp.ToRes();
        });
        app.Run();
    }

    public static void StartPlugin(string[] args, Func<CyanPluginInput, Task<PluginOutput>> f)
    {
        var lambda = new LambdaPlugin(f);
        StartPlugin(args, lambda);
    }

    public static void StartProcessor(string[] args, ICyanProcessor processor)
    {
        var builder = WebApplication.CreateBuilder(args);

        var p = new ProcessorService { Processor = processor };

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
            c.EnableAnnotations(enableAnnotationsForInheritance: true, enableAnnotationsForPolymorphism: true));


        var app = builder.Build();


        app.UseSwagger();
        app.UseSwaggerUI();

        app.MapGet("/", StatusMessage () => new StatusMessage{Status = "OK", Message = "OK"});
        app.MapPost("/api/process", async Task<ProcessorRes> (ProcessorReq req) =>
        {
            var resp = await p.Process(req.ToDomain());
            return resp.ToRes();
        });
        app.Run();
    }

    public static void StartProcessor(string[] args, Func<CyanProcessorInput, CyanFileHelper, Task<ProcessorOutput>> f)
    {
        var lambda = new LambdaProcessor(f);
        StartProcessor(args, lambda);
    }

    public static void StartTemplate(string[] args, ICyanTemplate template)
    {
        var builder = WebApplication.CreateBuilder(args);

        var h = new TemplateService(template);

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
            c.EnableAnnotations(enableAnnotationsForInheritance: true, enableAnnotationsForPolymorphism: true));


        var app = builder.Build();


        app.UseSwagger();
        app.UseSwaggerUI();

        app.MapGet("/", StatusMessage () => new StatusMessage{Status = "OK", Message = "OK"});
        app.MapPost("/api/template/init", async Task<TemplateRes> (TemplateAnswerReq answers) =>
        {
            var resp = await h.Template(answers.ToDomain());
            return resp.ToResp();
        });

        app.MapPost("/api/template/validate", async Task<TemplateValidRes> (TemplateValidateReq req) =>
        {
            var a = await h.Validate(req.ToDomain());
            return new TemplateValidRes()
            {
                Valid = a,
            };
        });
        app.Run();
    }

    public static void StartTemplate(string[] args, Func<IInquirer, IDeterminism, Task<Cyan>> f)
    {
        var lambda = new LambdaTemplate(f);
        StartTemplate(args, lambda);
    }

    public static void StartExtension(string[] args, ICyanExtension ext)
    {
        var builder = WebApplication.CreateBuilder(args);
        var h = new ExtensionService { Ext = ext };

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
            c.EnableAnnotations(enableAnnotationsForInheritance: true, enableAnnotationsForPolymorphism: true));
        var app = builder.Build();


        app.UseSwagger();
        app.UseSwaggerUI();

        app.MapGet("/", StatusMessage () => new StatusMessage{Status = "OK", Message = "OK"});
        
        app.MapPost("/api/extension/init", async Task<ExtensionRes> (ExtensionAnswerReq answers) =>
        {
            var resp = await h.Extend(answers.ToDomain());
            return resp.ToResp();
        });

        app.MapPost("/api/extension/validate", async Task<ExtensionValidRes> (ExtensionValidateReq req) =>
        {
            var a = await h.Validate(req.ToDomain());
            return new ExtensionValidRes()
            {
                Valid = a,
            };
        });
        app.Run();
    }

    public static void StartExtension(string[] args, Func<IInquirer, IDeterminism, CyanExtensionInput, Task<Cyan>> f)
    {
        StartExtension(args, new LambdaExtension(f));
    }
}