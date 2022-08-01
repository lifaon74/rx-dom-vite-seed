import {
  $log,
  empty,
  fromPromiseFactory,
  fulfilled$$$,
  IDefaultNotificationsUnion,
  IObservable,
  pipe$$,
  switchMap$$$,
  thenAny$$$,
} from '@lirx/core';
import { IDBOpenRequestObservableNotifications, idbOpenRequestToObservable } from './converters/idb-open-request-to-observable';

export function getIndexedDB(): IDBFactory {
  return indexedDB;
}

export function listDatabases(): IObservable<IDefaultNotificationsUnion<IDBDatabaseInfo[]>> {
  return fromPromiseFactory((): Promise<IDBDatabaseInfo[]> => {
    return getIndexedDB().databases();
  });
}

export function openDatabase(
  name: string,
  version?: number,
): IObservable<IDBOpenRequestObservableNotifications> {
  return idbOpenRequestToObservable(
    getIndexedDB().open(name, version),
  );
}

export function deleteDatabase(
  name: string,
): IObservable<IDBOpenRequestObservableNotifications> {
  return idbOpenRequestToObservable(
    getIndexedDB().deleteDatabase(name),
  );
}

/*----*/

/*
https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#creating_or_updating_the_version_of_the_database
https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/open
 */

/*-------------------*/

export function debugIndexedDB(): void {
  const pipe$ = pipe$$(deleteDatabase('MyTestDatabase'), [
    thenAny$$$<IDBOpenRequestObservableNotifications, IDBOpenRequestObservableNotifications>(() => {
      return openDatabase('MyTestDatabase', 1);
    }),
    fulfilled$$$<IDBDatabase, void>((db: IDBDatabase): IObservable<void> => {
      console.log(db);

      // const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

      return empty();
    }),
  ]);

  pipe$($log);
}
