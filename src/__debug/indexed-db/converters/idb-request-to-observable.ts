import {
  createErrorNotification,
  createNextNotification,
  fromEventTarget,
  ICompleteNotification,
  IErrorNotification,
  INextNotification,
  IObservable,
  IObserver,
  IUnsubscribe,
  mergeUnsubscribeFunctions,
  noop,
  STATIC_COMPLETE_NOTIFICATION,
} from '@lirx/core';

export type IDBRequestObservableNotifications<GValue> =
  | INextNotification<GValue>
  | ICompleteNotification
  | IErrorNotification<DOMException>
  ;

export function idbRequestToObservable<GValue>(
  request: IDBRequest<GValue>,
): IObservable<IDBRequestObservableNotifications<GValue>> {
  return (emit: IObserver<IDBRequestObservableNotifications<GValue>>): IUnsubscribe => {

    let unsubscribe: IUnsubscribe | undefined;
    let running: boolean = true;

    const end = (): void => {
      if (unsubscribe !== void 0) {
        unsubscribe();
        unsubscribe = void 0;
      }
    };

    const onSuccess = (): void => {
      end();
      emit(createNextNotification(request.result));
      if (running) {
        emit(STATIC_COMPLETE_NOTIFICATION);
      }
    };

    const onError = (): void => {
      end();
      emit(createErrorNotification(request.error as DOMException));
    };

    if (request.readyState === 'done') {
      if (request.error === null) {
        onSuccess();
      } else {
        onError();
      }
      return noop;
    } else {
      unsubscribe = mergeUnsubscribeFunctions([
        fromEventTarget(request, 'success')(onSuccess),
        fromEventTarget(request, 'error')(onError),
      ]);

      return () => {
        if (running) {
          running = false;
          end();
        }
      };
    }
  };
}
