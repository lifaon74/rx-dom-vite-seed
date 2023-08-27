import { bootstrap, compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, Component } from '@lirx/dom';
import { MatRippleModifier } from '@lirx/dom-material';

const MatRippleExampleComponent = new Component({
  name: 'mat-ripple-example',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <div #mat-ripple></div>
  `,
    modifiers: [
      MatRippleModifier,
    ],
  }),
  styles: [compileStyleAsComponentStyle(`
    :host {
      display: block;
      padding: 20px;
      --mat-ripple-color: rgb(255 0 0 / 0.1);
    }
    
    :host > div {
      width: 300px;
      height: 300px;
      border: 1px solid black;
    }
  `)],
});

export function matRippleExample(): void {
  bootstrap(MatRippleExampleComponent);
}
