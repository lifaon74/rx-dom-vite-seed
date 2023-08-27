import { bootstrap, compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, Component } from '@lirx/dom';
import {
  MatBasicButtonPrimaryModifier,
  MatBasicButtonSecondaryModifier,
  MatButtonModifier,
  MatFlatButtonPrimaryModifier,
  MatFlatButtonSecondaryModifier, MatButtonsGroupComponent,
} from '@lirx/dom-material';

/* BASIC */

function matBasicButtonPrimaryExample(): void {
  const MatBasicButtonPrimaryExampleComponent = new Component({
    name: 'mat-basic-button-primary-example',
    template: compileReactiveHTMLAsComponentTemplate({
      html: `
        <button #mat-basic-button-primary>
          MatBasicButtonPrimary
        </button>
      `,
      modifiers: [
        MatBasicButtonPrimaryModifier,
      ],
    }),
    styles: [compileStyleAsComponentStyle(`
      :host {
        display: block;
        padding: 10px;
      }
    `)],
  });

  bootstrap(MatBasicButtonPrimaryExampleComponent);
}

function matBasicButtonSecondaryExample(): void {
  const MatBasicButtonSecondaryExampleComponent = new Component({
    name: 'mat-basic-button-secondary-example',
    template: compileReactiveHTMLAsComponentTemplate({
      html: `
        <button #mat-basic-button-secondary>
          MatBasicButtonSecondary
        </button>
      `,
      modifiers: [
        MatBasicButtonSecondaryModifier,
      ],
    }),
    styles: [compileStyleAsComponentStyle(`
      :host {
        display: block;
        padding: 10px;
      }
    `)],
  });

  bootstrap(MatBasicButtonSecondaryExampleComponent);
}

function matBasicButtonExample(): void {
  matBasicButtonPrimaryExample();
  matBasicButtonSecondaryExample();
}

/* FLAT */

function matFlatButtonPrimaryExample(): void {
  const MatFlatButtonPrimaryExampleComponent = new Component({
    name: 'mat-flat-button-primary-example',
    template: compileReactiveHTMLAsComponentTemplate({
      html: `
        <button #mat-flat-button-primary>
          MatFlatButtonPrimary
        </button>
      `,
      modifiers: [
        MatFlatButtonPrimaryModifier,
      ],
    }),
    styles: [compileStyleAsComponentStyle(`
      :host {
        display: block;
        padding: 10px;
      }
    `)],
  });

  bootstrap(MatFlatButtonPrimaryExampleComponent);
}

function matFlatButtonSecondaryExample(): void {
  const MatFlatButtonSecondaryExampleComponent = new Component({
    name: 'mat-flat-button-secondary-example',
    template: compileReactiveHTMLAsComponentTemplate({
      html: `
        <button #mat-flat-button-secondary>
          MatFlatButtonSecondary
        </button>
      `,
      modifiers: [
        MatFlatButtonSecondaryModifier,
      ],
    }),
    styles: [compileStyleAsComponentStyle(`
      :host {
        display: block;
        padding: 10px;
      }
    `)],
  });

  bootstrap(MatFlatButtonSecondaryExampleComponent);
}

function matFlatButtonExample(): void {
  matFlatButtonPrimaryExample();
  matFlatButtonSecondaryExample();
}

/* DEFAULT */

function matDefaultButtonExample(): void {
  const MatButtonExampleComponent = new Component({
    name: 'mat-button-example',
    template: compileReactiveHTMLAsComponentTemplate({
      html: `
        <button #mat-button>
          MatButton
        </button>
      `,
      modifiers: [
        MatButtonModifier,
      ],
    }),
    styles: [compileStyleAsComponentStyle(`
      :host {
        display: block;
        padding: 10px;
      }
    `)],
  });

  bootstrap(MatButtonExampleComponent);
}

/* GROUP */

function matButtonsGroupExample(): void {
  const MatButtonExampleComponent = new Component({
    name: 'mat-button-example',
    template: compileReactiveHTMLAsComponentTemplate({
      html: `
        <mat-buttons-group>
          <button #mat-button>
            MatButton
          </button>
          <button #mat-basic-button-primary>
            MatBasicButtonPrimary
          </button>
          <button #mat-basic-button-secondary>
            MatBasicButtonSecondary
          </button>
        </mat-buttons-group>
        
        <mat-buttons-group>
          <button #mat-flat-button-primary>
            MatFlatButtonPrimary
          </button>
          <button #mat-flat-button-secondary>
            MatFlatButtonSecondary
          </button>
        </mat-buttons-group>
       
      `,
      components: [
        MatButtonsGroupComponent,
      ],
      modifiers: [
        MatButtonModifier,
        MatBasicButtonPrimaryModifier,
        MatBasicButtonSecondaryModifier,
        MatFlatButtonPrimaryModifier,
        MatFlatButtonSecondaryModifier,
      ],
    }),
    styles: [compileStyleAsComponentStyle(`
      :host {
        display: block;
        padding: 10px;
      }
    `)],
  });

  bootstrap(MatButtonExampleComponent);
}

/*---------------*/

export function matButtonExample(): void {
  matDefaultButtonExample();
  matBasicButtonExample();
  matFlatButtonExample();
  matButtonsGroupExample();
}
