import { AppSubListPageComponent } from '../pages/sub-list/sub-list.page.component';
import { AppHomePageComponent } from '../pages/home/home.page.component';
import { AppProductPageComponent } from '../pages/product/product.page.component';
import { AppListPageComponent } from '../pages/list/list.page.component';
import { AppNotFoundPageComponent } from '../pages/404/not-found.page.component';
import { createSlugs } from '../slugs/create-slugs';
import { SLUGS } from './slugs';
import { ILiRxRouteListLike, RedirectError } from '@lirx/router';
import { toPromise, timeout } from '@lirx/core';

const listChildRoutes: ILiRxRouteListLike = [
  {
    path: '/',
  },
  {
    path: '/sub',
    component: AppSubListPageComponent,
  },
];

export const APP_ROUTES: ILiRxRouteListLike = [
  {
    path: '/home',
    component: AppHomePageComponent,
  },
  {
    path: '/product/:productId',
    component: AppProductPageComponent,
  },
  {
    path: '/list',
    component: AppListPageComponent,
    children: [
      {
        path: '/async',
        loadData: () => {
          return toPromise(timeout(2000));
        },
        children: listChildRoutes,
      },
      ...listChildRoutes,
    ],
  },
  {
    path: '/forbidden',
    loadData: () => {
      throw new RedirectError('/home');
    },
  },
  ...createSlugs(SLUGS, '/slugs'),
  {
    path: '/**',
    component: AppNotFoundPageComponent,
  },
];

