import { compileReactiveHTMLAsComponentTemplate, bootstrap, compileStyleAsComponentStyle, Component } from '@lirx/dom';
import { FocusStack, MatFloatingTriggerModifier } from '@lirx/dom-material';

/*----------------------------*/

const MyFloating = new Component({
  name: 'my-floating',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <rx-template
        as="floatingContent"
        let-overlay
      >
          <button
            (click)="() => overlay.close()"
          >
            Close
          </button>
          some content
          some content
          some content
          some content
          some content
          some content
          some content
          some content
          some content
          some content
          some content
          some content
          some content
          some content
          some content
          some content
          some content
          some content
          some content
      </rx-template>
      
      <button
        #mat-floating-trigger="{ content: floatingContent }"
      >
        Click me
      </button>
    `,
    modifiers: [
      MatFloatingTriggerModifier,
    ],
  }),
  styles: [
    compileStyleAsComponentStyle(`
    :host {
      display: block;
      padding: 50px;
    }
  `),
  ],
  templateData: () => {

  },
});

/*----------------------------*/

/*----------------------------*/

export function matFloatingExample(): void {
  FocusStack.init();
  bootstrap(MyFloating);
}
