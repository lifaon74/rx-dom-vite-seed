import { IAsyncOptionsMapper } from './async-options-mapper.type';

export function wrapFunctionWithAsyncOptionsMapper<GInOptions extends object, GOutOptions extends object, GReturn>(
  fnc: (options: GOutOptions) => (GReturn | Promise<GReturn>),
  mapper: IAsyncOptionsMapper<GInOptions, GOutOptions>,
): (options: GInOptions) => Promise<GReturn> {
  return (options: GInOptions): Promise<GReturn> => {
    return mapper(options).then(fnc);
  };
}
