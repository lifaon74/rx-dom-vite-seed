import { fromEventTarget, interval, IObservable, logState$$, map$$, merge, scan$$, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate } from '../component/template/compile-reactive-html-as-component-template';
import { createComponent, IComponentTemplate } from '../component/create/create-component';
import { VirtualReactiveElementNode } from '../virtual-node/dom/nodes/reactive/element/virtual-reactive-element-node.class';
import { VirtualReactiveForLoopNode } from '../virtual-node/dom/nodes/reactive/for-loop/virtual-reactive-for-loop-node.class';
import { VirtualReactiveIfNode } from '../virtual-node/dom/nodes/reactive/if/virtual-reactive-if-node.class';
import { VirtualReactiveTextNode } from '../virtual-node/dom/nodes/reactive/text/virtual-reactive-text-node.class';
import { ISetStyleProperty } from '../virtual-node/dom/nodes/static/element/style/style-property.type';
import { BODY_ROOT } from '../virtual-node/dom/nodes/static/root/virtual-root-node-body.constant';
import { VirtualRootNode } from '../virtual-node/dom/nodes/static/root/virtual-root-node.class';
import { VirtualTextNode } from '../virtual-node/dom/nodes/static/text/virtual-text-node';
import { IGenericVirtualReactiveDOMNodeTemplate } from '../virtual-node/dom/types/virtual-reactive-dom-node-template.type';
import { VirtualDOMNode } from '../virtual-node/dom/virtual-dom-node.class';
import { verifyVirtualNodeConsistency } from '../virtual-node/functions/verify-virtual-node-consistency';

const ROOT = BODY_ROOT;

function createTextObservable(
  name: string,
): IObservable<string> {
  return logState$$(map$$(interval(100), () => new Date().toISOString()), name);
}

function createConditionObservable(
  name: string,
): IObservable<boolean> {
  return logState$$(scan$$(interval(1000), (enabled: boolean) => !enabled, false), name);
  // return merge([false, map$$(timeout(1000), (enabled: boolean) => !enabled, false), name);
}

function createClassNamesListObservable(
  name: string,
): IObservable<Set<string>> {
  return logState$$(map$$(scan$$(interval(1000), (enabled: boolean) => !enabled, false), (enabled: boolean) => new Set(enabled ? ['a', 'b'] : [])), name);
}

function createStylePropertyObservable(
  name: string,
): IObservable<ISetStyleProperty> {
  return logState$$(map$$(scan$$(interval(100), (size: number) => (size + 1) % 20, 0), (size: number) => ({ value: `${size}px` })), name);
}

function createStylePropertiesMapObservable(
  name: string,
): IObservable<Map<string, ISetStyleProperty>> {
  return logState$$(map$$(scan$$(interval(1000), (enabled: boolean) => !enabled, false), (enabled: boolean) => new Map(enabled ? [['background-color', { value: 'red' }]] : [])), name);
}

interface GItem {
  name: string;
}

function createItemsObservable(
  name: string,
  length: number = 1e1,
): IObservable<GItem[]> {
  const items = Array.from({ length }, (_, index: number): GItem => {
    return {
      name: `#${index}`,
    };
  });

  // const mapFunction = () => items.slice(0, Math.floor(Math.random() * items.length));
  const mapFunction = () => items.slice().sort(() => Math.random() < 0.5 ? -1 : 1);

  return logState$$(map$$(merge([fromEventTarget(window, 'click'), single(void 0)]), mapFunction), name);
}

function createDummyTemplateFunction(
  name: string,
): IGenericVirtualReactiveDOMNodeTemplate {
  return (
    parentNode: VirtualDOMNode,
  ): void => {
    new VirtualTextNode(`template: ${name}`).attach(parentNode);
  };
}

/*-----------*/

function testReactiveTextNode(): void {
  const date$ = createTextObservable('date');
  const node = new VirtualReactiveTextNode(date$);

  node.attach(ROOT);

  setTimeout(() => node.detach(), 2000);
}

