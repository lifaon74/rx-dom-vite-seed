import { noop } from '../../../../lirx/core/dist';
import { createCubicBezierTimingFunction, easeInOutTimingFunction } from './timing/built-in/cubic-bezier-timing-function';
import { invertTimingFunction } from './timing/built-in/invert-timing-function';
import { applyTimingFunctionToTransition } from './transition/functions/apply-timing-function-to-transition';
import { mapTransition } from './transition/functions/map-transition';
import { ITransitionFunction, ITransitionProgress, IVoidTransitionFunction } from './transition/transition-function.type';

export function mathClamp(
  value: number,
  min: number,
  max: number,
): number {
  return Math.min(Math.max(value, min), max);
}

/* COLOR */

export type IColorNumber = number;

function clampColorChanel(
  value: number,
): number {
  return mathClamp(Math.round(value), 0, 0xff);
}

export function createColorTransition(
  colorA: IColorNumber,
  colorB: IColorNumber,
): ITransitionFunction<IColorNumber> {
  return (
    progress: ITransitionProgress,
  ): IColorNumber => {
    const pA: number = 1 - progress;
    const rA: number = (colorA >>> 24) & 0xff;
    const gA: number = (colorA >>> 16) & 0xff;
    const bA: number = (colorA >>> 8) & 0xff;
    const aA: number = (colorA >>> 0) & 0xff;

    const pB: number = progress;
    const rB: number = (colorB >>> 24) & 0xff;
    const gB: number = (colorB >>> 16) & 0xff;
    const bB: number = (colorB >>> 8) & 0xff;
    const aB: number = (colorB >>> 0) & 0xff;

    const rC: number = clampColorChanel((rA * pA) + (rB * pB));
    const gC: number = clampColorChanel((gA * pA) + (gB * pB));
    const bC: number = clampColorChanel((bA * pA) + (bB * pB));
    const aC: number = clampColorChanel((aA * pA) + (aB * pB));

    return (
      (rC << 24)
      | (gC << 16)
      | (bC << 8)
      | aC
    ) >>> 0;
  };
}

/* NUMBER */

export function createNumberTransition(
  numberA: number,
  numberB: number,
): ITransitionFunction<number> {
  return (
    progress: ITransitionProgress,
  ): number => {
    return (numberA * (1 - progress)) + (numberB * progress);
  };
}

export function createPxTransition(
  pxA: number,
  pxB: number,
): ITransitionFunction<string> {
  return mapTransition(
    createNumberTransition(pxA, pxB),
    _ => `${_}px`,
  );
}

/*---*/

export function createStylePropertyTransition(
  element: HTMLElement,
  propertyName: string,
  transition: ITransitionFunction<string>,
): IVoidTransitionFunction {
  return (
    progress: ITransitionProgress,
  ): void => {
    element.style.setProperty(propertyName, transition(progress));
  };
}

/*--------*/

export type ITransitionWithWeight = [
  transtion: IVoidTransitionFunction,
  weight: number,
];

export function chainTransitions(
  transitions: readonly ITransitionWithWeight[],
): IVoidTransitionFunction {
  const length: number = transitions.length;
  const _transitions: IVoidTransitionFunction[] = new Array(length);

  let total: number = 0;
  for (let i = 0; i < length; i++) {
    total += transitions[i][1];
  }

  let step: number = 0;
  for (let i = 0; i < length; i++) {
    const [transition, weight] = transitions[i];
    const start: number = step;
    const range: number = weight / total;
    step += range;

    _transitions[i] = (
      progress: ITransitionProgress,
    ): void => {
      if (progress >= start) {
        transition(mathClamp((progress - start) / range, 0, 1));
      }
    };
  }

  return (
    progress: ITransitionProgress,
  ): void => {
    for (let i = 0; i < length; i++) {
      _transitions[i](progress);
    }
  };
}

/*--------*/

// function animate(
//   duration: number,
//   callback: IVoidTransitionFunction,
// ): void {
//   const startTime: number = Date.now();
//
//   const loop = () => {
//     const progress: ITransitionProgress = Math.min(1, (Date.now() - startTime) / duration);
//     callback(progress);
//
//     if (progress < 1) {
//       requestAnimationFrame(loop);
//     }
//   };
//
//   callback(0);
//   requestAnimationFrame(loop);
// }

function animate(
  duration: number,
  callback: IVoidTransitionFunction,
): void {
  const startTime: number = Date.now();

  const loop = () => {
    requestAnimationFrame(() => {
      const progress: ITransitionProgress = Math.min(1, (Date.now() - startTime) / duration);
      callback(progress);

      if (progress < 1) {
        loop();
      }
    });
  };

  requestAnimationFrame(() => {
    callback(0);
    loop();
  });
}

/*--------*/

