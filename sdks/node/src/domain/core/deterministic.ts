interface IDeterminism {
  get(key: string, origin: () => string): string;
}

export type { IDeterminism };
