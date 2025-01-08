using System.Text.Json;

namespace sulfone_helium.Domain;

public static class Utility
{
    public static string ToJson<T>(this T o)
    {
        return JsonSerializer.Serialize(o);
    }
}
