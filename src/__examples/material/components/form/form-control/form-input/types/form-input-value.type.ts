import { IValueOrInvalidTypeToken } from '../../tokens/invalid-type.token';
import { IValueOrNoValueToken } from '../../tokens/no-value.token';

export type IFormInputValue<GValue> = IValueOrInvalidTypeToken<IValueOrNoValueToken<GValue>>;
