import { createCustomError } from '@lirx/core';

export type IGetScrapingAntPageContentProxyType =
  | 'residential'
  | 'datacenter'
  ;

export type IGetScrapingAntPageContentProxyCountry =
  | 'BR'
  | 'CN'
  | 'CZ'
  | 'FR'
  | 'DE'
  | 'HK'
  | 'IN'
  | 'IT'
  | 'IL'
  | 'JP'
  | 'NL'
  | 'PL'
  | 'RU'
  | 'SA'
  | 'ES'
  | 'AE'
  | 'US'
  ;

// https://docs.scrapingant.com/request-response-format

export interface IGetScrapingAntPageContentRequestBody {
  url: string;
  'x-api-key'?: string;
  browser?: boolean;
  cookies?: string;
  js_snippet?: string;
  proxy_type?: IGetScrapingAntPageContentProxyType;
  proxy_country?: IGetScrapingAntPageContentProxyCountry;
  wait_for_selector?: string;
  return_text?: boolean;
}

export interface IGetScrapingAntPageContentResponseBody {
  content: string;
  cookies: string;
  status_code: number;
  detail?: string;
}

/*--*/

export interface IGetScrapingAntPageContentOptions {
  url: string;
  apiKey: string;
  browser?: boolean;
  cookies?: string;
  jsSnippet?: string;
  proxyType?: IGetScrapingAntPageContentProxyType;
  proxyCountry?: IGetScrapingAntPageContentProxyCountry;
  waitForSelector?: string;
  returnText?: boolean;
}

export interface IGetScrapingAntPageContentResult {
  content: string;
  cookies: string;
  statusCode: number;
}

export function getScrapingAntPageContent(
  {
    url,
    apiKey,
    browser,
    cookies,
    jsSnippet,
    proxyType,
    proxyCountry,
    waitForSelector,
    returnText,
  }: IGetScrapingAntPageContentOptions,
): Promise<IGetScrapingAntPageContentResult> {
  const _url: URL = new URL(`https://api.scrapingant.com/v1/general`);

  const body: IGetScrapingAntPageContentRequestBody = {
    url,
    browser,
    cookies,
    js_snippet: jsSnippet,
    proxy_type: proxyType,
    proxy_country: proxyCountry,
    wait_for_selector: waitForSelector,
    return_text: returnText,
  };

  for (const key in body) {
    if (body[key] === void 0) {
      delete body[key];
    }
  }

  return fetch(_url.href, {
    method: 'POST',
    headers: new Headers([
      ['x-api-key', apiKey],
    ]),
    body: JSON.stringify(body),
  })
    .then((response: Response): Promise<IGetScrapingAntPageContentResponseBody> => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json()
          .then(({ detail = 'Unknown error' }: IGetScrapingAntPageContentResponseBody) => {
            throw createCustomError<'ScrapingError', { code: number }>({
              name: 'ScrapingError',
              message: detail,
              code: response.status,
            });
          });
      }
    })
    .then(getScrapingAntPageContentResponseBodyToResult);
}

function getScrapingAntPageContentResponseBodyToResult(
  {
    content,
    cookies,
    status_code,
  }: IGetScrapingAntPageContentResponseBody,
): IGetScrapingAntPageContentResult {
  return {
    content,
    cookies,
    statusCode: status_code,
  };
}
