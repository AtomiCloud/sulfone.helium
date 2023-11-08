using Newtonsoft.Json.Linq;

namespace sulfone_helium.Domain.Plugin;

public record PluginInput(
    string Directory,
    JObject Config
);