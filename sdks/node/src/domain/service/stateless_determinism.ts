import type { IDeterminism } from "../core/deterministic.js";

class StatelessDeterminism implements IDeterminism {
  public readonly states: Record<string, string>[]; // Use Record<string, string> for dictionary-like structure
  readonly #pointer: number;

  constructor(states: Record<string, string>[], pointer: number) {
    this.states = states;
    this.#pointer = pointer;
  }

  get(key: string, origin: () => string): string {
    const states = this.states[this.#pointer + 1];
    if (!states) {
      throw new Error("NullReferenceException");
    }
    const state = states[key];
    if (state != null) {
      return state;
    }
    const val = origin();
    states[key] = val;
    return val;
  }
}

export { StatelessDeterminism };
