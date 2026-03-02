import type { ICyanResolver } from '../core/cyan_script.js';
import type { ResolverInput } from './input.js';
import type { ResolverOutput } from './output.js';

class ResolverService {
  private _resolver: ICyanResolver;

  constructor(resolver: ICyanResolver) {
    this._resolver = resolver;
  }

  async resolve(input: ResolverInput): Promise<ResolverOutput> {
    return await this._resolver.resolve(input);
  }
}

export { ResolverService };
