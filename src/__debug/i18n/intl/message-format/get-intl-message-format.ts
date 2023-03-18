import { MessageFormat } from 'messageformat';
import { IMessageFormatConstructor } from './message-format.type';


export function getIntlMessageFormat(): IMessageFormatConstructor {
  return MessageFormat as any;
}

