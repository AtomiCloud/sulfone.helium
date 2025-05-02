using sulfone_helium.Domain.Core;

namespace sulfone_helium.Api.Template;

public class LambdaTemplate(Func<IInquirer, IDeterminism, Task<Cyan>> f) : ICyanTemplate
{
    public Task<Cyan> Template(IInquirer inquirer, IDeterminism determinism)
    {
        return f(inquirer, determinism);
    }
}
