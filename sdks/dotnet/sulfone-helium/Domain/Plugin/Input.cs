using Newtonsoft.Json.Linq;

namespace sulfone_helium_domain.Plugin;

public record PluginInput(
    string Directory,
    JObject Config
);