import {
  IObservable,
  IObserver,
} from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  VirtualComponentNode,
  Component,
  Input,
  input,
  Output,
  output,
} from '@lirx/dom';

// @ts-ignore
import html from './mat-button-page.component.html?raw';
// @ts-ignore
import style from './mat-button-page.component.scss?inline';
import {
  MatBasicButtonPrimaryModifier,
  MatBasicButtonSecondaryModifier,
  MatFlatButtonPrimaryModifier,
  MatFlatButtonSecondaryModifier,
  MatButtonModifier,
  MatIconButtonModifier,
  MatStrokedButtonPrimaryModifier,
  MatStrokedButtonSecondaryModifier,
} from '@lirx/dom-material';
import { IconHomeComponent } from '@lirx/mdi';

/**
 * COMPONENT: 'mat-button-page'
 */
export interface IMatButtonPageComponentData {
  readonly value: Input<string>;
  readonly valueChange: Output<string>;
}

interface ITemplateData {
  readonly value$: IObservable<string>;
  readonly $valueChange: IObserver<string>;
}

export const MatButtonPageComponent = new Component<HTMLElement, IMatButtonPageComponentData, ITemplateData>({
  name: 'mat-button-page',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      IconHomeComponent,
    ],
    modifiers: [
      MatButtonModifier,
      MatIconButtonModifier,
      MatBasicButtonPrimaryModifier,
      MatBasicButtonSecondaryModifier,
      MatFlatButtonPrimaryModifier,
      MatFlatButtonSecondaryModifier,
      MatStrokedButtonPrimaryModifier,
      MatStrokedButtonSecondaryModifier,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IMatButtonPageComponentData => {
    return {
      value: input<string>(),
      valueChange: output<string>(),
    };
  },
  templateData: (node: VirtualComponentNode<HTMLElement, IMatButtonPageComponentData>): ITemplateData => {
    const value$ = node.input$('value');
    const $valueChange = node.$output('valueChange');

    return {
      value$,
      $valueChange,
    };
  },
});
