export interface IAsyncOptionsMapper<GInOptions extends object, GOutOptions extends object> {
  (
    options: GInOptions
  ): Promise<GOutOptions>;
}
