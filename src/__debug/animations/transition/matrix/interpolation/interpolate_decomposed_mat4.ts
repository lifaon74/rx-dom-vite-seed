import { quat } from '../../../math/math-gl/quat/quat.type';
import { vec3 } from '../../../math/math-gl/vec3/vec3.type';
import { vec4 } from '../../../math/math-gl/vec4/vec4.type';
import { interpolate_perspective } from './interpolate_perspective';
import { interpolate_quaternions } from './interpolate_quaternions';
import { interpolate_scaling } from './interpolate_scaling';
import { interpolate_skewing } from './interpolate_skewing';
import { interpolate_translation } from './interpolate_translation';

export function interpolate_decomposed_mat4(
  originTranslation: vec3,
  targetTranslation: vec3,
  currentTranslation: vec3,
  originScale: vec3,
  targetScale: vec3,
  currentScale: vec3,
  originSkew: vec3,
  targetSkew: vec3,
  currentSkew: vec3,
  originPerspective: vec4,
  targetPerspective: vec4,
  currentPerspective: vec4,
  originQuaternion: quat,
  targetQuaternion: quat,
  currentQuaternion: quat,
  t: number,
): void {
  interpolate_translation(originTranslation, targetTranslation, currentTranslation, t);
  interpolate_scaling(originScale, targetScale, currentScale, t);
  interpolate_skewing(originSkew, targetSkew, currentSkew, t);
  interpolate_perspective(originPerspective, targetPerspective, currentPerspective, t);
  interpolate_quaternions(originQuaternion, targetQuaternion, currentQuaternion, t);
}

