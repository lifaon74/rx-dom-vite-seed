import {
  compileReactiveCSSAsComponentStyle, compileReactiveHTMLAsComponentTemplate, Component, OnCreate,
} from '@lifaon/rx-dom';
import { IObservable, IObserver, let$$, map$$ } from '@lifaon/rx-js-light';

/** COMPONENT **/

// the interface of the data available in the template
interface IData {
  readonly $input: IObserver<string>;
  readonly input$: IObservable<string>;
  readonly length$: IObservable<number>;
  readonly valid$: IObservable<boolean>;
}

@Component({
  name: 'app-hello-world',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <div class="input-container">
        <input
          [value]="$.input$"
          (input)="() => $.$input(node.value)"
        >
      </div>
      <div
        class="max-length-container"
        [class.valid]="$.valid$"
      >
        Length: {{ $.length$ }} / 10
      </div>
   `,
  }),
  styles: [compileReactiveCSSAsComponentStyle(`
    :host {
      display: block;
    }

    :host > .max-length-container:not(.valid) {
      color: red;
    }
  `)],
})
export class AppHelloWorldComponent extends HTMLElement implements OnCreate<IData> {
  protected readonly data: IData;

  constructor() {
    super();
    // 'input' is a source which contains and emits the value of our input
    const { emit: $input, subscribe: input$ } = let$$('');

    // 'length' is an observable whose value is computed from the length of 'input'
    const length$ = map$$(input$, (value: string) => value.length);

    // 'valid' is an observable whose value is true if 'length' is less than 10
    const valid$ = map$$(length$, (value: number) => (value <= 10));

    this.data = {
      $input,
      input$,
      length$,
      valid$,
    };
  }

  // onCreate is called when the component is created to retrieve the data to inject into the template
  public onCreate(): IData {
    return this.data;
  }
}
