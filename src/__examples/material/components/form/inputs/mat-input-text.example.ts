import { IObservable, single } from '@lirx/core';
import { bootstrap, compileReactiveHTMLAsComponentTemplate } from '@lirx/dom';
import { MatFlatButtonSecondaryModifier } from '@lirx/dom-material';
import { MatErrorPatternComponent } from '../components/mat-error/built-in/mat-error-pattern/mat-error-pattern.component';
import { MatErrorRequiredComponent } from '../components/mat-error/built-in/mat-error-required/mat-error-required.component';
import { MatErrorsContainerComponent } from '../components/mat-error/fragments/mat-errors-container/mat-errors-container.component';
import { MatInputContainerComponent } from '../components/mat-input-container/mat-input-container.component';
import { MatLabelComponent } from '../components/mat-label/mat-label.component';
import { FormInputText } from '../form-control/form-input/built-in/form-input-text/form-input-text.class';
import { MatInputTextComponent } from './built-in/mat-input-text/mat-input-text.component';

interface IMatInputTextComponentConfig {
  element: HTMLElement;
  data: {
    controller$: IObservable<FormInputText<string>>;
  };
}

const MatInputTextExampleComponent = createComponent<IMatInputTextComponentConfig>({
  name: 'mat-input-text-example',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <form style="padding: 10px">
        <mat-input-container>
          <mat-label $[controller]="$.controller$">
            Username
          </mat-label>
          <mat-input-text
            $[controller]="$.controller$"
          ></mat-input-text>
        
          <mat-errors-container>
            <mat-error-required $[controller]="$.controller$">
              The input is required
            </mat-error-required>
            
            <mat-error-pattern $[controller]="$.controller$">
              The input must start with "a".
            </mat-error-pattern>
            
<!--            <mat-error-pattern $[controller]="$.controller$">-->
<!--              <rx-slot name="text" let-pattern$>Pattern: {{ pattern$ }}</rx-slot>-->
<!--            </mat-error-pattern>-->
          </mat-errors-container>
        </mat-input-container>

        <button
          #mat-flat-button-secondary
          type="reset"
          style="margin-top: 50px;"
        >RESET</button>
      </form>
    `,
    components: [
      MatInputContainerComponent,
      MatLabelComponent,
      MatInputTextComponent,
      MatErrorsContainerComponent,
      MatErrorRequiredComponent,
      MatErrorPatternComponent,
    ],
    modifiers: [
      MatFlatButtonSecondaryModifier,
    ],
  }),
  init: () => {
    const controller = new FormInputText('abc', {
      required: true,
      pattern: /^a.*$/,
    });

    const controller$ = single(controller);

    (window as any).controller = controller;

    return {
      controller$,
    };
  },
});

/*----------*/

export function matInputTextExample(): void {
  bootstrap(MatInputTextExampleComponent);
}
