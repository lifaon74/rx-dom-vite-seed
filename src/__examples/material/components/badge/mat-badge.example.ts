import { signal } from '@lirx/core';
import { bootstrap, compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, Component } from '@lirx/dom';
import { MatBadgeModifier } from '@lirx/dom-material';

interface IConfig {
  element: HTMLElement;
}

const MatBadgeExampleComponent = new Component({
  name: 'mat-badge-example',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <button
        (click)="() => $.dot.set(!$.dot())"
        #mat-badge="10"
        [class.mat-badge-dot]="$.dot"
      >
        Click to toggle mat-dot
      </button>
    `,
    modifiers: [
      MatBadgeModifier,
    ],
  }),
  styles: [compileStyleAsComponentStyle(`
    :host {
      display: block;
      padding: 20px;
    }
  `)],
  templateData: () => {
    return {
      dot: signal(false),
    };
  },
});

export function matBadgeExample() {
  bootstrap(MatBadgeExampleComponent);
  // const badge = bootstrap(MatBadgeComponent, new Map([
  //   ['*', (parentNode) => new VirtualTextNode('some text').attach(parentNode)],
  // ]));
  //
  // // badge.inputs.set('content', 'abc abc abc abc abc abc abc abc abc abc abc abc abc abc');
  // badge.inputs.set('content', '10');
  // badge.setStyleProperty('font-size', '40px');
  // badge.setStyleProperty('background-color', 'red');
  // // badge.setClass('mat-dot', true);
  //
  // document.body.style.padding = '40px';
}
