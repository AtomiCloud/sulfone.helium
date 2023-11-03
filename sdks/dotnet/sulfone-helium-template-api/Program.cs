using sulfone_helium;
using sulfone_helium_domain.Core;
using sulfone_helium_domain.Core.Questions;

CyanEngine.StartTemplate(args, async Task<Cyan> (inquirer, determinism) =>
{
    var name = await inquirer.Text("What is your name?");
    return new Cyan
    {
        Processors = new CyanProcessor[]
        {
            new()
            {
                Name = "hello",
                Files = new []
                {
                    new CyanGlob
                    {
                        Glob = "**/*.*",
                        Exclude = new string[]
                        {
                            
                        },
                        Type = GlobType.Template
                    }
                },
                Config = null
            }
        },
        Plugins = new List<CyanPlugin>(),
    };

});