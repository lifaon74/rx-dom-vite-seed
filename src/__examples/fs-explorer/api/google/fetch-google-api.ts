import { AsyncTask, asyncFetch, IAbortableOptions, IAsyncTaskConstraint } from '@lirx/async-task';

export interface IFetchGoogleAPIOptions extends Omit<RequestInit, 'signal'>, IAbortableOptions {
  url: URL | string;
  apiKey: string;
  token: string;
}

export function fetchGoogleAPI(
  {
    url,
    apiKey,
    token,
    headers,
    abortable,
    ...options
  }: IFetchGoogleAPIOptions,
): AsyncTask<Response> {
  const _url: URL = (typeof url === 'string')
    ? new URL(url)
    : url;

  _url.searchParams.set('key', apiKey);

  const _headers = new Headers([
    ...extractHeaders(headers),
    ['authorization', `Bearer ${token}`],
  ]);

  return asyncFetch(_url.href, {
    ...options,
    headers: _headers,
  }, abortable);
}

function extractHeaders(
  headers: HeadersInit | undefined,
): [string, string][] {
  if (headers === void 0) {
    return [];
  } else if (Array.isArray(headers)) {
    return headers as [string, string][];
  } else if (headers instanceof Headers) {
    return Array.from(headers[Symbol.iterator]());
  } else {
    return Object.entries(headers) as [string, string][];
  }
}

export function fetchJSONGoogleAPI<GData extends IAsyncTaskConstraint<GData>>(
  options: IFetchGoogleAPIOptions,
): AsyncTask<GData> {
  return fetchGoogleAPI(options)
    .successful((response: Response): Promise<GData> => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Google API error`);
      }
    });
}

