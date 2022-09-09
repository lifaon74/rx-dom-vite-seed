import { readonly_quat } from '../quat/quat.type';
import { readonly_vec3 } from '../vec3/vec3.type';
import { readonly_vec4 } from '../vec4/vec4.type';
import { mat4 } from './mat4.type';
import { mat4_create } from './mat4_create';
import { mat4_from_perspective } from './mat4_from_perspective';
import { mat4_from_quat } from './mat4_from_quat';
import { mat4_identity } from './mat4_identity';
import { mat4_multiply } from './mat4_multiply';
import { mat4_scale } from './mat4_scale';
import { mat4_translate } from './mat4_translate';

const tmpMat4: mat4 = mat4_create();

/**
 * From: https://drafts.csswg.org/css-transforms-2/#recomposing-to-a-3d-matrix
 * INFO: try to reduce with fromRotationTranslationScale
 */
export function mat4_recompose(
  translation: readonly_vec3,
  scale: readonly_vec3,
  skew: readonly_vec3,
  perspective: readonly_vec4,
  quaternion: readonly_quat,
  out: mat4,
): mat4 {
  // apply perspective
  mat4_from_perspective(out, perspective);

  // apply translation
  mat4_translate(out, out, translation);

  // apply rotation
  mat4_from_quat(tmpMat4, quaternion);
  mat4_multiply(out, out, tmpMat4);

  // apply skew
  mat4_identity(tmpMat4);

  if (skew[2]) {
    tmpMat4[9] = skew[2];
    mat4_multiply(out, out, tmpMat4);
  }

  if (skew[1]) {
    tmpMat4[9] = 0;
    tmpMat4[8] = skew[1];
    mat4_multiply(out, out, tmpMat4);
  }

  if (skew[0]) {
    tmpMat4[8] = 0;
    tmpMat4[4] = skew[0];
    mat4_multiply(out, out, tmpMat4);
  }

  // apply scale
  mat4_scale(out, out, scale);

  return out;
}


