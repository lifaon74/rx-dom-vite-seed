import { fromEventTarget, INotification, IObservable, map$$, merge } from '@lirx/core';
import { IDBRequestObservableNotifications, idbRequestToObservable } from './idb-request-to-observable';

export type IDBOpenRequestObservableNotifications =
  | IDBRequestObservableNotifications<IDBDatabase>
  | INotification<'blocked', Event>
  | INotification<'upgradeneeded', IDBVersionChangeEvent>
  ;

export function idbOpenRequestToObservable(
  request: IDBOpenDBRequest,
): IObservable<IDBOpenRequestObservableNotifications> {
  return merge([
    idbRequestToObservable<IDBDatabase>(request),
    map$$(
      fromEventTarget(request, 'blocked'),
      (value: Event): INotification<'blocked', Event> => ({ name: 'blocked', value }),
    ),
    map$$(
      fromEventTarget<'upgradeneeded', IDBVersionChangeEvent>(request, 'upgradeneeded'),
      (value: IDBVersionChangeEvent): INotification<'upgradeneeded', IDBVersionChangeEvent> => ({ name: 'upgradeneeded', value }),
    ),
  ]);
}
