using Newtonsoft.Json.Linq;
using sulfone_helium.Domain.Core;

namespace sulfone_helium.Domain.Processor;

public record ProcessorInput(
    string ReadDirectory,
    string WriteDirectory,
    IEnumerable<CyanGlob> Globs,
    JObject Config
);
