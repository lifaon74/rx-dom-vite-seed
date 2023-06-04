import { createVirtualReactiveElementNodeModifier, IGenericVirtualReactiveElementNode, VirtualDOMNode } from '@lirx/dom';
import { IMatInputOptions, matInputFieldModifierFunction } from '../../../mat-input-field/mat-input-field.modifier';
import { IMatInputDirtyOptions, matInputDirtyModifierFunction } from '../mat-input-dirty/mat-input-dirty.modifier';
import { IMatInputDisabledOptions, matInputDisabledModifierFunction } from '../mat-input-disabled/mat-input-disabled.modifier';
import { IMatInputFocusedOptions, matInputFocusedModifierFunction } from '../mat-input-focused/mat-input-focused.modifier';
import { IMatInputInvalidOptions, matInputInvalidModifierFunction } from '../mat-input-invalid/mat-input-invalid.modifier';
import { IMatInputReadonlyOptions, matInputReadonlyModifierFunction } from '../mat-input-readonly/mat-input-readonly.modifier';
import { IMatInputRequiredOptions, matInputRequiredModifierFunction } from '../mat-input-required/mat-input-required.modifier';
import { IMatInputTouchedOptions, matInputTouchedModifierFunction } from '../mat-input-touched/mat-input-touched.modifier';

export interface IMatInputFullOptions extends
  //
  IMatInputOptions,
  IMatInputDirtyOptions,
  IMatInputTouchedOptions,
  IMatInputRequiredOptions,
  IMatInputFocusedOptions,
  IMatInputInvalidOptions,
  IMatInputReadonlyOptions,
  IMatInputDisabledOptions
//
{

}

export function matInputFullModifierFunction(
  node: IGenericVirtualReactiveElementNode,
  options?: IMatInputFullOptions,
): VirtualDOMNode {
  // order of priority: disabled, readonly, invalid, focused, required, touched, dirty

  matInputFieldModifierFunction(node, options);
  matInputDirtyModifierFunction(node, options);
  matInputTouchedModifierFunction(node, options);
  matInputRequiredModifierFunction(node, options);
  matInputFocusedModifierFunction(node, options);
  matInputInvalidModifierFunction(node, options);
  matInputReadonlyModifierFunction(node, options);
  matInputDisabledModifierFunction(node, options);

  return node;
}

export const MatInputFullModifier = createVirtualReactiveElementNodeModifier<IMatInputFullOptions | undefined, VirtualDOMNode>('mat-input-full', matInputFullModifierFunction);

