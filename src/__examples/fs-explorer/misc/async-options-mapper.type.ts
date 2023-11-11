import { AsyncTask, IAsyncTaskConstraint } from '@lirx/async-task';

export interface IAsyncOptionsMapper<GInOptions extends object, GOutOptions extends IAsyncTaskConstraint<GOutOptions, object>> {
  (
    options: GInOptions,
  ): AsyncTask<GOutOptions>;
}
