using Newtonsoft.Json.Linq;
using sulfone_helium;
using sulfone_helium_domain.Core;
using sulfone_helium_domain.Core.Questions;

CyanEngine.StartExtension(args, async Task<Cyan> (inquirer, determinism, input) =>
{
    var cont = await inquirer.Confirm("Reached extension. Do you want to extend?");
    if (!cont)
    {
        return new Cyan
        {
            Processors = Array.Empty<CyanProcessor>(),
            Plugins = Array.Empty<CyanPlugin>(),
        };
    }

    var p = input.Prev.Processors.ToArray();
    if (p.Length > 0 && p[0].Name == "default")
    {
        var c = (JObject) p[0].Config;
        if (c?["Variables"]?["bestlang"] != null)
        {
            var unknown = c["Variables"]!["bestlang"]!;
            
            if (unknown.Type == JTokenType.Integer)
            {
                var bl = (int)unknown;
                var a = await inquirer.Text($"Oh you like rust? ID: {bl}");
                return new Cyan
                {
                    Processors = new CyanProcessor[]
                    {
                        new()
                        {
                            Name = "default",
                            Config = new
                            {
                                Variables = new
                                {
                                    a,
                                }
                            },
                            Files = Array.Empty<CyanGlob>()
                        }
                    },
                    Plugins = Array.Empty<CyanPlugin>()
                };
            }
            else
            {
                var bestlang = (string) c["Variables"]["bestlang"];
                var deposit = await inquirer.Text(new TextQ()
                {
                    Message = $"Since you like {bestlang} How much to deposit",
                    Validate = v => int.TryParse(v, out var _) ? null : "Must be a number",
                });
                return new Cyan
                {
                    Processors = new CyanProcessor[]
                    {
                        new()
                        {
                            Name = "default",
                            Config = new
                            {
                                Variables = new
                                {
                                    deposit,
                                }
                            },
                            Files = Array.Empty<CyanGlob>()
                        }
                    },
                    Plugins = Array.Empty<CyanPlugin>()
                };
            }
            
            
        }
    }

    return new Cyan
    {
        Processors = new CyanProcessor[]
        {
            new()
            {
                Name = "default",
                Config = new
                {
                    Variables = new
                    {
                    }
                },
                Files = Array.Empty<CyanGlob>()
            }
        },
        Plugins = Array.Empty<CyanPlugin>()
    };
});