function testReactiveAttribute(): void {
  const date$ = createTextObservable('date');
  const node = VirtualReactiveElementNode.createHTML('div');
  node.setReactiveAttribute('attr', date$);

  node.attach(ROOT);

  setTimeout(() => node.detach(), 2000);
}

function testReactiveClass(): void {
  const enabled$ = createConditionObservable('enabled');
  const node = VirtualReactiveElementNode.createHTML('div');
  node.setReactiveClass('my-class', enabled$);

  node.attach(ROOT);

  // setTimeout(() => node.detach(), 2000);
}

function testReactiveIfNode(): void {
  // const enabled$ = createConditionObservable('enabled');
  // const enabled$ = single(true);

  const buttonNode = VirtualReactiveElementNode.createHTML('button');
  new VirtualTextNode('toggle').attach(buttonNode);
  buttonNode.attach(ROOT);

  const click$ = buttonNode.on$<MouseEvent>('click');
  const enabled$ = logState$$(merge([single(false), scan$$(click$, (enabled: boolean) => !enabled, false)]), 'enabled');

  const conditionalNode = new VirtualReactiveIfNode(
    enabled$,
    createDummyTemplateFunction('true'),
    createDummyTemplateFunction('false'),
  );
  conditionalNode.attach(ROOT);

  verifyVirtualNodeConsistency(ROOT);

  setTimeout(() => conditionalNode.detach(), 2000);
}

function testReactiveForLoopNode(): void {
  const items$ = createItemsObservable('items$');

  const forLoopNode = new VirtualReactiveForLoopNode<GItem>(
    items$,
    (
      parentNode: VirtualDOMNode,
      {
        item,
        index,
      },
    ): void => {
      const div = VirtualReactiveElementNode.createHTML('div');
      div.attach(parentNode);
      div.setAttribute('name', item.name);

      new VirtualTextNode(`${item.name} - `).attach(div);
      new VirtualReactiveTextNode(map$$(index, String)).attach(div);
    },
  );
  forLoopNode.attach(ROOT);

  verifyVirtualNodeConsistency(ROOT);

  // setTimeout(() => forLoopNode.detach(), 2000);
}

// function testCustomElementNode(): void {
//
//   // function createCustomElement(): VirtualCustomElementNode {
//   //
//   // }
//
//   // class MatButtonComponent extends HTMLButtonElement {}
//   //
//   // customElements.define('mat-button', MatButtonComponent, { extends: 'button' });
//
//   class MatButton extends VirtualCustomElementNode<HTMLButtonElement> {
//     constructor(
//       slots: IVirtualCustomElementNodeSlotsMap,
//     ) {
//       super({
//         name: 'mat-button',
//         parentName: 'button',
//         slots,
//       });
//
//       slots.get('*')!(this);
//     }
//   }
//
//   type GArguments = [
//     $: any,
//   ];
//
//   const template: IVirtualDOMNodeTemplate<GArguments> = (
//     parentNode: VirtualDOMNode,
//     $: object,
//   ): void => {
//     const buttonTemplate: IVirtualCustomElementNodeSlotTemplate = (
//       parentNode: VirtualDOMNode,
//     ): void => {
//       const node = new VirtualTextNode('toggle');
//       node.attach(parentNode);
//     };
//
//     const node = new MatButton(new Map([['*', buttonTemplate]]));
//     node.attach(parentNode);
//   };
//
//   template(ROOT, {});
// }

/*-----------------*/

/*
syntax:

- bind property: [name]="value$"
node.setReactiveProperty('name', value$);

- bind source as input: [{name}]="value$"
node.setReactiveInput('name', value$);
OR node.onConnected(value$)(node.sources.$set('name'));

- bind event listener: (name)="$value"
node.on$('name')(value$);

- bind source as output: ({name})="$value"
OR node.isConnected$(node.sources.get$('name'))($value);

 */

