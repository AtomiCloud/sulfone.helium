import type { IDeterminism } from '../core/deterministic.js';

class StatelessDeterminism implements IDeterminism {
  constructor(readonly states: Record<string, string>) {}

  get(key: string, origin: () => string): string {
    if (!this.states) throw new Error('NullReferenceException: States dictionary is null');

    const state = this.states[key];
    if (state != null) {
      return state;
    }

    const val = origin();
    this.states[key] = val;
    return val;
  }
}

export { StatelessDeterminism };
