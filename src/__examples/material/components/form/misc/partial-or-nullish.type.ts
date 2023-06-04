import { INullish } from '@lirx/utils';

export type IPartialOrNullishType<GValue> = {
  [GKey in keyof GValue]?: GValue[GKey] | INullish;
}
