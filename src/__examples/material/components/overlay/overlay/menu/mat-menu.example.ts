import { compileReactiveHTMLAsComponentTemplate, bootstrap, Component, compileStyleAsComponentStyle } from '@lirx/dom';
import { FocusStack, MatScrollbarModifier, MatMenuComponent, MatMenuTriggerModifier, MatMenuItemModifier } from '@lirx/dom-material';
import { IconEarthComponent } from '@lirx/mdi';

/*----------------------------*/

const MyMenu = new Component({
  name: 'my-menu',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <rx-template
        as="floatingContent"
        let-overlay
      >
        <mat-menu #mat-scrollbar>
          <button #mat-menu-item>Item 1ttttttttttttttttttttttttttttttttttttttttttttttt</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>
            <icon-earth></icon-earth>
          Item 2
          </button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
          <button #mat-menu-item>Item 2</button>
        </mat-menu>
      </rx-template>
      
      <button
        #mat-menu-trigger="{ content: floatingContent }"
      >
        Click me
      </button>
    `,
    components: [
      MatMenuComponent,
      IconEarthComponent,
    ],
    modifiers: [
      MatMenuTriggerModifier,
      MatMenuItemModifier,
      MatScrollbarModifier,
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
});

/*----------------------------*/

/*----------------------------*/

export function matMenuExample(): void {
  FocusStack.init();
  bootstrap(MyMenu);
}
