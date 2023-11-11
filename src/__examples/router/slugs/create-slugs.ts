import { IRouteParams, normalizeRoutePath, ILiRxRouteListLike, ILiRxRouteLike, RedirectError } from '@lirx/router';

export type IRXRouteSlug = [
  target: string,
  slugs: readonly string[],
];

export function createSlugs(
  slugs: IRXRouteSlug[],
  prefix: string = '',
): ILiRxRouteListLike {
  return slugs
    .flatMap(([target, slugs]: IRXRouteSlug): ILiRxRouteLike[] => {
      const _target: string = normalizeRoutePath(target);
      return slugs.map((slug: string): ILiRxRouteLike => {
        return {
          path: `${prefix}${slug}`,
          loadData: (params: IRouteParams): void => {
            const url: string = _target.replace(
              new RegExp('(^|\\/):([\\w\\-]+)($|\\/)', 'g'),
              (match: string, start: string, id: string, end: string) => {
                if (id in params) {
                  return `${start}${params[id]}${end}`;
                } else {
                  throw new Error(`Missing '${id}' in slug's url`);
                }
              },
            );

            throw new RedirectError(url, {
              transparent: true,
            });
          },
        };
      });
    });
}

