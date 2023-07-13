import { AsyncTask, Abortable, asyncFetchText } from '@lirx/async-task';
import { IReadonlyFluentMessagesMap } from '../built-in/message/map/fluent-messages-map.type';
import { compileFluentResource } from './compile-fluent-resource';

export function loadFluentResource(
  url: URL,
  abortable: Abortable,
): AsyncTask<IReadonlyFluentMessagesMap> {
  return asyncFetchText(url.href, void 0, abortable)
    .successful((content: string): IReadonlyFluentMessagesMap => {
      return compileFluentResource(content);
    });
}
