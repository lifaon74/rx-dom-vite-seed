import { combineLatest, IObservable } from '@lirx/core';
import { mapDistinctShareRL$$ } from '../../misc/map-distinct-share-replay-last-observable';
import { IGenericConstraint } from '../constraints/constraint/constraint.type';
import { FormInput, IGenericFormInput, InferFormInputName } from '../form-input/form-input.class';

export type InferFormGroupGetResult<GItem extends IGenericFormInput, GName extends InferFormInputName<GItem>> =
  Extract<GItem, FormInput<GName, any, IGenericConstraint>>
  ;

export class FormGroup<GItem extends IGenericFormInput> {
  protected readonly _items: Map<InferFormInputName<GItem>, GItem>;
  protected readonly _isValid$: IObservable<boolean>;

  constructor(
    items: Iterable<GItem>,
  ) {
    const _items: GItem[] = Array.isArray(items)
      ? items
      : Array.from(items);

    this._items = new Map<InferFormInputName<GItem>, GItem>(
      _items.map((item: GItem): [InferFormInputName<GItem>, GItem] => {
        return [
          item.name,
          item,
        ];
      }),
    );

    this._isValid$ = mapDistinctShareRL$$(
      combineLatest(
        _items.map((item: GItem): IObservable<any> => {
          return item.isValid$;
        }),
      ),
      (isValid: readonly boolean[]): boolean => {
        return isValid.every((isValid: boolean) => isValid);
      },
    );
  }

  get isValid$(): IObservable<boolean> {
    return this._isValid$;
  }

  get<GName extends InferFormInputName<GItem>>(
    name: GName,
  ): InferFormGroupGetResult<GItem, GName>;
  get(
    name: string,
  ): undefined;
  get(
    name: string,
  ): InferFormGroupGetResult<GItem, InferFormInputName<GItem>> | undefined {
    return this._items.get(name as any) as any;
  }

  items(): IterableIterator<GItem> {
    return this._items.values();
  }

  reset(): void {
    const iterator: Iterator<GItem> = this.items();
    let result: IteratorResult<GItem>;
    while (!(result = iterator.next()).done) {
      result.value.reset();
    }
  }
}
