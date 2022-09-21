export interface IFetchGoogleAPIOptions extends RequestInit {
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
    ...options
  }: IFetchGoogleAPIOptions,
): Promise<Response> {
  const _url: URL = (typeof url === 'string')
    ? new URL(url)
    : url;

  _url.searchParams.set('key', apiKey);

  const _headers = new Headers([
    ...extractHeaders(headers),
    ['authorization', `Bearer ${token}`],
  ]);

  return fetch(_url.href, {
    ...options,
    headers: _headers,
  });
}

function extractHeaders(
  headers: HeadersInit | undefined,
): [string, string][] {
  if (headers === void 0) {
    return [];
  } else if (Array.isArray(headers)) {
    return headers as [string, string][];
  } else if (headers instanceof Headers) {
    return Array.from(headers as unknown as Iterable<[string, string]>);
  } else {
    return Object.entries(headers) as [string, string][];
  }
}

export function fetchJSONGoogleAPI<GData>(
  options: IFetchGoogleAPIOptions,
): Promise<GData> {
  return fetchGoogleAPI(options)
    .then((response: Response): Promise<GData> => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Google API error`);
        // return response.json()
        //   .then((data: any) => {
        //     console.log(data);
        //     throw new Error(`Network error`);
        //   });
      }
    });
}

