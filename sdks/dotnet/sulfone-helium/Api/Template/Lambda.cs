using sulfone_helium_domain.Core;

namespace sulfone_helium.Api.Template;

public class LambdaTemplate : ICyanTemplate
{
    private readonly Func<IInquirer, IDeterminism, Task<Cyan>> _f;

    public LambdaTemplate(Func<IInquirer, IDeterminism, Task<Cyan>> f)
    {
        this._f = f;
    }

    public Task<Cyan> Template(IInquirer inquirer, IDeterminism determinism)
    {
        return this._f(inquirer, determinism);
    }
}