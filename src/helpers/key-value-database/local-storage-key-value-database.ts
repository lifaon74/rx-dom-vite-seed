import { KeyValueDatabase } from './key-value-database';

export class LocalStorageKeyValueDatabase<GValue> extends KeyValueDatabase<GValue> {
  has(
    key: string,
  ): boolean {
    return localStorage.getItem(key) !== null;
  }

  get(
    key: string,
  ): GValue | null {
    const value: string | null = localStorage.getItem(key);
    return (value === null)
      ? null
      : JSON.parse(value);
  }

  set(
    key: string,
    value: GValue,
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

  * entries(): Generator<[string, GValue]> {
    for (let i = 0; i < localStorage.length; i++) {
      const key: string = localStorage.key(i) as string;
      yield [
        key,
        JSON.parse(localStorage.getItem(key) as string),
      ];
    }
  }
}

export const SHARED_LOCAL_STORAGE_KEY_VALUE_DATABASE = new LocalStorageKeyValueDatabase<any>();
