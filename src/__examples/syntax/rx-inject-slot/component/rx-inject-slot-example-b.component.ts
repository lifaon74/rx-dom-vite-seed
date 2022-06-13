import { compileReactiveHTMLAsComponentTemplate, createComponent, IComponentTemplate } from '@lirx/dom';

/** DATA **/

interface IData {
}

interface IAppRxInjectSlotExampleBComponentConfig {
  data: IData;
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

export const AppRxInjectSlotExampleBComponent = createComponent<IAppRxInjectSlotExampleBComponentConfig>({
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
