namespace sulfone_helium_domain.Core;

public interface IDeterminism
{
    string Get(string key, Func<string> origin);
}