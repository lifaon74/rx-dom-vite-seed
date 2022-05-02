import * as $fs from 'fs/promises';
import * as $path from 'path';

const ROOT_PATH = $path.join($path.dirname(new URL(import.meta.url).pathname), '..');
const TEST_PATH = $path.join(ROOT_PATH, 'test');


async function generateComponent(
  {
    directoryPath,
    childCount,
    depth,
  },
) {
  const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16).padStart(14, '0');

  const componentDirectoryName = `${id}`;
  const tsFileName = `${id}.component.ts`;
  const relativeTsFilePath = $path.join(componentDirectoryName, tsFileName);

  const htmlFileName = `${id}.component.html`;
  const scssFileName = `${id}.component.scss`;
  const tagName = `app-${id}`;
  const className = `App${id}Component`;

  const componentDirectoryPath = $path.join(directoryPath, componentDirectoryName);
  const childrenDirectory = 'children';

  const children = (depth > 0)
    ? await Promise.all(
      Array.from({ length: childCount }, () => {
        return generateComponent({
          directoryPath: $path.join(componentDirectoryPath, childrenDirectory),
          childCount,
          depth: depth - 1,
        });
      }),
    )
    : [];

  const tsChildrenImport = children
    .map((
      {
        relativeTsFilePath,
        className,
      },
    ) => {
      const relativePath = $path.join('.', childrenDirectory, relativeTsFilePath.slice(0, -3));
      return `import { ${className} } from './${relativePath}';`;
    })
    .join('\n');

  const tsCustomElements = children
    .map((
      {
        className,
      },
    ) => {
      return `${className},`;
    })
    .join('\n');

  const ts = `
    import {
      compileReactiveCSSAsComponentStyle, compileReactiveHTMLAsComponentTemplate, Component, OnCreate,
    } from '@lirx/dom';
    // @ts-ignore
    import html from './${htmlFileName}?raw';
    // @ts-ignore
    import style from './${scssFileName}?inline';

    ${tsChildrenImport}
    
    /** COMPONENT **/
    
    interface IData {
    }
    
    @Component({
      name: '${tagName}',
      template: compileReactiveHTMLAsComponentTemplate({
        html,
        customElements: [
          ${tsCustomElements}
        ],
      }),
      styles: [compileReactiveCSSAsComponentStyle(style)],
    })
    export class App${id}Component extends HTMLElement implements OnCreate<IData> {
    
      protected readonly data: IData;
    
      constructor() {
        super();
    
        this.data = {};
      }
    
      public onCreate(): IData {
        return this.data;
      }
    }
  `;


  const htmlChildrenContent = children
    .map((
      {
        tagName,
      },
    ) => {
      return `<${tagName}></${tagName}>`;
    })
    .join('\n');

  const html = `
    <div class="name">
      component: ${id}
    </div>
    <div class="children">
       ${htmlChildrenContent}
    </div>
  `;

  const scss = `
    :host {
      display: block;
    }
    
    :host > .children {
      padding-left: 15px;
    }
  `;

  await $fs.mkdir(componentDirectoryPath, { recursive: true });

  await $fs.writeFile($path.join(componentDirectoryPath, tsFileName), ts);
  await $fs.writeFile($path.join(componentDirectoryPath, htmlFileName), html);
  await $fs.writeFile($path.join(componentDirectoryPath, scssFileName), scss);

  return {
    relativeTsFilePath,
    tagName,
    className,
  };
}

async function run() {

  const directoryPath = TEST_PATH;

  await $fs.rm(directoryPath, { recursive: true, force: true });

  // const childCount = 10;
  // const depth = 3;

  const childCount = 1;
  const depth = 1;

  const {
    className,
    relativeTsFilePath,
  } = await generateComponent({
    directoryPath,
    childCount,
    depth,
  });


  const tsMain = `
    import { bootstrap } from '@lirx/dom';
    import { ${className} } from './${relativeTsFilePath.slice(0, -3)}';
    
    
    function main() {
      bootstrap(new ${className}());
    }
    
    main();
  `;

  await $fs.writeFile($path.join(directoryPath, 'main.ts'), tsMain);

  console.log(`${(childCount ** depth) + 1} components generated`);
}


run();

