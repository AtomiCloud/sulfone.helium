using System.Text.Json;
using sulfone_helium.Domain.Core;

namespace sulfone_helium.Domain.Service;

public class StatelessDeterminism(Dictionary<string, string> states) : IDeterminism
{
    public Dictionary<string, string> States { get; } = states;

    public string Get(string key, Func<string> origin)
    {
        if (States == null)
            throw new NullReferenceException("States dictionary is null");

        if (States.TryGetValue(key, out var state))
            return state;

        var val = origin();
        States[key] = val;
        Console.WriteLine(JsonSerializer.Serialize(States));
        return val;
    }
}
