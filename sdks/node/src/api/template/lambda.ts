import type { IInquirer } from "../../domain/core/inquirer.js";
import type { IDeterminism } from "../../domain/core/deterministic.js";
import type { Cyan } from "../../domain/core/cyan.js";
import type { ICyanTemplate } from "../../domain/core/cyan_script.js";

type LambdaTemplateFn = (
  inquirer: IInquirer,
  determinism: IDeterminism,
) => Promise<Cyan>;

class LambdaTemplate implements ICyanTemplate {
  private readonly _f: LambdaTemplateFn;

  constructor(f: LambdaTemplateFn) {
    this._f = f;
  }

  template(inquirer: IInquirer, determinism: IDeterminism): Promise<Cyan> {
    return this._f(inquirer, determinism);
  }
}

export type { LambdaTemplateFn };
export { LambdaTemplate };
