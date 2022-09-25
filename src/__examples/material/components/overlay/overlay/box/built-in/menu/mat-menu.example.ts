import { IObservable, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent } from '@lirx/dom';
import { IconCloseComponent, IconMailboxComponent } from '@lirx/mdi';
import { MatOverlayManager } from '../../../../manager/mat-overlay-manager';
import { MatMenuItemIconComponent } from './components/menu-item-icon/mat-menu-item-icon.component';
import { MatMenuItemTextComponent } from './components/menu-item-text/mat-menu-item-text.component';
import { MatMenuComponent } from './mat-menu.component';
import { MatMenuItemComponent } from './components/menu-item/mat-menu-item.component';

/*----------------------------*/

interface IData {
  readonly element$: IObservable<HTMLElement>;
}

interface IMatTooltipExampleComponentConfig {
  element: HTMLElement;
  data: IData;
}

const MatTooltipExampleComponent = createComponent<IMatTooltipExampleComponentConfig>({
  name: 'mat-menu-example',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <mat-menu
        $[element]="$.element$"
      >
        <mat-menu-item $[disabled]="true">
          <mat-menu-item-icon>
            <icon-mailbox></icon-mailbox>
          </mat-menu-item-icon>
          <mat-menu-item-text>
            Send
          </mat-menu-item-text>
        </mat-menu-item>
        
        <mat-menu-item>
          <mat-menu-item-icon>
            <icon-close></icon-close>
          </mat-menu-item-icon>
          <mat-menu-item-text>
            Remove
          </mat-menu-item-text>
        </mat-menu-item>
        
<!--         <mat-menu-item>-->
<!--          <mat-menu-item-icon>-->
<!--            <icon-close></icon-close>-->
<!--          </mat-menu-item-icon>-->
<!--          <mat-menu-item-text>-->
<!--            aaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaa-->
<!--          </mat-menu-item-text>-->
<!--        </mat-menu-item>-->
      </mat-menu>
    `,
    customElements: [
      MatMenuComponent,
      MatMenuItemComponent,
      MatMenuItemIconComponent,
      MatMenuItemTextComponent,
      IconCloseComponent,
      IconMailboxComponent,
    ],
  }),
  styles: [
    compileStyleAsComponentStyle(`
      :host {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
    `),
  ],
  init: (): IData => {
    const element$ = single<HTMLElement>(document.querySelector('button')!);

    return {
      element$,
    };
  },
});

/*----------------------------*/

export function matMenuExample(): void {

  const button = document.createElement('button');
  button.innerText = 'open';
  document.body.appendChild(button);

  button.onclick = () => {
    // button.style.marginTop = ((button.style.marginTop ? parseFloat(button.style.marginTop) : 0) + 50).toString(10) + 'px';
    manager.open(MatTooltipExampleComponent);
  };

  const manager = MatOverlayManager.create();
  manager.open(MatTooltipExampleComponent);
}
