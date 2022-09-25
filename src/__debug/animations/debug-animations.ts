import {
  animate,
  applyTimingFunctionToTransition, createCSSNumericValueTransition, createManualStylePropertyTransition,
  createStylePropertyTransition,
  easeInOutTimingFunction, getCSS, invertTimingFunction,
  mapTransition, parallelTransitions,
  sequentialTransitions,
} from '@lirx/animations';

/* NUMBER */

/*---*/

/*--------*/

/*--------*/

/*----------------*/

function createDummyElement(): HTMLElement {
  const element = document.createElement('div');
  // element.style.height = '200px';
  element.style.width = '200px';
  element.style.background = 'red';
  element.innerText = `
  Vivamus dictum lectus sit amet viverra vestibulum. Quisque htargetrerit, lorem et viverra aliquam, felis elit htargetrerit sem, sed finibus velit erat a eros. Susptargetisse ultrices dignissim malesuada. Aliquam ac rutrum felis, id lacinia eros. Sed tincidunt fermentum metus, sit amet suscipit felis varius eu. Morbi ac risus dolor. Nulla facilisi. Sed quis dignissim lectus, in lobortis urna. Susptargetisse auctor, arcu non rhoncus tristique, nisi dolor tincidunt magna, imperdiet pellentesque eros mauris tristique risus. Proin sed lorem maximus, viverra nisi at, sodales elit. Nunc eleiftarget enim a metus volutpat, at ultricies nibh fermentum. Proin dictum ante sed pharetra ultricies. Nam urna orci, maximus vitae gravida quis, lacinia ac nisi. Morbi vestibulum libero sit amet ipsum tristique, sed viverra dolor condimentum. Curabitur ut volutpat nibh, in rutrum augue.
  `;
  element.style.overflow = 'hidden';

  document.body.appendChild(element);
  return element;
}

/*----------------*/

/*---*/

/*----------------*/

function debugAnimations1() {
  const element = createDummyElement();
  const colorA = 'rgb(255, 0, 0)';
  const colorB = 'rgba(0, 255, 0)';

  // const timingFunction = createCubicBezierTimingFunction(0.77,-1.26,0.2,1.86);
  const timingFunction = easeInOutTimingFunction;

  // const colorTransition = createColorTransition(colorA, colorB);
  // const colorTransition = upgradeTransitionWithEvent(() => createColorTransition(colorStringToColorNumber(getComputedStyle(element).getPropertyValue('background-color')), colorB));

  // const pxTransition = createPxTransition(100, 300);
  // const translateXTransition = mapTransition(
  //   pxTransition,
  //   _ => `translateX(${_})`,
  // );

  // const backgroundColorTransition = createStylePropertyTransition(
  //   element,
  //   'background-color',
  //   createColorTransition(colorA, colorB),
  // );

  const backgroundColorTransition = createStylePropertyTransition(
    element,
    'background-color',
    colorA,
    colorB,
  );

  // const translateTransition = createStylePropertyTransition(
  //   element,
  //   'transform',
  //   mapTransition(
  //     createPxTransition(100, 300),
  //     _ => `translateX(${_})`,
  //   ),
  // );

  const translateTransition = createManualStylePropertyTransition(
    element,
    'transform',
    mapTransition(
      createCSSNumericValueTransition(getCSS().px(100), getCSS().px(300)),
      _ => `translateX(${_})`,
    ),
  );

  // const translateTransition = createAutomaticStylePropertyTransition(
  //   element,
  //   'transform',
  //   `translateX(0)`,
  //   `translateX(100px)`,
  // );

  const _translateTransitionA = applyTimingFunctionToTransition(translateTransition, timingFunction);
  const _translateTransitionB = applyTimingFunctionToTransition(_translateTransitionA, invertTimingFunction);

  // const collapseTransition = createStylePropertyTransition(
  //   element,
  //   'max-height',
  //   (
  //     progress: ITransitionProgress,
  //   ): string => {
  //     // if (progress === 0) {
  //     //   const maxHeight: string = element.style.getPropertyValue('max-height');
  //     //   element.style.setProperty('max-height', 'none');
  //     //   const origin: number = element.offsetHeight;
  //     //   const target: number = 0;
  //     //
  //     //   if (maxHeight === '') {
  //     //     element.style.removeProperty('max-height');
  //     //   } else {
  //     //     element.style.setProperty('max-height', maxHeight);
  //     //   }
  //     // }
  //     const maxHeight: string = element.style.getPropertyValue('max-height');
  //     element.style.setProperty('max-height', 'none');
  //     const origin: number = element.offsetHeight;
  //     const target: number = 0;
  //
  //     if (maxHeight === '') {
  //       element.style.removeProperty('max-height');
  //     } else {
  //       element.style.setProperty('max-height', maxHeight);
  //     }
  //     return createPxTransition(origin, target);
  //   },
  // );

  // const collapseTransition = createStylePropertyTransitionWithEvent(
  //   element,
  //   'max-height',
  //   (
  //     element: HTMLElement,
  //     propertyName: string,
  //   ) => {
  //     const maxHeight: string = element.style.getPropertyValue('max-height');
  //     element.style.setProperty('max-height', 'none');
  //     const origin: number = element.offsetHeight;
  //     const target: number = 0;
  //
  //     if (maxHeight === '') {
  //       element.style.removeProperty('max-height');
  //     } else {
  //       element.style.setProperty('max-height', maxHeight);
  //     }
  //     return createPxTransition(origin, target);
  //   },
  // );

  // const expandTransition = createStylePropertyTransitionWithEvent(
  //   element,
  //   'max-height',
  //   (
  //     element: HTMLElement,
  //     propertyName: string,
  //   ) => {
  //     const maxHeight: string = element.style.getPropertyValue('max-height');
  //     element.style.setProperty('max-height', 'none');
  //     const origin: number = 0;
  //     const target: number = element.offsetHeight;
  //
  //     if (maxHeight === '') {
  //       element.style.removeProperty('max-height');
  //     } else {
  //       element.style.setProperty('max-height', maxHeight);
  //     }
  //     return createPxTransition(origin, target);
  //   },
  //   (): string => {
  //     return 'none';
  //   },
  // );

  const parallel = parallelTransitions([
    backgroundColorTransition,
    translateTransition,
  ]);

  const sequential = sequentialTransitions([
    [_translateTransitionA, 1],
    [_translateTransitionB, 1],
  ]);

  // const css = CSSStyleValue.parse('transform', 'translate3d(10px,10px,0) scale(0.5)');

  const origin = () => {
    animate({
      duration: 2000,
      transition: (progress: number) => {
        backgroundColorTransition(progress);
        // translateTransition(progress);
        // parallel(progress);
        // sequential(progress);
      },
    });
  };

  sequential(0);
  // origin();
  window.onclick = origin;

}

/*----------------*/

export function debugAnimations() {
  debugAnimations1();
}