function testCustomElementNode(): void {
  type ISources = [
    ['disabled', boolean],
  ];

  interface IData {

  }

  // type GArguments = [
  //   $: any,
  // ];

  const template: IComponentTemplate<IData> = (
    parentNode: VirtualDOMNode,
    $: IData,
  ): void => {
    // const node = new VirtualTextNode('toggle');
    // node.attach(parentNode);
  };

  const MatButton = createComponent<HTMLButtonElement, ISources, IData>({
    name: 'mat-button',
    extends: 'button',
    template,
    inputs: [
      ['disabled'],
    ],
    init: (
      {
        slots,
        node,
        io,
      },
    ): IData => {
      const disabled$ = io.get$('disabled');
      node.setReactiveProperty('disabled', disabled$);

      slots.get('*')!(node);

      return {};
    },
  });

  const button = MatButton.create(new Map([['*', (parentNode: VirtualDOMNode) => {
    const node = new VirtualTextNode('toggle');
    node.attach(parentNode);
  }]]));

  button.attach(ROOT);
}

/*-----------*/

function debugVirtualNode(): void {
  const container = VirtualReactiveElementNode.createHTML('div');

  const date$ = logState$$(map$$(interval(1000), () => new Date().toISOString()), 'date');
  // const n3 = new VirtualTextNode('hello world !');
  const reactiveTextNode = new VirtualReactiveTextNode(date$);

  reactiveTextNode.attach(container);

  container.attach(ROOT);

  setTimeout(() => container.detach(), 2000);
}

function createSimpleMatButton() {
  type ISources = [
    ['disabled', boolean],
  ];

  interface IData {

  }

  return createComponent<HTMLButtonElement, ISources, IData>({
    name: 'mat-button',
    extends: 'button',
    inputs: [
      ['disabled', false],
    ],
    init: (
      {
        slots,
        node,
        io,
      },
    ): IData => {
      const disabled$ = io.get$('disabled');
      node.setReactiveProperty('disabled', disabled$);

      slots.get('*')!(node);

      return {};
    },
  });
}

