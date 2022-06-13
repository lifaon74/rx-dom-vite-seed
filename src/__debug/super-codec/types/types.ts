export const COMPLETE = Symbol('COMPLETE');
export type IComplete = typeof COMPLETE;

export type IEncoderReturn<GOut> = GOut | IComplete;

export interface IEncoder<GOut> {
  (): GOut | IComplete;
}

export interface IEncode<GIn, GOut> {
  (
    value: GIn,
  ): IEncoder<GOut>;
}


export const COMPLETE_ENCODER: IEncoder<any> = () => COMPLETE;

/*--------*/

export const INCOMPLETE = Symbol('INCOMPLETE');
export type IIncomplete = typeof INCOMPLETE;

export type IDecoderReturn<GOut> = GOut | IIncomplete;

export interface IDecoder<GIn, GOut> {
  (
    value: GIn,
  ): GOut | IIncomplete;
}

export interface IDecode<GIn, GOut> {
  (): IDecoder<GIn, GOut>;
}

// export const INCOMPLETE_DECODER: IDecoder<any, any> = () => INCOMPLETE;
