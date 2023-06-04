import { TupleTypes, UnionToIntersection } from '@lirx/utils';
import { IConstraint, IGenericConstraint, InferConstraintProperties, InferConstraintValue } from '../constraint/constraint.type';
import { multipleConstraints } from './multiple-constraints';

export type IGroupConstraintsConstraint<GFirstConstraint extends IGenericConstraint> = IConstraint<InferConstraintValue<GFirstConstraint>, any>;
export type InferGroupConstraintsPropertiesRaw<GConstraints extends readonly IGenericConstraint[]> = Extract<
  UnionToIntersection<
    TupleTypes<{
      [GKey in keyof GConstraints]: InferConstraintProperties<GConstraints[GKey]>;
    }>
  >,
  object
>;
export type InferGroupConstraintsProperties<GFirstConstraint extends IGenericConstraint, GConstraints extends readonly IGenericConstraint[]> =
  InferGroupConstraintsPropertiesRaw<[GFirstConstraint, ...GConstraints]>;

export function groupConstraints<GFirstConstraint extends IGenericConstraint, GConstraints extends readonly IGroupConstraintsConstraint<GFirstConstraint>[]>(
  mode: 'sequential' | 'parallel',
  firstConstraint: GFirstConstraint,
  ...constraints: GConstraints
): IConstraint<InferConstraintValue<GFirstConstraint>, InferGroupConstraintsProperties<GFirstConstraint, GConstraints>> {
  type GValue = InferConstraintValue<GFirstConstraint>;
  type GProperties = InferGroupConstraintsProperties<GFirstConstraint, GConstraints>;

  return multipleConstraints<GValue, GProperties>(mode, [
    firstConstraint,
    ...constraints,
  ]);
}
