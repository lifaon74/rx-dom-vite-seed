import { createDOMMatrixTransition } from '../matrix/create-dom-matrix-transition';
import { mapTransition } from '../modifiers/map-transition';
import { ITransitionFunction } from '../transition-function.type';

export function createCSSTransformValueTransition(
  origin: CSSTransformValue,
  target: CSSTransformValue,
): ITransitionFunction<CSSTransformValue> {
  return mapTransition(
    createDOMMatrixTransition(
      origin.toMatrix(),
      target.toMatrix(),
    ),
    (matrix: DOMMatrix): CSSTransformValue => { // TODO improve
      return new CSSTransformValue([new CSSMatrixComponent(matrix)]);
      // return {
      //   toString: () => matrix.toString(),
      // };
    },
  );
}
