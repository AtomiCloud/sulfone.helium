using Newtonsoft.Json.Linq;
using sulfone_helium_domain.Core;

namespace sulfone_helium_domain.Processor;

public record ProcessorInput(
    string ReadDirectory,
    string WriteDirectory,
    IEnumerable<CyanGlob> Globs,
    JObject Config
);