async function debugTranspilers() {

  // const html = 'hello world';
  // const html = 'a{{$.text$}}b';
  // const html = '<strong>abc</strong>';
  // const html = '<button disabled>abc</button>';
  // const html = '<button [attr.disabled]="$.condition$">abc</button>';
  // const html = '<button [class.disabled]="$.condition$">abc</button>';
  // const html = '<button [class...]="$.classNamesList$">abc</button>';
  // const html = '<button [style.font-size]="$.styleProperty$">abc</button>';
  // const html = '<button [style...]="$.stylePropertiesMap$">abc</button>';
  // const html = '<button [disabled]="$.condition$">abc</button>';
  // const html = '<button (click)="$.$out">abc</button>';

  // const html = '<rx-container>abc</rx-container>';

  // const html = `
  //   <rx-template
  //     name="templateTrue"
  //     let-a
  //     let-b="c"
  //   >
  //     true
  //   </rx-template>
  //
  //   <rx-inject-template
  //     template="templateTrue"
  //     let-a="$"
  //   ></rx-inject-template>
  // `;

  // const html = `
  //   <rx-template
  //     name="templateTrue"
  //   >
  //     true
  //   </rx-template>
  //   <rx-template
  //     name="templateFalse"
  //   >
  //     false
  //   </rx-template>
  //   <rx-if
  //     condition="$.condition$"
  //     true="templateTrue"
  //     false="templateFalse"
  //   ></rx-if>
  // `;

  // const html = `
  //   <div *if="$.condition$">
  //     true
  //   </div>
  // `;

  // const html = `
  //   <rx-if condition="$.condition$">
  //     <rx-if-true>true</rx-if-true>
  //     <div *if-false>false</divif-false>
  //   </rx-if>
  // `;

  // const html = `
  //   <rx-template
  //     name="template"
  //     let-item="item"
  //     let-index
  //   >
  //     {{ index }} - {{ item.name }}
  //   </rx-template>
  //
  //   <rx-for-loop
  //     items="$.items$"
  //     template="template"
  //   ></rx-for-loop>
  // `;

  // const html = `
  //   <div *for="let item of $.items$; index as index">
  //    {{ index }} - {{ item.name }}
  //   </div>
  // `;

  // const html = `
  //   <rx-template
  //     name="templateDefault"
  //   >
  //     false
  //   </rx-template>
  //
  //   <rx-switch expression="$.condition$">
  //     <div *switch-case="true">
  //       true
  //     </div>
  //     <rx-switch-default
  //       template="templateDefault"
  //     ></rx-switch-default>
  //   </rx-switch>
  // `;

//   const html = `
//     <rx-inject-slot
//       name="*"
//     >
//       default content *
//     </rx-inject-slot>
//
// <!--    <div-->
// <!--      *inject-slot="slot-a"-->
// <!--    >-->
// <!--      default content A-->
// <!--    </div>-->
// <!--    -->
// <!--    <rx-inject-slot-->
// <!--      name="slot-b"-->
// <!--    >-->
// <!--      default content B-->
// <!--    </rx-inject-slot>-->
//   `;

  // const html = `<rx-script>console.log('ok');</rx-script>`;

  // const html = '<mat-button>abc</mat-button>';
  // const html = '<mat-button>1<rx-slot name="content">abc</rx-slot>2</mat-button>';
  // const html = '<mat-button>1<rx-slot name="content">abc</rx-slot>2</mat-button>';
  // const html = '<mat-button [disabled$]="$.condition$">toggle</mat-button>';
  // const html = '<mat-button ($disabled)="$.$out">abc</mat-button>';

  // @ts-ignore
  const html = await import('./assets/debug-reactive-dom-compiler-2.rxhtml?raw').then(_ => _.default);
  // const html = await import('../assets/debug-reactive-dom-compiler-3.rxhtml?raw').then(_ => _.default);
  // const html = await import('../assets/debug-reactive-dom-compiler-4.rxhtml?raw').then(_ => _.default);
  // const html = await import('../assets/debug-reactive-dom-compiler-5.rxhtml?raw').then(_ => _.default);

  const data = {
    text$: createTextObservable('text$'),
    condition$: createConditionObservable('condition$'),
    classNamesList$: createClassNamesListObservable('classNamesList$'),
    styleProperty$: createStylePropertyObservable('styleProperty$'),
    stylePropertiesMap$: createStylePropertiesMapObservable('stylePropertiesMap$'),
    items$: createItemsObservable('items$'),
    $out: (_: any) => console.log('out', _),
  };

  const slots = new Map([
    ['*', (parentNode: VirtualDOMNode) => {
      new VirtualTextNode('slot *').attach(parentNode);
    }],
    ['slot-a', (parentNode: VirtualDOMNode) => {
      new VirtualTextNode('slot A').attach(parentNode);
    }],
  ]);

  // data.stylePropertiesMap$($log);

  console.time('transpiling');
  const template = compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      createSimpleMatButton(),
    ],
  });
  console.timeEnd('transpiling');

  const buildA = () => {
    console.time('building');
    ROOT.rootNode.hidden = true;
    template(ROOT, data, slots);
    console.timeEnd('building');
  };

  const buildB = () => { // fastest
    console.time('building');
    const container = new VirtualRootNode(document.createElement('div'));
    template(container, data, slots);
    document.body.appendChild(container.rootNode);
    console.timeEnd('building');
  };

  const buildC = () => {
    requestAnimationFrame(() => {
      console.time('building');
      template(ROOT, data, slots);
      console.timeEnd('building');
    });
  };

  // buildA();
  buildB();
  // buildC();
  // (window as any).ROOT = ROOT;
}

export function debug(): void {
  // debugVirtualNode();
  // testReactiveAttribute();
  // testReactiveClass();
  // testReactiveTextNode();
  // testReactiveIfNode();
  // testReactiveForLoopNode();
  // testCustomElementNode();
  debugTranspilers();

}