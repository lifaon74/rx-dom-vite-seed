import { ISize2D } from '../types/2d/size/size-2d.type';
import {
  IGetExternalBoxForContainerElementWithMarginOptions,
} from './get-external-box-for-container-element-with-margin';


const PROPERTY_NAMES: string[] = [
  'width',
  'height',
  'left',
  'right',
  'margin',
];

type IStyleProperty = [
  name: string,
  value: string,
  priority: string,
];


export interface IGetElementNaturalSizeOptions extends //
  Pick<IGetExternalBoxForContainerElementWithMarginOptions, 'containerHorizontalMargin' | 'containerVerticalMargin'>
//
{
  contentElement: HTMLElement;
}

export function getContentElementNaturalSize(
  {
    contentElement,
    containerHorizontalMargin,
    containerVerticalMargin,
  }: IGetElementNaturalSizeOptions,
): ISize2D {
  const styleDeclaration: CSSStyleDeclaration = contentElement.style;

  // store current style properties
  const properties: IStyleProperty[] = PROPERTY_NAMES.map((name: string): IStyleProperty => {
    return [
      name,
      styleDeclaration.getPropertyValue(name),
      styleDeclaration.getPropertyPriority(name),
    ];
  });

  // store current scroll state
  const scrollTop: number = contentElement.scrollTop;
  const scrollLeft: number = contentElement.scrollLeft;

  const setStyleProperty = (
    name: string,
    value: string,
  ): void => {
    styleDeclaration.setProperty(name, value, 'important');
  };

  // set style properties for a "natural" element
  setStyleProperty('width', 'auto');
  setStyleProperty('height', 'auto');
  setStyleProperty('left', 'auto');
  setStyleProperty('top', 'auto');
  setStyleProperty('margin', `${containerVerticalMargin}px ${containerHorizontalMargin}px`);

  // compute natural element size
  const { width, height }: DOMRect = contentElement.getBoundingClientRect();

  // restore style properties
  properties.forEach(([name, value, priority]: IStyleProperty): void => {
    styleDeclaration.setProperty(name, value, priority);
  });

  // restore scroll state
  contentElement.scrollTop = scrollTop;
  contentElement.scrollLeft = scrollLeft;

  return {
    width,
    height,
  };
}
