import type { ICyanExtension } from '../../domain/core/cyan_script.js';
import type { IInquirer } from '../../domain/core/inquirer.js';
import type { IDeterminism } from '../../domain/core/deterministic.js';
import type { CyanExtensionInput } from '../../domain/core/cyan_script_model.js';
import type { Cyan } from '../../domain/core/cyan.js';

type LambdaExtensionFn = (inquirer: IInquirer, determinism: IDeterminism, prev: CyanExtensionInput) => Promise<Cyan>;

class LambdaExtension implements ICyanExtension {
  private readonly _f: LambdaExtensionFn;

  constructor(f: LambdaExtensionFn) {
    this._f = f;
  }

  async extension(inquirer: IInquirer, determinism: IDeterminism, prev: CyanExtensionInput): Promise<Cyan> {
    return this._f(inquirer, determinism, prev);
  }
}

export type { LambdaExtensionFn };
export { LambdaExtension };
