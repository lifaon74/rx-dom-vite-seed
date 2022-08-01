export abstract class KeyValueDatabase<GValue> {
  abstract has(
    key: string,
  ): boolean;

  abstract get(
    key: string,
  ): any;

  abstract set(
    key: string,
    value: GValue,
  ): void;

  abstract remove(
    key: string,
  ): void;

  abstract clear(): void;

  abstract entries(): Iterable<[string, GValue]>;
}

