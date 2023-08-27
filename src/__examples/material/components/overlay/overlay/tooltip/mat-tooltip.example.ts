import { compileReactiveHTMLAsComponentTemplate, bootstrap, Component, compileStyleAsComponentStyle } from '@lirx/dom';
import { MatOverlayContainer, MatTooltipComponent, MatTooltipTriggerModifier, MatTooltipModifier } from '@lirx/dom-material';

/*----------------------------*/

const MyTooltip = new Component({
  name: 'my-tooltip',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <rx-template as="tooltipContent">
        <mat-tooltip>
          Hello world !
          {{ 'Hello world !'.repeat(100) }}
        </mat-tooltip>
      </rx-template>
      
      <button
        #mat-tooltip-trigger="{ content: tooltipContent, placement: 'left' }"
      >
        Click me
      </button>
      
      <button
        #mat-tooltip="'Hello world !'.repeat(100)"
      >
        Click me
      </button>
    `,
    components: [
      MatTooltipComponent,
    ],
    modifiers: [
      MatTooltipTriggerModifier,
      MatTooltipModifier,
    ],
  }),
  styles: [
    compileStyleAsComponentStyle(`
      :host {
        display: block;
        padding: 200px;
      }
      
      *:focus {
        outline: 2px solid red;
      }
  `),
  ],
});

/*----------------------------*/

/*----------------------------*/

export function matTooltipExample(): void {
  bootstrap(MyTooltip);
  MatOverlayContainer.init();
}
