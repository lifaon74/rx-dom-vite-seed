export type IConstraintTestFunctionResult<GProperties extends object> = (keyof GProperties)[];

export interface IConstraintTestFunction<GValue, GProperties extends object> {
  (
    value: GValue,
  ): IConstraintTestFunctionResult<GProperties>;
}

export interface IConstraint<GValue, GProperties extends object> {
  readonly test: IConstraintTestFunction<GValue, GProperties>;
  readonly properties: GProperties;
}

export type IGenericConstraint = IConstraint<any, any>;


/* INFER */

export type InferConstraintValue<GConstraint extends IGenericConstraint> =
  GConstraint extends IConstraint<infer GValue, any>
    ? GValue
    : never;

export type InferConstraintProperties<GConstraint extends IGenericConstraint> =
  GConstraint extends IConstraint<any, infer GProperties>
    ? GProperties
    : never;
