import { bootstrap, compileReactiveHTMLAsComponentTemplate, createComponent } from '@lirx/dom';
import { MatFlatButtonPrimaryComponent } from '@lirx/dom-material';
import { MatOverlayManager } from '../../../manager/mat-overlay-manager';
import { MatTooltipModifier } from './mat-tooltip.modifier';

/*----------------------------*/

let manager: MatOverlayManager;

interface IMatTooltipModifierExampleComponentConfig {
  element: HTMLElement;
}

const MatTooltipModifierExampleComponent = createComponent<IMatTooltipModifierExampleComponentConfig>({
  name: 'mat-tooltip',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <mat-flat-button-primary
        #tooltip="['Hello world']"
      >
        This button has a tooltip !
      </mat-flat-button-primary>
      
<!--      <rx-template-->
<!--        name="tooltip"-->
<!--      >-->
<!--         My tooltip !-->
<!--      </rx-template>-->
<!--      <mat-flat-button-primary-->
<!--        #tooltip="template_tooltip"-->
<!--      >-->
<!--        This button has a tooltip !-->
<!--      </mat-flat-button-primary>-->
    `,
    customElements: [
      MatFlatButtonPrimaryComponent,
    ],
    modifiers: [
      // createMatTooltipModifier(() => manager),
      MatTooltipModifier,
    ],
  }),
});

/*----------------------------*/

export function matTooltipModifierExample(): void {
  bootstrap(MatTooltipModifierExampleComponent);
  manager = MatOverlayManager.create();
}
