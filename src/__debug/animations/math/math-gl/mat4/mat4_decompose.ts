import { quat } from '../quat/quat.type';
import { vec3 } from '../vec3/vec3.type';
import { vec3_create } from '../vec3/vec3_create';
import { vec3_cross } from '../vec3/vec3_cross';
import { vec3_dot } from '../vec3/vec3_dot';
import { vec3_length } from '../vec3/vec3_length';
import { vec3_normalize } from '../vec3/vec3_normalize';
import { vec3_scale_and_add } from '../vec3/vec3_scale_and_add';
import { vec4 } from '../vec4/vec4.type';
import { vec4_create } from '../vec4/vec4_create';
import { vec4_transform_mat4 } from '../vec4/vec4_transform_mat4';
import { mat4, readonly_mat4 } from './mat4.type';
import { mat4_copy } from './mat4_copy';
import { mat4_create } from './mat4_create';
import { mat4_determinant } from './mat4_determinant';
import { mat4_invert } from './mat4_invert';
import { mat4_multiply_scalar } from './mat4_multiply_scalar';
import { mat4_transpose } from './mat4_transpose';

// https://gist.github.com/joelambert/1117818
// https://github.com/mattdesl/mat4-decompose/blob/master/index.js
// https://www.w3.org/TR/css-transforms-1/#interpolation-of-decomposed-2d-matrix-values
// https://drafts.csswg.org/css-transforms-2/#matrix-interpolation
// https://gist.github.com/joelambert/1117818

function mat3OfVec3FromMat4(
  out: TMat3OfVec3,
  mat: readonly_mat4,
): TMat3OfVec3 {
  out[0][0] = mat[0];
  out[0][1] = mat[1];
  out[0][2] = mat[2];

  out[1][0] = mat[4];
  out[1][1] = mat[5];
  out[1][2] = mat[6];

  out[2][0] = mat[8];
  out[2][1] = mat[9];
  out[2][2] = mat[10];

  return out;
}

type TMat3OfVec3 = [vec3, vec3, vec3];

const tmpMat4: mat4 = mat4_create();
const perspectiveMatrix: mat4 = mat4_create();
const rightHandSide: vec4 = vec4_create();
const row: TMat3OfVec3 = [vec3_create(), vec3_create(), vec3_create()];
const pdum3: vec3 = vec3_create();

/**
 * From: https://drafts.csswg.org/css-transforms-2/#matrix-interpolation
 */
export function mat4_decompose(
  matrix: readonly_mat4,
  translation: vec3,
  scale: vec3,
  skew: vec3,
  perspective: vec4,
  quaternion: quat,
): boolean {

  // debugger;
  // normalize the matrix
  const m44: number = matrix[15];

  if (m44 == 0) {
    return false;
  }

  mat4_multiply_scalar(tmpMat4, matrix, m44);

  // perspectiveMatrix is used to solve for perspective, but it also provides
  // an easy way to test for singularity of the upper 3x3 component
  mat4_copy(perspectiveMatrix, tmpMat4);

  perspectiveMatrix[3] = 0;
  perspectiveMatrix[7] = 0;
  perspectiveMatrix[11] = 0;
  perspectiveMatrix[15] = 1;

  if (Math.abs(mat4_determinant(perspectiveMatrix)) < 1e-6) { // EPSILON
    return false;
  }

  const a03: number = tmpMat4[3],
    a13 = tmpMat4[7],
    a23 = tmpMat4[11],
    a33 = tmpMat4[15];

  // first, isolate perspective.
  if ((a03 !== 0) || (a13 !== 0) || (a23 !== 0)) {
    // rightHandSide is the right hand side of the equation
    rightHandSide[0] = a03;
    rightHandSide[1] = a13;
    rightHandSide[2] = a23;
    rightHandSide[3] = a33;

    // solve the equation by inverting perspectiveMatrix and multiplying
    // rightHandSide by the inverse
    if (mat4_invert(perspectiveMatrix, perspectiveMatrix) === null) {
      return false;
    }

    mat4_transpose(perspectiveMatrix, perspectiveMatrix);
    vec4_transform_mat4(perspective, rightHandSide, perspectiveMatrix);
  } else {
    // no perspective
    perspective[0] = 0;
    perspective[1] = 0;
    perspective[2] = 0;
    perspective[3] = 1;
  }

  // next take care of translation
  translation[0] = tmpMat4[12];
  translation[1] = tmpMat4[13];
  translation[2] = tmpMat4[14];

  // now get scale and shear. 'row' is a 3 element array of 3 component vectors
  // mat3.fromMat4(tmpMat3, tmpMat4);
  mat3OfVec3FromMat4(row, tmpMat4);

  // compute X scale factor and normalize first row
  scale[0] = vec3_length(row[0]);
  vec3_normalize(row[0], row[0]);

  // compute XY shear factor and make 2nd row orthogonal to 1st
  skew[0] = vec3_dot(row[0], row[1]);
  // combine(row[1], row[1], row[0], 1, -skew[0]);
  vec3_scale_and_add(row[1], row[1], row[0], -skew[0]);

  // now, compute Y scale and normalize 2nd row
  scale[1] = vec3_length(row[1]);
  vec3_normalize(row[1], row[1]);
  skew[0] /= scale[1];

  // compute XZ and YZ shears, orthogonalize 3rd row
  skew[1] = vec3_dot(row[0], row[2]);
  // combine(row[2], row[2], row[0], 1, -skew[1]);
  vec3_scale_and_add(row[2], row[2], row[0], -skew[1]);
  skew[2] = vec3_dot(row[1], row[2]);
  // combine(row[2], row[2], row[1], 1, -skew[2]);
  vec3_scale_and_add(row[2], row[2], row[1], -skew[2]);

  // next, get Z scale and normalize 3rd row
  scale[2] = vec3_length(row[2]);
  vec3_normalize(row[2], row[2]);
  skew[1] /= scale[2];
  skew[2] /= scale[2];

  // at this point, the matrix (in rows) is orthonormal.
  // check for a coordinate system flip. If the determinant
  // is -1, then negate the matrix and the scaling factors
  vec3_cross(pdum3, row[1], row[2]);
  if (vec3_dot(row[0], pdum3) < 0) {
    for (let i: number = 0; i < 3; i++) {
      scale[i] *= -1;
      row[i][0] *= -1;
      row[i][1] *= -1;
      row[i][2] *= -1;
    }
  }

  // now, get the rotations out
  const r00 = row[0][0],
    r11 = row[1][1],
    r22 = row[2][2];

  quaternion[0] = 0.5 * Math.sqrt(Math.max(1 + r00 - r11 - r22, 0));
  quaternion[1] = 0.5 * Math.sqrt(Math.max(1 - r00 + r11 - r22, 0));
  quaternion[2] = 0.5 * Math.sqrt(Math.max(1 - r00 - r11 + r22, 0));
  quaternion[3] = 0.5 * Math.sqrt(Math.max(1 + r00 + r11 + r22, 0));

  if (row[2][1] > row[1][2]) {
    quaternion[0] = -quaternion[0];
  }

  if (row[0][2] > row[2][0]) {
    quaternion[1] = -quaternion[1];
  }

  if (row[1][0] > row[0][1]) {
    quaternion[2] = -quaternion[2];
  }

  return true;
}