export function colorStringToColorNumber(
  input: string,
): IColorNumber {
  const element = document.createElement('div');
  document.body.appendChild(element);
  element.style.color = input;
  const color: string = getComputedStyle(element).getPropertyValue('color');
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

export function colorNumberToColorString(
  input: IColorNumber,
): string {
  return `#${input.toString(16).padStart(8, '0')}`;
}

/*----------------*/

function createDummyElement(): HTMLElement {
  const element = document.createElement('div');
  // element.style.height = '200px';
  element.style.width = '200px';
  element.style.background = 'red';
  element.innerText = `
  Vivamus dictum lectus sit amet viverra vestibulum. Quisque hendrerit, lorem et viverra aliquam, felis elit hendrerit sem, sed finibus velit erat a eros. Suspendisse ultrices dignissim malesuada. Aliquam ac rutrum felis, id lacinia eros. Sed tincidunt fermentum metus, sit amet suscipit felis varius eu. Morbi ac risus dolor. Nulla facilisi. Sed quis dignissim lectus, in lobortis urna. Suspendisse auctor, arcu non rhoncus tristique, nisi dolor tincidunt magna, imperdiet pellentesque eros mauris tristique risus. Proin sed lorem maximus, viverra nisi at, sodales elit. Nunc eleifend enim a metus volutpat, at ultricies nibh fermentum. Proin dictum ante sed pharetra ultricies. Nam urna orci, maximus vitae gravida quis, lacinia ac nisi. Morbi vestibulum libero sit amet ipsum tristique, sed viverra dolor condimentum. Curabitur ut volutpat nibh, in rutrum augue.
  `;
  element.style.overflow = 'hidden';

  document.body.appendChild(element);
  return element;
}

/*----------------*/

function debugAnimations1() {
  const element = createDummyElement();
  const colorA = colorStringToColorNumber('rgb(255, 0, 0)');
  const colorB = colorStringToColorNumber('rgba(0, 255, 0)');

  // const timingFunction = createCubicBezierTimingFunction(0.77,-1.26,0.2,1.86);
  const timingFunction = easeInOutTimingFunction;

  // const colorTransition = createColorTransition(colorA, colorB);
  // const colorTransition = upgradeTransitionWithEvent(() => createColorTransition(colorStringToColorNumber(getComputedStyle(element).getPropertyValue('background-color')), colorB));

  // const pxTransition = createPxTransition(100, 300);
  // const translateXTransition = mapTransition(
  //   pxTransition,
  //   _ => `translateX(${_})`,
  // );

  const backgroundColorTransition = createStylePropertyTransition(
    element,
    'background-color',
    mapTransition(
      createColorTransition(colorA, colorB),
      colorNumberToColorString,
    ),
  );

  const translateTransition = createStylePropertyTransition(
    element,
    'transform',
    mapTransition(
      createPxTransition(100, 300),
      _ => `translateX(${_})`,
    ),
  );

  const _translateTransitionA = applyTimingFunctionToTransition(translateTransition, timingFunction);
  const _translateTransitionB = applyTimingFunctionToTransition(_translateTransitionA, invertTimingFunction);

  // const collapseTransition = createStylePropertyTransitionWithEvent(
  //   element,
  //   'max-height',
  //   (
  //     element: HTMLElement,
  //     propertyName: string,
  //   ) => {
  //     const maxHeight: string = element.style.getPropertyValue('max-height');
  //     element.style.setProperty('max-height', 'none');
  //     const start: number = element.offsetHeight;
  //     const end: number = 0;
  //
  //     if (maxHeight === '') {
  //       element.style.removeProperty('max-height');
  //     } else {
  //       element.style.setProperty('max-height', maxHeight);
  //     }
  //     return createPxTransition(start, end);
  //   },
  // );
  //
  // const expandTransition = createStylePropertyTransitionWithEvent(
  //   element,
  //   'max-height',
  //   (
  //     element: HTMLElement,
  //     propertyName: string,
  //   ) => {
  //     const maxHeight: string = element.style.getPropertyValue('max-height');
  //     element.style.setProperty('max-height', 'none');
  //     const start: number = 0;
  //     const end: number = element.offsetHeight;
  //
  //     if (maxHeight === '') {
  //       element.style.removeProperty('max-height');
  //     } else {
  //       element.style.setProperty('max-height', maxHeight);
  //     }
  //     return createPxTransition(start, end);
  //   },
  //   (): string => {
  //     return 'none';
  //   },
  // );

  const chain = chainTransitions([
    // [backgroundColorTransition, 1],
    // [translateTransition, 1],
    [_translateTransitionA, 1],
    [_translateTransitionB, 1],
  ]);

  const start = () => {
    animate(2000, (progress: number) => {
      // backgroundColorTransition(progress);
      // translateTransition(progress);
      chain(progress);
      // collapseTransition(progress);
      // expandTransition(progress);
      // element.style.background = colorNumberToColorString(colorTransition(progress));
      // element.style.transform = translateXTransition(progress);
    });
  };

  chain(0);
  // start();
  window.onclick = start;

}

/*----------------*/

export function debugAnimations() {
  debugAnimations1();
}
