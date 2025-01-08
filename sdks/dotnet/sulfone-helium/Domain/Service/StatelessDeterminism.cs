using System.Text.Json;
using sulfone_helium.Domain.Core;

namespace sulfone_helium.Domain.Service;

public class StatelessDeterminism : IDeterminism
{
    public Dictionary<string, string>[] States { get; }
    private readonly short _pointer;

    public StatelessDeterminism(Dictionary<string, string>[] states, ref short pointer)
    {
        States = states;
        _pointer = pointer;
    }

    public string Get(string key, Func<string> origin)
    {
        var states = this.States[this._pointer + 1];
        if (states == null)
            throw new NullReferenceException("");
        if (states.TryGetValue(key, out var state))
            return state;
        var val = origin();
        states.Add(key, val);
        Console.WriteLine(JsonSerializer.Serialize(this.States));
        return val;
    }
}
