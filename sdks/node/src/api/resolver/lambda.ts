import type { ResolverInput } from '../../domain/resolver/input.js';
import type { ResolverOutput } from '../../domain/resolver/output.js';
import type { ICyanResolver } from '../../domain/core/cyan_script.js';

type LambdaResolverFn = (i: ResolverInput) => Promise<ResolverOutput>;

class LambdaResolver implements ICyanResolver {
  private readonly _f: LambdaResolverFn;

  constructor(f: LambdaResolverFn) {
    this._f = f;
  }

  resolve(i: ResolverInput): Promise<ResolverOutput> {
    return this._f(i);
  }
}

export type { LambdaResolverFn };
export { LambdaResolver };
