import { compileReactiveHTMLAsComponentTemplate, Component } from '@lirx/dom';

/** COMPONENT **/



export const AppSubListPageComponent = new Component({
  name: 'app-sub-list-page',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <div class="header">
        Sub-list page
      </div>
    `,
  }),
});

