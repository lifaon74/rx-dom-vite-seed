import { compileReactiveHTMLAsComponentTemplate } from '../../../../component/template/compile-reactive-html-as-component-template';
import { createComponent, IComponentTemplate } from '../../../../component/create/create-component';

/** SOURCES **/

type ISources = [];

/** DATA **/

interface IData {
}

/** TEMPLATE **/

const template: IComponentTemplate<IData> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <div class="star-slot">
      <rx-inject-slot name="*">
        default * slot
      </rx-inject-slot>
    </div>

    <div
      class="main-slot"
      *inject-slot="main"
    >
      default main slot
    </div>
  `,
});

/** COMPONENT **/

export const AppRxInjectSlotExampleBComponent = createComponent<HTMLElement, ISources, IData>({
  name: 'app-rx-inject-slot-example-b',
  template,
  inputs: [],
  init: ({ slots }): IData => {

    // slots can be manipulated here
    // const parent = new VirtualContainerNode();
    // slots.get('main')!(parent);

    return {};
  },
});
