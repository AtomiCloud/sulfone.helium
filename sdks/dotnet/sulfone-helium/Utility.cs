using System.Dynamic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace sulfone_helium;

public static class Utility
{
    public static dynamic ToDynamic(this ExpandoObject d)
    {
        var json = System.Text.Json.JsonSerializer.Serialize(d);
        return JObject.Parse(json);
    }
    public static ExpandoObject ToDynamic(dynamic d)
    {
        var json = JsonConvert.SerializeObject(d);
        return JsonConvert.DeserializeObject<ExpandoObject>(json) ?? throw new InvalidOperationException();
    }

    
}