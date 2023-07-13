import { Abortable, AsyncTask, IAsyncTaskConstraint, IAsyncTaskFactory, IAsyncTaskInput } from '@lirx/async-task';
import { noop } from '@lirx/utils';

// export interface IAsyncTaskGeneratorFunction<GValue extends IAsyncTaskConstraint<GValue>, GReturn = any, GNext = unknown> {
//   (
//     abortable: () => Abortable,
//   ): AsyncGenerator<AsyncTask<GValue>, GReturn, GNext>;
// }

// export interface IAsyncTaskIterator<GValue extends IAsyncTaskConstraint<GValue>, GReturn = any, GNext = unknown> {
//   next(
//     abortable: Abortable,
//   ): AsyncTask<IteratorResult<GValue, GReturn>>;
//
//   // return?(value?: TReturn | PromiseLike<TReturn>): Promise<IteratorResult<T, TReturn>>;
//   // throw?(e?: any): Promise<IteratorResult<T, TReturn>>;
// }
//
// export interface IGetAbortableFunction {
//   (): Abortable;
// }
//
// export interface IAsyncTaskIteratorFunction<GValue extends IAsyncTaskConstraint<GValue>, GReturn = any, GNext = unknown> {
//   (
//     abortable: IGetAbortableFunction,
//   ): AsyncIterator<GValue, GReturn, GNext>;
// }
//
// export function abc<GValue extends IAsyncTaskConstraint<GValue>, GReturn = any, GNext = unknown>(
//   iteratorFunction: IAsyncTaskIteratorFunction<GValue, GReturn, GNext>,
// ): IAsyncTaskIterator<GValue, GReturn, GNext> {
//
//   let iterator!: AsyncIterator<GValue, GReturn, GNext>;
//   let abortable!: Abortable;
//
//   const getAbortable = () => abortable;
//
//   const next = (
//     _abortable: Abortable,
//   ): AsyncTask<IteratorResult<GValue, GReturn>> => {
//     abortable = _abortable;
//
//     if (iterator === void 0) {
//       iterator = iteratorFunction(getAbortable);
//     }
//
//     return iterator.next();
//   };
//
//   return {
//     next,
//   };
// }

/*---------*/

export interface IAsyncTaskGeneratorAwaitToken<GValue extends IAsyncTaskConstraint<GValue>> {
  type: 'await';
  factory: IAsyncTaskFactory<GValue>;
}

// export interface IAsyncTaskGeneratorAwaitFunction<GValue extends IAsyncTaskConstraint<GValue>> {
//   (
//     factory: IAsyncTaskFactory<GValue>,
//   ): IAsyncTaskGeneratorAwaitToken<GValue>;
// }

export function AWAIT<GValue extends IAsyncTaskConstraint<GValue>>(
  factory: IAsyncTaskFactory<GValue>,
): IAsyncTaskGeneratorAwaitToken<GValue> {
  return {
    type: 'await',
    factory,
  };
}

/*--*/

export interface IAsyncTaskGeneratorYieldToken<GValue extends IAsyncTaskConstraint<GValue>> {
  type: 'yield';
  factory: IAsyncTaskFactory<GValue>;
}

// export interface IAsyncTaskGeneratorYieldFunction<GValue extends IAsyncTaskConstraint<GValue>> {
//   (
//     factory: IAsyncTaskFactory<GValue>,
//   ): IAsyncTaskGeneratorYieldToken<GValue>
// }

export function YIELD<GValue extends IAsyncTaskConstraint<GValue>>(
  factory: IAsyncTaskFactory<GValue>,
): IAsyncTaskGeneratorYieldToken<GValue> {
  return {
    type: 'yield',
    factory,
  };
}

/*--*/

export type IAsyncTaskGeneratorValue<GValue extends IAsyncTaskConstraint<GValue>> =
  | IAsyncTaskGeneratorAwaitToken<any>
  | IAsyncTaskGeneratorYieldToken<GValue>
  ;

export type IAsyncTaskGenerator<GValue extends IAsyncTaskConstraint<GValue>> = Generator<IAsyncTaskGeneratorValue<GValue>, any, any>;


/*--*/

export interface IAsyncTaskIterator<GValue extends IAsyncTaskConstraint<GValue>> {
  next(
    abortable: Abortable,
  ): AsyncTask<IteratorResult<GValue>>;

  // return?(value?: TReturn | PromiseLike<TReturn>): Promise<IteratorResult<T, TReturn>>;
  // throw?(e?: any): Promise<IteratorResult<T, TReturn>>;
}

/*--*/

/*
INFO: if an async generator throws, the next promise throws, but not the following promises. The iterator is done if it throws.
 */

export function createAsyncTaskIterator<GValue extends IAsyncTaskConstraint<GValue>>(
  iterator: IAsyncTaskGenerator<GValue>,
): IAsyncTaskIterator<GValue> {
  let queue: AsyncTask<IteratorResult<GValue>> | undefined;
  let pendingIteratorResult: IteratorResult<IAsyncTaskGeneratorValue<GValue>> | undefined;

  const processIteratorResult = (
    result: IteratorResult<IAsyncTaskGeneratorValue<GValue>>,
    abortable: Abortable,
  ): AsyncTask<IteratorResult<GValue>> => {
    if (result.done) {
      return AsyncTask.success(result, abortable);
    } else {
      const { factory, type } = result.value;
      pendingIteratorResult = result;

      return AsyncTask.fromFactory(factory, abortable)
        .then(
          (value: unknown, abortable: Abortable): IteratorResult<GValue> | AsyncTask<IteratorResult<GValue>> => {
            pendingIteratorResult = void 0;
            switch (type) {
              case 'yield':
                return {
                  done: false,
                  value: value as GValue,
                };
              case 'await':
                return processIteratorResult(iterator.next(value), abortable);
              default:
                return AsyncTask.error(new Error(`Unknown type: ${result.value}`), abortable);
            }
          },
          (error: unknown): never => {
            iterator.throw(error);
            throw error;
          },
        );
    }
  };

  const _continue = (
    abortable: Abortable,
  ): AsyncTask<IteratorResult<GValue>> => {
    return processIteratorResult(
      (pendingIteratorResult === void 0)
        ? iterator.next()
        : pendingIteratorResult,
      abortable,
    );
  };

  const next = (
    abortable: Abortable,
  ): AsyncTask<IteratorResult<GValue>> => {
    return queue = (
      (queue === void 0)
        ? _continue(abortable)
        : (queue as AsyncTask<IteratorResult<GValue>>)
          .settled((_, abortable: Abortable): AsyncTask<IteratorResult<GValue>> => {
            return _continue(abortable);
          }, abortable)
    );
  };

  return {
    next,
  };
}
