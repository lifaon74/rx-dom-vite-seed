import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, VirtualRootNode } from '@lirx/dom';

// @ts-ignore
import html from './debug-reactive-dom-compiler-3.rxhtml?raw';
// @ts-ignore
import style from './debug-reactive-dom-compiler.scss?inline';

async function fatHTMLGenerator(
  length: number = 1e3,
): Promise<void> {
  const lines: string[] = Array.from({ length }, (_, index: number): string => {
    return `<div>${index}</div>`;
  });

  await navigator.clipboard.writeText(lines.join('\n'));
}

// async function debugReactiveDOMCompiler1() {
//
//   // const template = await loadReactiveHTMLAsComponentTemplate({
//   //   url: new URL('./debug-reactive-dom-compiler-3.rxhtml', import.meta.url),
//   //   // customElements: [
//   //   //   HTMLElement,
//   //   //   HTMLAnchorElement,
//   //   // ],
//   //   modifiers: [
//   //     {
//   //       name: 'modifier',
//   //       modify: (_: Element) => _,
//   //     },
//   //   ],
//   // });
//
//   // const template = compileReactiveHTMLAsComponentTemplate({ html: 'abc' });
//   const template = compileReactiveHTMLAsComponentTemplate({ html });
//
//   template(
//     VirtualRootNode.body,
//     {},
//     null as any,
//   );
// }

async function debugReactiveDOMCompiler2() {

  // const componentStyle = await loadAndCompileReactiveCSSAsComponentStyle(
  //   new URL('./debug-reactive-dom-compiler.rxhtml', import.meta.url)
  // );

  const componentStyle = compileStyleAsComponentStyle(style);
  // const componentStyle = compileStyleAsComponentStyle(`
  //   :host {
  //     background-color: red;
  //   }
  // `);
  // const componentStyle = compileStyleAsComponentStyle(':host { background-image: red }');
  componentStyle(VirtualRootNode.body);
}

// https://www.w3schools.com/graphics/svg_examples.asp


/*----*/


export async function debugReactiveDOMCompiler() {
  // fatHTMLGenerator(5e4);
  // await debugReactiveDOMCompiler1();
  await debugReactiveDOMCompiler2();
  // await debugReactiveDOMCompiler3();
}
