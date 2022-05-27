import { fromEventTarget, IObservable } from '@lirx/core';
import { HTML_NAMESPACE_URI_CONSTANT } from '../../../../../misc/namespace-uri/html-namespace-uri.constant';
import { MATH_ML_NAMESPACE_URI_CONSTANT } from '../../../../../misc/namespace-uri/math-ml-namespace-uri.constant';
import { SVG_NAMESPACE_URI_CONSTANT } from '../../../../../misc/namespace-uri/svg-namespace-uri.constant';
import { IAttributeValue } from '../../static/element/attribute/attribute-value.type';
import { ISetStyleProperty, ISetStylePropertyOrNull } from '../../static/element/style/style-property.type';
import { VirtualElementNode } from '../../static/element/virtual-element-node.class';
import { differClassNames } from '../custom-element/class/differ-class-names';
import { IClassNamesList } from './class/class-names-list.type';
import { differStylePropertiesMap } from './style/differ-style-map';
import { IStylePropertiesMap } from './style/style-properties-map.type';
import { IStylePropertyAndValueTuple } from './style/style-property-and-value-tuple';

export class VirtualReactiveElementNode<GElementNode extends Element> extends VirtualElementNode<GElementNode> {

  static createHTML<GKey extends keyof HTMLElementTagNameMap>(
    name: GKey,
    options?: ElementCreationOptions,
  ): VirtualReactiveElementNode<HTMLElementTagNameMap[GKey]>;
  static createHTML<GElementNode extends HTMLElement>(
    name: string,
    options?: ElementCreationOptions,
  ): VirtualReactiveElementNode<GElementNode>;
  static createHTML(
    name: string,
    options?: ElementCreationOptions,
  ): VirtualReactiveElementNode<HTMLElement> {
    return new (this)<HTMLElement>(
      HTML_NAMESPACE_URI_CONSTANT,
      name,
      options,
    );
  }

  static createSVG<GKey extends keyof SVGElementTagNameMap>(
    name: GKey,
    options?: ElementCreationOptions,
  ): VirtualReactiveElementNode<SVGElementTagNameMap[GKey]>;
  static createSVG<GElementNode extends SVGElement>(
    name: string,
    options?: ElementCreationOptions,
  ): VirtualReactiveElementNode<GElementNode>;
  static createSVG(
    name: string,
    options?: ElementCreationOptions,
  ): VirtualReactiveElementNode<SVGElement> {
    return new (this)<SVGElement>(
      SVG_NAMESPACE_URI_CONSTANT,
      name,
      options,
    );
  }

  static createMathML<GElementNode extends Element>(
    name: string,
    options?: ElementCreationOptions,
  ): VirtualReactiveElementNode<GElementNode> {
    return new (this)<GElementNode>(
      MATH_ML_NAMESPACE_URI_CONSTANT,
      name,
      options,
    );
  }

  /* EVENT LISTENER */

  on$<GEvent extends Event>(
    type: string,
  ): IObservable<GEvent> {
    return fromEventTarget<string, GEvent>(this._elementNode as any, type);
  }

  /* PROPERTY */

  setReactiveProperty<GPropertyKey extends keyof GElementNode>(
    propertyKey: GPropertyKey,
    value$: IObservable<GElementNode[GPropertyKey]>,
  ): void {
    this.onConnected$(value$)((value: GElementNode[GPropertyKey]): void => {
      this.setProperty<GPropertyKey>(propertyKey, value);
    });
  }

  /* ATTRIBUTE */

  setReactiveAttribute(
    name: string,
    value$: IObservable<IAttributeValue>,
  ): void {
    this.onConnected$(value$)((value: IAttributeValue): void => {
      this.setAttribute(name, value);
    });
  }

  /* CLASS */

  setReactiveClass(
    name: string,
    enabled$: IObservable<boolean>,
  ): void {
    this.onConnected$(enabled$)((enabled: boolean): void => {
      this.setClass(name, enabled);
    });
  }

  setReactiveClassNamesList(
    classNamesList$: IObservable<IClassNamesList>,
  ): void {
    let previousClassNames: IClassNamesList = new Set<string>();

    this.onConnected$(classNamesList$)((classNamesList: IClassNamesList): void => {
      const nextClassNames: string[] = differClassNames(previousClassNames, classNamesList);

      const iterator: IterableIterator<string> = previousClassNames.values();
      let result: IteratorResult<string>;
      while (!(result = iterator.next()).done) {
        this.setClass(result.value, false);
      }

      for (let i = 0, l = nextClassNames.length; i < l; i++) {
        this.setClass(nextClassNames[i], true);
      }

      previousClassNames = new Set<string>(classNamesList);
    });
  }

  /* STYLE */

  setReactiveStyleProperty(
    name: string,
    styleProperty$: IObservable<ISetStyleProperty>,
  ): void {
    this.onConnected$(styleProperty$)((styleProperty: ISetStyleProperty): void => {
      this.setStyleProperty(name, styleProperty);
    });
  }

  setReactiveStylePropertiesMap(
    stylePropertiesMap$: IObservable<IStylePropertiesMap>,
  ): void {
    let previousStyles: IStylePropertiesMap = new Map<string, ISetStyleProperty>();
    this.onConnected$(stylePropertiesMap$)((stylePropertiesMap: IStylePropertiesMap): void => {
      const nextStyles: IStylePropertyAndValueTuple[] = differStylePropertiesMap(previousStyles, stylePropertiesMap);

      const iterator: IterableIterator<string> = previousStyles.keys();
      let result: IteratorResult<string>;
      while (!(result = iterator.next()).done) {
        this.setStyleProperty(result.value, null);
      }

      for (let i = 0, l = nextStyles.length; i < l; i++) {
        const [name, property]: [string, ISetStylePropertyOrNull] = nextStyles[i];
        this.setStyleProperty(name, property);
      }

      previousStyles = new Map<string, ISetStyleProperty>(stylePropertiesMap);
    });
  }
}

