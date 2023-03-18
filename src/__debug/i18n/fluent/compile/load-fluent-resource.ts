import { IFluentRenderMessageFunction } from '../built-in/message/render/fluent-render-message-function.type';
import { compileFluentResource } from './compile-fluent-resource';

export function loadFluentResource(
  url: URL,
  // TODO add abort signal support
): Promise<IFluentRenderMessageFunction> {
  return fetch(url.href)
    .then((response: Response): Promise<string> => {
      return response.text();
    })
    .then((content: string): IFluentRenderMessageFunction => {
      return compileFluentResource(content);
    });
}
