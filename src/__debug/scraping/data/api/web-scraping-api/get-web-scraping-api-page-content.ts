
/*--*/

export interface IGetWebScrapingApiPageContentOptions {
  url: string;
  apiKey: string;
}

export interface IGetWebScrapingApiPageContentResult {
  content: string;
  cookies: string;
  statusCode: number;
}

export function getWebScrapingApiPageContent(
  {
    url,
    apiKey,
  }: IGetWebScrapingApiPageContentOptions,
): Promise<IGetWebScrapingApiPageContentResult> {
  return Promise.reject('TODO');
}

