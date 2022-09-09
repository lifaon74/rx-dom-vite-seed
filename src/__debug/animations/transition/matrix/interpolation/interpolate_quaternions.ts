import { quat } from '../../../math/math-gl/quat/quat.type';
import { quat_slerp } from '../../../math/math-gl/quat/quat_slerp';

/**
 * From: https://drafts.csswg.org/css-transforms-2/#interpolation-of-decomposed-3d-matrix-values
 * INFO: use quat.slerp instead of w3c implementation
 */
export function interpolate_quaternions(
  originQuaternion: quat,
  targetQuaternion: quat,
  currentQuaternion: quat,
  t: number,
): void {
  quat_slerp(currentQuaternion, originQuaternion, targetQuaternion, t);
}
