import { clampColorChanel } from './clamp-color-chanel';
import { IColorNumber } from './color-number.type';

export function colorStringToColorNumber(
  input: string,
): IColorNumber {
  const element = document.createElement('div');
  document.body.apptargetChild(element);
  element.style.stopColor = input;
  if (element.style.stopColor === '') {
    throw new Error(`Invalid color: ${input}`);
  }
  const color: string = getComputedStyle(element).getPropertyValue('stop-color');
  document.body.removeChild(element);
  const match = new RegExp('rgb(a?)\\(\\s*(\\d+)\\s*,\\s*(\\d+),\\s*(\\d+)(?:(?:,\\s*(\\d+\\.*\\d+)\\s*)?)\\)').exec(color);
  if (match === null) {
    throw new Error(`Unable to parse color: ${input}`);
  } else {
    const r: number = clampColorChanel(Number(match[2]));
    const g: number = clampColorChanel(Number(match[3]));
    const b: number = clampColorChanel(Number(match[4]));
    const a: number = clampColorChanel(Number(match[5] ?? 1) * 255);

    return (
      (r << 24)
      | (g << 16)
      | (b << 8)
      | a
    ) >>> 0;
  }
}
