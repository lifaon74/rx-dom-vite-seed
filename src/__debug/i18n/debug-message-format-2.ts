import { map$$, single, toObservableThrowIfUndefined } from '@lirx/core';
import { VirtualContainerNode, VirtualDOMNode, VirtualReactiveTextNode, VirtualRootNode, VirtualTextNode } from '@lirx/dom';
import { ILocalesInput } from './intl/locale/locales-input.type';
import { getIntlMessageFormat } from './intl/message-format/get-intl-message-format';
import {
  IGenericMessageKind,
  IMessageFormatRuntimeOptions,
  isMessageLiteral,
  isMessageValue,
  isResolvedMessage,
} from './intl/message-format/message-format.type';

/*
proposal: https://github.com/tc39/proposal-intl-messageformat
polyfill: https://github.com/messageformat/messageformat/tree/master/packages/mf2-messageformat
mf2 spec: https://github.com/unicode-org/message-format-wg/blob/main/spec/syntax.md
 */

// https://tc39.es/ecma402/#sec-canonicalizelocalelist

/*--------------*/

function messageValueToVirtualDOMNode(
  input: IGenericMessageKind,
  // markupElements: ReadonlyMap<string, IMarkupElementEntry>,
): VirtualDOMNode {
  if (isMessageLiteral(input)) {
    return new VirtualTextNode(input.value);
  } else if (isMessageValue(input)) {
    return new VirtualReactiveTextNode(
      map$$(
        toObservableThrowIfUndefined(input.value),
        String,
      ),
    );
  } else if (isResolvedMessage(input)) {
    const node: VirtualContainerNode = new VirtualContainerNode();
    for (let i = 0, l = input.value.length; i < l; i++) {
      const message: IGenericMessageKind = input.value[i];
      messageValueToVirtualDOMNode(input.value[i]).attach(node);
    }
    return node;
  } else {
    throw new Error(`Unknown MessageValue: ${input.type}`);
  }
}

/*--------------*/

export function debugMessageFormat2(): void {

  // const locale = 'en-US';
  const locale = 'fr';
  // const msg = '{Hello world !}';
  // const msg = '{Hello, {$userName}!}';
  const msg = '{{+button}{+link}Submit{-link}{-button}}';
  // const msg = '{Today is {$today :datetime dateStyle=medium}}';
  // const msg = '{Hello, {$userObj :person firstName=long}!}';
  // const msg = '{{+button}{+link}Submit{-link}{-button} or {+link}cancel{-link}.}';
  // const msg = '{{:html tag=a}Submit}';

  console.log(getIntlMessageFormat());
  const mf = new (getIntlMessageFormat())(msg, locale, {
    runtime: {
      // person: {
      //   call(
      //     locales: ILocalesInput,
      //     options: IMessageFormatRuntimeOptions,
      //     value: IGenericMessageValue,
      //   ): string {
      //     // console.log(locales, options, value);
      //
      //     switch (value.type) {
      //       case 'value':
      //         return `${(value.value as any).firstName} ${(value.value as any).lastName}`;
      //       default:
      //         return '';
      //     }
      //   },
      //   options: 'string',
      // },

      html: {
        call(
          locales: ILocalesInput,
          options: IMessageFormatRuntimeOptions,
          value: IGenericMessageKind,
        ): string {
          console.log(locales, options, value);

          return 'abc';
        },
        options: 'string',
      },
    },
  });

  console.log(mf);

  const resolved = mf.resolveMessage({
    userName: single('Bob'),
    // today: new Date('2022-02-02'),
    userObj: {
      firstName: 'Valentin',
      lastName: 'Richard',
    },
  });

  console.log(resolved);

  const node = messageValueToVirtualDOMNode(resolved);

  console.log(node);
  node.attach(VirtualRootNode.body);
  // console.log(replaceMessageValueMarkupElements(resolved).toString());
}
