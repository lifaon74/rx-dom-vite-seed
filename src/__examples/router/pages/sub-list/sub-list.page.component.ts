import { compileReactiveHTMLAsComponentTemplate, createComponent } from '@lirx/dom';

/** COMPONENT **/

interface IAppSubListPageComponentConfig {
}

export const AppSubListPageComponent = createComponent<IAppSubListPageComponentConfig>({
  name: 'app-sub-list-page',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <div class="header">
        Sub-list page
      </div>
    `,
  }),
});

