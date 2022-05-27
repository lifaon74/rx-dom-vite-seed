export abstract class KeyValueDatabase {
  abstract has(
    key: string,
  ): boolean;

  abstract get(
    key: string,
  ): any;

  abstract set(
    key: string,
    value: any,
  ): void;

  abstract remove(
    key: string,
  ): void;

  abstract clear(): void;

  abstract entries(): Iterable<[string, any]>;
}

export class LocalStorageKeyValueDatabase extends KeyValueDatabase {

  has(
    key: string,
  ): boolean {
    return localStorage.getItem(key) !== null;
  }

  get(
    key: string,
  ): any | null {
    const value: string | null = localStorage.getItem(key);
    return (value === null)
      ? null
      : JSON.parse(value);
  }

  set(
    key: string,
    value: any,
  ): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(
    key: string,
  ): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  * entries(): Generator<[string, any]> {
    for (let i = 0; i < localStorage.length; i++) {
      const key: string = localStorage.key(i) as string;
      yield [
        key,
        JSON.parse(localStorage.getItem(key) as string),
      ];
    }
  }
}

