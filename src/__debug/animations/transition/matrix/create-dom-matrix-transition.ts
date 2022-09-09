import { mat4 } from '../../math/math-gl/mat4/mat4.type';
import { mapTransition } from '../modifiers/map-transition';
import { ITransitionFunction } from '../transition-function.type';
import { createTransformMatrixTransition } from './create-transform-matrix-transition';

export function createDOMMatrixTransition(
  origin: DOMMatrix,
  target: DOMMatrix,
): ITransitionFunction<DOMMatrix> {
  return mapTransition(
    createTransformMatrixTransition(
      origin.toFloat32Array(),
      target.toFloat32Array(),
    ),
    (matrix: mat4): DOMMatrix => {
      return DOMMatrix.fromFloat32Array(matrix);
    },
  );
}
