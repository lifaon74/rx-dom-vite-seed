import {
  bootstrap,
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualTextNode,
} from '@lirx/dom';
import {
  MatBasicButtonPrimaryModifier,
  MatBasicButtonSecondaryModifier, MatButtonModifier,
  MatFlatButtonPrimaryModifier, MatFlatButtonSecondaryModifier,
} from '@lirx/dom-material';



/* BASIC */


function matBasicButtonPrimaryExample(): void {
  interface IConfig {
    element: HTMLElement;
  }

  const MatBasicButtonPrimaryExampleComponent = createComponent<IConfig>({
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
  interface IConfig {
    element: HTMLElement;
  }

  const MatBasicButtonSecondaryExampleComponent = createComponent<IConfig>({
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
  interface IConfig {
    element: HTMLElement;
  }

  const MatFlatButtonPrimaryExampleComponent = createComponent<IConfig>({
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
  interface IConfig {
    element: HTMLElement;
  }

  const MatFlatButtonSecondaryExampleComponent = createComponent<IConfig>({
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
  interface IConfig {
    element: HTMLElement;
  }

  const MatButtonExampleComponent = createComponent<IConfig>({
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

/*---------------*/

export function matButtonExample(): void {
  matDefaultButtonExample();
  matBasicButtonExample();
  matFlatButtonExample();
}
