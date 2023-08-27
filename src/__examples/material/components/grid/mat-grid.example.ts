import { bootstrap, compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, Component } from '@lirx/dom';
import { MatGridComponent, MatGridItemComponent } from '@lirx/dom-material';

export const MatGridExampleComponent = new Component({
  name: 'mat-grid-example',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <mat-grid $[rows]="'auto'">
        <mat-grid-item $[position]="[1, 0, 3, 3]" style="background: #acacff">A</mat-grid-item>
        <mat-grid-item $[position]="[4, 0, 2, 2]" style="background: #ffacd8">B</mat-grid-item>
        <mat-grid-item $[position]="[6, 0, 1, 3]" style="background: #acffd6">C</mat-grid-item>
        <mat-grid-item $[position]="[4, 2, 2, 1]" style="background: #ffd1ac">D</mat-grid-item>
      </mat-grid>
    `,
    components: [
      MatGridComponent,
      MatGridItemComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(`
    :host {
      display: block;
    }
  `)],
});

/** BOOTSTRAP FUNCTION **/

export function matGridExample() {
  bootstrap(MatGridExampleComponent);
}
