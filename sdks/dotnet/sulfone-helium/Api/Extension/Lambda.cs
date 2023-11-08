using sulfone_helium.Domain.Core;

namespace sulfone_helium.Api.Extension;

public class LambdaExtension : ICyanExtension
{
    private readonly Func<IInquirer, IDeterminism, CyanExtensionInput, Task<Cyan>> _f;

    public LambdaExtension(Func<IInquirer, IDeterminism, CyanExtensionInput, Task<Cyan>> f)
    {
        _f = f;
    }
    
    public Task<Cyan> Extension(IInquirer inquirer, IDeterminism determinism, CyanExtensionInput prev)
    {
        return this._f(inquirer, determinism, prev);
    }
}