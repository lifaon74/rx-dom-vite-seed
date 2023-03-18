// import { MessageFormat } from 'messageformat';
import type { Message } from 'messageformat/lib/data-model';
import { ILocalesInput } from '../locale/locales-input.type';

export type IMessageFormatLocaleMatcher =
  | 'best fit'
  | 'lookup'
  ;

export interface IMessageFormatOptions {
  localeMatcher?: IMessageFormatLocaleMatcher;
  runtime?: IMessageFormatRuntime;
}

export type IMessageFormatMessage = Message;

export interface IResolvedMessageFormatOptions {
  localeMatcher: IMessageFormatLocaleMatcher;
  locales: string[];
  message: IMessageFormatMessage;
  runtime: Readonly<IMessageFormatRuntime>;
}

export interface IMessageFormatConstructor {
  new(
    source: string | IMessageFormatMessage,
    locales?: ILocalesInput,
    options?: IMessageFormatOptions,
  ): IMessageFormat;
}

export interface IMessageFormat {
  resolveMessage(
    msgParams?: Record<string, unknown>,
    onError?: (error: unknown, value: IGenericMessageKind | undefined) => void,
  ): IResolvedMessage;

  resolvedOptions(): IResolvedMessageFormatOptions;
}

/*--*/

export interface IMessageFormatRuntime {
  [key: string]: IMessageFormatRuntimeFunction<unknown>;
}

export interface IMessageFormatRuntimeFunction<GValue> {
  call(
    locales: ILocalesInput,
    options: IMessageFormatRuntimeOptions,
    arg?: IGenericMessageKind,
  ): GValue;

  options: IMessageFormatRuntimeType | Record<string, IMessageFormatRuntimeType>;
}

export type IMessageFormatRuntimeType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'any'
  | 'never'
  | string[]
  ;

export interface IMessageFormatRuntimeOptions {
  localeMatcher: IMessageFormatLocaleMatcher;

  [key: string]: unknown;
}

/*--*/

export interface ILocaleContext {
  locales: string[];
  localeMatcher: 'best fit' | 'lookup' | undefined;
}


export type IMessageValueType =
  | 'literal'
  | 'number'
  | 'datetime'
  | 'fallback'
  | 'message'
  | 'value'
  | 'markup-start'
  | 'markup-end'
;

export interface IMessageKind<GType extends IMessageValueType, GValue> {
  type: GType;
  value: GValue;
  localeContext?: ILocaleContext;
  source?: string;
  meta?: Record<string, string>;

  toString(): string;
}

export type IGenericMessageKind = IMessageKind<IMessageValueType, unknown>;


export interface IMessageLiteral extends IMessageKind<'literal', string> {
}

export interface IMessageValue extends IMessageKind<'value', unknown> {
}

export interface IMessageNumber extends IMessageKind<'number', number | bigint> {
  options?: Intl.NumberFormatOptions & Intl.PluralRulesOptions;

  getPluralRule(): Intl.LDMLPluralRule;

  toParts(): Intl.NumberFormatPart[];
}

export interface IMessageDateTime extends IMessageKind<'datetime', Date> {
  options?: Intl.DateTimeFormatOptions;

  toParts(): Intl.DateTimeFormatPart[];
}

export interface IMessageFallback extends IMessageKind<'fallback', undefined> {
}

export interface IMessageMarkupStart extends IMessageKind<'markup-start', string> {
}

export interface IMessageMarkupEnd extends IMessageKind<'markup-end', string> {
}

export interface IResolvedMessage extends IMessageKind<'message', readonly IGenericMessageKind[]> {
}



export function isMessageLiteral(
  value: IGenericMessageKind,
): value is IMessageLiteral {
  return (value.type === 'literal');
}

export function isMessageValue(
  value: IGenericMessageKind,
): value is IMessageValue {
  return (value.type === 'value');
}

export function isMessageMarkupStart(
  value: IGenericMessageKind,
): value is IMessageMarkupStart {
  return (value.type === 'markup-start');
}

export function isMessageMarkupEnd(
  value: IGenericMessageKind,
): value is IMessageMarkupEnd {
  return (value.type === 'markup-end');
}

export function isResolvedMessage(
  value: IGenericMessageKind,
): value is IResolvedMessage {
  return (value.type === 'message');
}

// export interface IResolvedMessage {
//   matchSelectKey(
//     key: string
//   ): boolean;
//
//   toString(
//     onError?: Context['onError'],
//     noCache?: boolean
//   ): string;
// }
