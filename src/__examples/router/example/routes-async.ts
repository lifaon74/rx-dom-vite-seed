import { ILiRxRouteListLike, RedirectError } from '@lirx/router';
import { timeout, toPromise } from '@lirx/core';
import { createSlugs } from '../slugs/create-slugs';
import { SLUGS } from './slugs';

const listChildRoutes: ILiRxRouteListLike = [
  {
    path: '/',
  },
  {
    path: '/sub',
    component: () => {
      return import('../pages/sub-list//sub-list.page.component').then(_ => _.AppSubListPageComponent);
    },
  },
];

export const APP_ROUTES_ASYNC: ILiRxRouteListLike = [
  {
    path: '/home',
    // canActivate: () => {
    //   return switchMap$$(timeout(2000), () => singleN<ICanActivateFunctionReturnedValue>(true));
    // },
    component: () => {
      return import('../pages/home/home.page.component').then(_ => _.AppHomePageComponent);
    },
  },
  {
    path: '/product/:productId',
    component: () => {
      return import('../pages/product/product.page.component').then(_ => _.AppProductPageComponent);
    },
  },
  {
    path: '/list',
    component: () => {
      return import('../pages/list/list.page.component').then(_ => _.AppListPageComponent);
    },
    children: [
      {
        path: '/async',
        children: () => {
          return toPromise(timeout(2000)).then(() => listChildRoutes);
        },
      },
      ...listChildRoutes,
    ],
  },
  {
    path: '/forbidden',
    loadData: () => {
      throw new RedirectError('/home');
    }
  },
  ...createSlugs(SLUGS, '/slugs'),
  {
    path: '/**',
    component: () => {
      return import('../pages/404/not-found.page.component').then(_ => _.AppNotFoundPageComponent);
    },
  },
];

