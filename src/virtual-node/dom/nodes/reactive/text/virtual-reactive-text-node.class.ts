import { IObservable } from '@lirx/core';
import { VirtualTextNode } from '../../static/text/virtual-text-node';

export class VirtualReactiveTextNode extends VirtualTextNode {
  constructor(
    value$: IObservable<string>,
  ) {
    super();
    this.onConnected$(value$)((value: string): void => {
      this.value = value;
    });
  }
}
