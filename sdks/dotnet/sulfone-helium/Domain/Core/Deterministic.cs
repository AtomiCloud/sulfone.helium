namespace sulfone_helium.Domain.Core;

public interface IDeterminism
{
    string Get(string key, Func<string> origin);
}