import { IGenericVirtualCustomElementNode } from '@lirx/dom';

export function createProgressAnimation(
  element: IGenericVirtualCustomElementNode,
) {
  const loop = () => {
    // element.progress = (element.progress + 0.01 * Math.random()) % 1;
    // element.progress = (element.progress + 0.01) % 1;
    element.inputs.set('progress' as never, ((element.inputs.get('progress' as never) as unknown as number + 0.01) % 1) as never);
    // setAttributeValueWithEvent(element, 'progress', String((element.progress + 0.01 * Math.random()) % 1));
    // setTimeout(loop, 100);
    requestAnimationFrame(loop);
  };
  loop();
}
