import {
  createMulticastReplayLastSource,
  IMulticastReplayLastSource,
  IObservable,
  IObserver, let$$,
  mapObservable,
  getObjectPropertyPathValue,
  getOptionalObjectPropertyPathValue,
} from '@lirx/core';
import { isIterable } from '@lirx/utils';

export type IObservableProxy<GData> = {
  [GKey in keyof GData]: IObservableProxy<GData[GKey]>;
} & {
  '$': IObservable<GData>;
  'iterable$': IObservable<readonly IObservableProxy<any>[]>;
};

export function createObservableProxy<GData extends object>(
  data: IObservable<GData>,
  path: PropertyKey[] = [],
): IObservableProxy<GData> {

  let cachedSubscribe: IObservable<any>;

  const cachedSourcesForArray: IObserver<any>[] = [];
  const cachedProxiesForArray: IObservableProxy<any>[] = [];

  let cachedSubscribeArray: IObservable<IObservableProxy<any>>;

  const cachedProxies = new Map<PropertyKey, IObservableProxy<any>>();

  return new Proxy<any>(Object.create(null), {
    get: (target: any, propertyKey: PropertyKey): any => {
      // console.log(propertyKey);
      if (propertyKey === '$') {
        if (cachedSubscribe === void 0) {
          // TODO share and distinct ?
          cachedSubscribe = mapObservable<GData, any>(data, (data: GData): any => {
            return getOptionalObjectPropertyPathValue<any>(data, path);
          });
        }
        return cachedSubscribe;
      } else if (propertyKey === 'iterable$') { // TODO continue here
        if (cachedSubscribeArray === void 0) {
          cachedSubscribeArray = mapObservable<GData, any>(data, (data: GData): any => {
            const iterable: any = getObjectPropertyPathValue<any>(data, path);
            if (isIterable(iterable)) {
              const it = function *() {
                const iterator: Iterator<any> = iterable[Symbol.iterator]();
                let result: IteratorResult<any>;
                while (!(result = iterator.next()).done) {
                  yield createObservableProxy<any>(result.value);
                }
              };

              // const itemsLength: number = items.length;
              // const cachedProxiesForArrayLength: number = cachedProxiesForArray.length;
              //
              // if (cachedProxiesForArrayLength < itemsLength) {
              //   cachedSourcesForArray.length = itemsLength;
              //   cachedProxiesForArray.length = itemsLength;
              //   for (let i = cachedProxiesForArrayLength; i < itemsLength; i++) {
              //     const source: IMulticastReplayLastSource<any> = createMulticastReplayLastSource<any>(items[i]);
              //     cachedSourcesForArray[i] = source.emit;
              //     cachedProxiesForArray[i] = createObservableProxy<any>(source.subscribe);
              //   }
              // }
              //
              // for (let i = 0; i < itemsLength; i++) {
              //   cachedSourcesForArray[i](items[i]);
              // }
              //
              // return cachedProxiesForArray;
            } else {
              throw new Error(`Not an iterable`);
            }
          });
        }
        return cachedSubscribeArray;
      } else {
        let cachedProxy: IObservableProxy<any> | undefined = cachedProxies.get(propertyKey);
        if (cachedProxy === void 0) {
          cachedProxy = createObservableProxy(data, path.concat(propertyKey));
          cachedProxies.set(propertyKey, cachedProxy);
        }
        return cachedProxy;
      }
    },
    set: (): never => {
      throw new Error(`The proxy is readonly`);
    },
  });
}

/*------------------------*/

export function debugObservableProxy(): void {
  const data = {
    a: 'a-1',
    b: {
      c: 'b-c',
      d: 5,
    },
  };

  const [$data, data$, getData] = let$$(data);

  const proxy = createObservableProxy(data$);


}
