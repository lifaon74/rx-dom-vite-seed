import { IColorNumber } from './color-number.type';

export function colorNumberToColorString(
  input: IColorNumber,
): string {
  return `#${input.toString(16).padStart(8, '0')}`;
}
