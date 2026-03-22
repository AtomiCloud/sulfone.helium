using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using sulfone_helium.Api.Plugin;
using sulfone_helium.Api.Processor;
using sulfone_helium.Api.Resolver;
using sulfone_helium.Api.Template;
using sulfone_helium.Domain;
using sulfone_helium.Domain.Core;
using sulfone_helium.Domain.Core.FileSystem;
using sulfone_helium.Domain.Plugin;
using sulfone_helium.Domain.Processor;
using sulfone_helium.Domain.Resolver;
using sulfone_helium.Domain.Template;

namespace sulfone_helium;

public struct StatusMessage
{
    [JsonPropertyName("Status")]
    public string Status { get; set; }

    [JsonPropertyName("Message")]
    public string Message { get; set; }
}

public static class CyanEngine
{
    public static void StartPlugin(string[] args, ICyanPlugin plugin)
    {
        var builder = WebApplication.CreateBuilder(args);

        var p = new PluginService { Plugin = plugin };

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
            c.EnableAnnotations(
                enableAnnotationsForInheritance: true,
                enableAnnotationsForPolymorphism: true
            )
        );

        var app = builder.Build();

        app.UseSwagger();
        app.UseSwaggerUI();

        app.MapGet("/", StatusMessage () => new StatusMessage { Status = "OK", Message = "OK" });

        app.MapPost(
            "/api/plug",
            async Task<PluginRes> (PluginReq req) =>
            {
                var resp = await p.Plug(req.ToDomain());
                return resp.ToRes();
            }
        );
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
            c.EnableAnnotations(
                enableAnnotationsForInheritance: true,
                enableAnnotationsForPolymorphism: true
            )
        );

        var app = builder.Build();

        app.UseSwagger();
        app.UseSwaggerUI();

        app.MapGet("/", StatusMessage () => new StatusMessage { Status = "OK", Message = "OK" });
        app.MapPost(
            "/api/process",
            async Task<ProcessorRes> (ProcessorReq req) =>
            {
                try
                {
                    Console.WriteLine("Received Request: {0}", req.ToJson());
                    var resp = await p.Process(req.ToDomain());
                    return resp.ToRes();
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine("Processor error: {0}", ex);
                    throw;
                }
            }
        );
        app.Run();
    }

    public static void StartProcessor(
        string[] args,
        Func<CyanProcessorInput, CyanFileHelper, Task<ProcessorOutput>> f
    )
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
            c.EnableAnnotations(
                enableAnnotationsForInheritance: true,
                enableAnnotationsForPolymorphism: true
            )
        );

        var app = builder.Build();

        app.UseSwagger();
        app.UseSwaggerUI();

        app.MapGet("/", StatusMessage () => new StatusMessage { Status = "OK", Message = "OK" });
        app.MapPost(
            "/api/template/init",
            async Task<TemplateRes> (TemplateAnswerReq answers) =>
            {
                var resp = await h.Template(answers.ToDomain());
                return resp.ToResp();
            }
        );

        app.MapPost(
            "/api/template/validate",
            async Task<TemplateValidRes> (TemplateValidateReq req) =>
            {
                var a = await h.Validate(req.ToDomain());
                return new TemplateValidRes { Valid = a };
            }
        );
        app.Run();
    }

    public static void StartTemplate(string[] args, Func<IInquirer, IDeterminism, Task<Cyan>> f)
    {
        var lambda = new LambdaTemplate(f);
        StartTemplate(args, lambda);
    }

    public static void StartResolver(string[] args, ICyanResolver resolver)
    {
        var builder = WebApplication.CreateBuilder(args);

        var p = new ResolverService { Resolver = resolver };

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
            c.EnableAnnotations(
                enableAnnotationsForInheritance: true,
                enableAnnotationsForPolymorphism: true
            )
        );

        var app = builder.Build();

        app.UseSwagger();
        app.UseSwaggerUI();

        app.MapGet("/", StatusMessage () => new StatusMessage { Status = "OK", Message = "OK" });
        app.MapPost(
            "/api/resolve",
            async Task<ResolverRes> (ResolverReq req) =>
            {
                var resp = await p.Resolve(req.ToDomain());
                return resp.ToRes();
            }
        );
        app.Run("http://0.0.0.0:5553");
    }

    public static void StartResolver(string[] args, Func<ResolverInput, Task<ResolverOutput>> f)
    {
        var lambda = new LambdaResolver(f);
        StartResolver(args, lambda);
    }
}
