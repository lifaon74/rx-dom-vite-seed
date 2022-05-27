import {
  createNotification,
  defaultNotificationObserver,
  futureUnsubscribe,
  IDefaultNotificationsUnion,
  INotification,
  IObservable,
  IObserver,
  IUnsubscribe,
} from '@lirx/core';
import {
  IGenericVirtualReactiveDOMNodeTemplateOrNull,
  IVirtualReactiveDOMNodeTemplate,
} from '../../../types/virtual-reactive-dom-node-template.type';
import { VirtualContainerNode } from '../../static/container/virtual-container-node.class';

/*--------------------*/

type IVirtualReactiveAsyncNodeNotifications<GValue> =
  | INotification<'pending', void>
  | INotification<'fulfilled', GValue>
  | INotification<'rejected', unknown>
  ;

const STATIC_PENDING_NOTIFICATION = createNotification<'pending', void>('pending', void 0);

function defaultNotificationsObservableToVirtualReactiveAsyncNodeNotificationsObservable<GValue>(
  subscribe: IObservable<IDefaultNotificationsUnion<GValue>>,
): IObservable<IVirtualReactiveAsyncNodeNotifications<GValue>> {
  return (emit: IObserver<IVirtualReactiveAsyncNodeNotifications<GValue>>): IUnsubscribe => {
    let lastValue: GValue;

    return futureUnsubscribe((
      unsubscribe: IUnsubscribe,
    ): IUnsubscribe => {
      emit(STATIC_PENDING_NOTIFICATION);

      return subscribe(
        defaultNotificationObserver<GValue>(
          /* next */(value: GValue): void => {
            lastValue = value;
          },
          /* complete */(): void => {
            emit(createNotification<'fulfilled', GValue>('fulfilled', lastValue));
            unsubscribe();
          },
          /* error */(error: unknown): void => {
            emit(createNotification<'rejected', unknown>('rejected', error));
            unsubscribe();
          },
        ),
      );
    });
  };
}

/*--------------------*/

export type IVirtualReactiveAsyncNodePendingTemplate = IVirtualReactiveDOMNodeTemplate<{ value: undefined }>;
export type IVirtualReactiveAsyncNodeFulfilledTemplate<GValue> = IVirtualReactiveDOMNodeTemplate<{ value: GValue }>;
export type IVirtualReactiveAsyncNodeRejectedTemplate<GValue> = IVirtualReactiveDOMNodeTemplate<{ value: unknown }>;

export class VirtualReactiveAsyncNode<GValue> extends VirtualContainerNode {
  constructor(
    value$: IObservable<IDefaultNotificationsUnion<GValue>>,
    templatePending: IVirtualReactiveAsyncNodePendingTemplate | null = null,
    templateFulfilled: IVirtualReactiveAsyncNodeFulfilledTemplate<GValue> | null = null,
    templateRejected: IVirtualReactiveAsyncNodeRejectedTemplate<GValue> | null = null,
  ) {
    super();

    const state$: IObservable<IVirtualReactiveAsyncNodeNotifications<GValue>> = defaultNotificationsObservableToVirtualReactiveAsyncNodeNotificationsObservable<GValue>(value$);

    const getTemplate = (
      {
        name,
      }: IVirtualReactiveAsyncNodeNotifications<GValue>,
    ): IGenericVirtualReactiveDOMNodeTemplateOrNull => {
      switch (name) {
        case 'pending':
          return templatePending as IGenericVirtualReactiveDOMNodeTemplateOrNull;
        case 'fulfilled':
          return templateFulfilled as IGenericVirtualReactiveDOMNodeTemplateOrNull;
        case 'rejected':
          return templateRejected as IGenericVirtualReactiveDOMNodeTemplateOrNull;
      }
    };

    this.onConnected$<IVirtualReactiveAsyncNodeNotifications<GValue>>(state$)((notification: IVirtualReactiveAsyncNodeNotifications<GValue>): void => {
      this.detachChildren();

      const template: IGenericVirtualReactiveDOMNodeTemplateOrNull = getTemplate(notification);
      if (template !== null) {
        template(this, {
          value: notification.value,
        });
      }
    });
  }
}

