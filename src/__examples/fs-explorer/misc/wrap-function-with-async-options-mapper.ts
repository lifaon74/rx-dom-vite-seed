import { IAsyncOptionsMapper } from './async-options-mapper.type';
import { AsyncTask, IAsyncTaskConstraint, IAsyncTaskOnSuccessfulFunction } from '@lirx/async-task';

export function wrapFunctionWithAsyncOptionsMapper<//
  GInOptions extends IAsyncTaskConstraint<GInOptions, object>,
  GOutOptions extends IAsyncTaskConstraint<GOutOptions, object>,
  GReturn extends IAsyncTaskConstraint<GReturn>
  //
>(
  fnc: IAsyncTaskOnSuccessfulFunction<GOutOptions, GReturn>,
  mapper: IAsyncOptionsMapper<GInOptions, GOutOptions>,
): (options: GInOptions) => AsyncTask<GReturn> {
  return (options: GInOptions): AsyncTask<GReturn> => {
    return mapper(options).successful(fnc);
  };
}
