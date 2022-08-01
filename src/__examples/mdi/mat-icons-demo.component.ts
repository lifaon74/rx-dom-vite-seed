import {
  debounceTime$$,
  fromPromiseFactory,
  functionI$$,
  IDefaultNotificationsUnion,
  IMapFilterMapFunctionReturn,
  IObservable,
  IObserver,
  ISource,
  let$$,
  map$$,
  MAP_FILTER_DISCARD,
  mapFilter$$,
  merge,
  single,
} from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  IGenericComponent,
  VirtualCustomElementNode,
  VirtualDOMNode,
} from '@lirx/dom';
import { IMatIconsListItem } from '@lirx/mdi';
import { MatDualRingLoaderComponent } from '../material/components/loaders/dual-ring-loader/mat-dual-ring-loader.component';
import { INPUT_VALUE_MODIFIER } from '../material/modifiers/input-value.modifier';
import { NODE_REFERENCE_MODIFIER } from '../material/modifiers/node-reference.modifier';

// @ts-ignore
import html from './mat-icons-demo.component.html?raw';
// @ts-ignore
import style from './mat-icons-demo.component.scss?inline';

/** COMPONENT **/

interface IIcon {
  readonly componentTagName: string;
  readonly componentName: string;
  readonly $containerRef: IObserver<VirtualDOMNode>;
}

interface IData {
  readonly $inputValue$: ISource<string>;
  readonly icons$: IObservable<readonly IIcon[]>;
  readonly count$: IObservable<number>;
  readonly total$: IObservable<number>;
}

export interface IMatIconsDemoComponentConfig {
  element: HTMLElement;
  data: IData;
}

export const MatIconsDemoComponent = createComponent<IMatIconsDemoComponentConfig>({
  name: 'mat-icons-demo',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      MatDualRingLoaderComponent,
    ],
    modifiers: [
      INPUT_VALUE_MODIFIER,
      NODE_REFERENCE_MODIFIER,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  init: (): IData => {
    const $inputValue$ = let$$<string>('');

    const { subscribe: inputValue$ } = $inputValue$;

    const inputValueDebounced$ = debounceTime$$(inputValue$, 500);

    const fetchIconsList$ = fromPromiseFactory<IMatIconsListItem[]>(() => {
      return import('@lirx/mdi')
        .then(_ => _.MAT_ICONS_LIST);
    });

    const iconsList$ = mapFilter$$(fetchIconsList$, (notification: IDefaultNotificationsUnion<IMatIconsListItem[]>): IMapFilterMapFunctionReturn<IMatIconsListItem[]> => {
      return (notification.name === 'next')
        ? notification.value
        : MAP_FILTER_DISCARD;
    });

    const allIcons$ = map$$(iconsList$, (iconsList: IMatIconsListItem[]): IIcon[] => {
      return iconsList.map(([fileName, componentTagName, componentName]: IMatIconsListItem): IIcon => {
        const loadComponent = (): Promise<IGenericComponent> => {
          return import('@lirx/mdi')
            // return import(`@lirx/mdi/src/icons/${fileName}.mjs`)
            //   .finally(() => new Promise(_ => setTimeout(_, 1000)))
            .then(_ => _[componentName] as IGenericComponent);
        };

        const $containerRef = (
          container: VirtualDOMNode,
        ): void => {
          loadComponent()
            .then((component: IGenericComponent) => {
              requestAnimationFrame(() => {
                component.create().attach(container);
              });
            });
        };

        return {
          componentTagName,
          componentName,
          $containerRef,
        };
      });
    });

    const icons$ = functionI$$(
      [allIcons$, inputValueDebounced$],
      (allIcons: IIcon[], inputValue: string): IIcon[] => {
        const reg = new RegExp(inputValue.trim(), 'i');
        return allIcons
          .filter((icon: IIcon): boolean => {
            return reg.test(icon.componentTagName);
          })
          // .slice(0, 100)
        ;
      });

    const count$ = merge([single(0), map$$(icons$, _ => _.length)]);
    const total$ = map$$(allIcons$, (allIcons: IIcon[]) => allIcons.length);

    return {
      $inputValue$,
      icons$,
      count$,
      total$,
    };
  },
});
