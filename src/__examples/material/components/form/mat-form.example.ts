// class InputController {
//   protected readonly _input: HTMLInputElement;
//
//   constructor(
//     input: HTMLInputElement,
//   ) {
//     this._input = input;
//   }
//
//   get input(): HTMLInputElement {
//     return this._input;
//   }
// }
//
// class InputPristineController extends InputController {
//   protected readonly _$pristine$: IMulticastReplayLastSource<boolean>;
//   protected readonly _pristine$: IObservable<boolean>;
//   constructor(
//     input: HTMLInputElement,
//   ) {
//     super(input);
//     this._$pristine$ = let$$<boolean>(true);
//     this._pristine$ = distinct$$(this._$pristine$.subscribe);
//
//     fromEventTarget(input, 'input')(() => this._$pristine$.emit(false));
//   }
//
//   get pristine(): boolean {
//     return this._$pristine$.getValue();
//   }
//
//  get pristine$(): IObservable<boolean> {
//     return this._pristine$;
//   }
//
//   reset(): void {
//     this._$pristine$.emit(true);
//   }
// }
//
// class InputTouchedController extends InputController {
//   protected readonly _$touched$: IMulticastReplayLastSource<boolean>;
//   protected readonly _touched$: IObservable<boolean>;
//
//   constructor(
//     input: HTMLInputElement,
//   ) {
//     super(input);
//     this._$touched$ = let$$<boolean>(false);
//     this._touched$ = distinct$$(this._$touched$.subscribe);
//     fromEventTarget(input, 'blur')(() => this._$touched$.emit(true));
//   }
//
//   get touched(): boolean {
//     return this._$touched$.getValue();
//   }
//
//   get touched$(): IObservable<boolean> {
//     return this._touched$;
//   }
//
//   reset(): void {
//     this._$touched$.emit(false);
//   }
// }

/*---------*/

// abstract class InputController2<GValue> {
//   protected readonly _input: HTMLInputElement;
//
//   protected constructor(
//     input: HTMLInputElement,
//   ) {
//     this._input = input;
//   }
//
//   get input(): HTMLInputElement {
//     return this._input;
//   }
//
//   abstract getValue(): GValue | null;
//
//   abstract setValue(
//     value: GValue | null,
//   ): void;
// }
//
//
//
// class NumberInputController extends InputController2<number> {
//
//   protected _min: number | null;
//
//   constructor(
//     input: HTMLInputElement,
//   ) {
//     super(input);
//     this._min = null;
//   }
//
//   getValue(): number | null {
//     return Number(this._input);
//   }
//
//   setValue(
//     value: number | null,
//   ): void {
//   }
//
//   setMin(): number | null {
//
//   }
// }

// function createValidator<GOptions extends object, GValue>(
//   options: GOptions,
//   verify: (value: GValue) => boolean,
//   onInvalid: (options: GOptions) => string,
// ) {
//   return (
//     value: GValue,
//   ): string | undefined => {
//     return verify(value)
//       ? onInvalid(options)
//       : void 0;
//   };
// }
//
// function minLengthValidator(
//   minLength: number,
//   onInvalid: () => string,
// ) {
//   return (
//     value: string,
//   ): string | undefined => {
//     return (value.length < minLength);
//   };
// }

/*---------*/

/*
 TODO write the specs for a good validator
  - must support custom message
  - must support many parallel errors
 */


/*---------*/

export function matFormExample() {
  const input = document.createElement('input');
  document.body.appendChild(input);

  // const pristineController = new InputPristineController(input);
  //
  // pristineController.pristine$($log);

}
