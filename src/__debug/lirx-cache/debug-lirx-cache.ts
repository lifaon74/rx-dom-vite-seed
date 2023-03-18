import {
  $log,
  createMulticastReplayLastSource,
  createUnicastSource,
  debug$$,
  defer,
  futureUnsubscribe,
  ICompleteNotification,
  IDefaultNotificationsUnion,
  IErrorNotification,
  IGenericNotification,
  IMulticastReplayLastSource,
  IObservable,
  IObserver,
  IUnsubscribe,
  mapObservable,
  pipeObservable,
  raceWithNotifications,
  shareObservablePipe,
  singleN,
  singleWithNotifications,
  switchMapObservable,
  thenObservablePipe,
  throwError,
  createMulticastReplaySource,
  createUnicastReplaySource,
  IObservablePipe,
  shareObservablePipeWithMulticastReplaySource,
  fulfilledObservablePipe, rejectedObservablePipe,
  sourceObservablePipe,
  cacheObservableWithNotifications,
  switchMap$$, timeout,
} from '@lirx/core';


/*----------------*/

function debugLiRXCache2() {
  let step: number = 0;

  const src$ = defer((): IObservable<IDefaultNotificationsUnion<string>> => {
    step++;
    if (step === 1) {
      return switchMap$$(timeout(500), () => singleN('step-1'));
    } else if (step === 2) {
      return throwError('step-2');
    } else {
      return singleN('step-3');
    }
  });
  const obs$ = debug$$(src$, 'src');
  // const reset$ = timeout(1000);

  const [cached$, reset] = cacheObservableWithNotifications(obs$);

  cached$($log);
  cached$($log);
  // reset();
  // console.log('reset');
  // cached$($log);
  // cached$($log);
  setTimeout(() => {
    reset();
    cached$($log);
    cached$($log);
  }, 1500);
}

/*----------------*/

export function debugLiRXCache() {
  // debugLiRXCache1();
  debugLiRXCache2();
}
