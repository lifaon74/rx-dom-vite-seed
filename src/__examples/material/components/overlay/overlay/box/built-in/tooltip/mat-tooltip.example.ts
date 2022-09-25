import { IObservable, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent } from '@lirx/dom';
import { MatOverlayManager } from '../../../../manager/mat-overlay-manager';
import { MatTooltipComponent } from './mat-tooltip.component';

/*----------------------------*/

interface IData {
  readonly element$: IObservable<HTMLElement>;
}

interface IMatTooltipExampleComponentConfig {
  element: HTMLElement;
  data: IData;
}

const MatTooltipExampleComponent = createComponent<IMatTooltipExampleComponentConfig>({
  name: 'mat-tooltip-example',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <mat-tooltip
        $[element]="$.element$"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt cursus nisi, eleifend vestibulum risus lobortis sagittis. In vehicula magna quis venenatis congue. Integer turpis est, fermentum vitae tortor sed, interdum gravida eros. Curabitur et vestibulum ex. Mauris lobortis mauris magna, ac gravida sapien porttitor eget. Aliquam vestibulum mauris a dui gravida, vel bibendum dolor posuere. Suspendisse vitae tempus turpis, eget elementum erat. Vivamus pretium at lacus a varius. Proin vel arcu at turpis luctus mollis sed ut risus. Maecenas vitae congue nisl. Pellentesque eu accumsan metus. Phasellus ultrices eros ut ipsum pharetra aliquam. Vestibulum erat mauris, varius at bibendum eget, pharetra in eros. Nunc accumsan enim eget turpis consequat vestibulum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt cursus nisi, eleifend vestibulum risus lobortis sagittis. In vehicula magna quis venenatis congue. Integer turpis est, fermentum vitae tortor sed, interdum gravida eros. Curabitur et vestibulum ex. Mauris lobortis mauris magna, ac gravida sapien porttitor eget. Aliquam vestibulum mauris a dui gravida, vel bibendum dolor posuere. Suspendisse vitae tempus turpis, eget elementum erat. Vivamus pretium at lacus a varius. Proin vel arcu at turpis luctus mollis sed ut risus. Maecenas vitae congue nisl. Pellentesque eu accumsan metus. Phasellus ultrices eros ut ipsum pharetra aliquam. Vestibulum erat mauris, varius at bibendum eget, pharetra in eros. Nunc accumsan enim eget turpis consequat vestibulum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt cursus nisi, eleifend vestibulum risus lobortis sagittis. In vehicula magna quis venenatis congue. Integer turpis est, fermentum vitae tortor sed, interdum gravida eros. Curabitur et vestibulum ex. Mauris lobortis mauris magna, ac gravida sapien porttitor eget. Aliquam vestibulum mauris a dui gravida, vel bibendum dolor posuere. Suspendisse vitae tempus turpis, eget elementum erat. Vivamus pretium at lacus a varius. Proin vel arcu at turpis luctus mollis sed ut risus. Maecenas vitae congue nisl. Pellentesque eu accumsan metus. Phasellus ultrices eros ut ipsum pharetra aliquam. Vestibulum erat mauris, varius at bibendum eget, pharetra in eros. Nunc accumsan enim eget turpis consequat vestibulum.
      </mat-tooltip>
    `,
    customElements: [
      MatTooltipComponent,
    ],
  }),
  styles: [
    compileStyleAsComponentStyle(`
      :host {
        position: absolute;
        inset: 0;
      }
    `)
  ],
  init: (): IData => {
    const element$ = single<HTMLElement>(document.querySelector('button')!);

    return {
      element$,
    };
  },
});

/*----------------------------*/

export function matTooltipExample(): void {
  const manager = MatOverlayManager.create();

  const button = document.createElement('button');
  button.innerText = 'open';
  document.body.appendChild(button);

  button.onclick = () => {
    button.style.marginTop = ((button.style.marginTop ? parseFloat(button.style.marginTop) : 0) + 50).toString(10) + 'px';
    // manager.open(MatTooltipExampleComponent);
  };

  manager.open(MatTooltipExampleComponent);
}
