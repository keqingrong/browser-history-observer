import * as React from 'react';
import { ExtendRouteObject } from '../types';
import NotFound from './404';
import Home from './home';

const AsyncAbout = React.lazy(() => import('./about'));
// const AsyncAbout = React.lazy(() => import(/* webpackPrefetch: true */ './about'));
// const AsyncAbout = loadable(() => import('./about'));

export const routes: ExtendRouteObject[] = [
  { path: '/', element: <Home />, meta: { root: true } },
  { path: 'home', element: <Home />, meta: { requiresAuth: true } },
  { path: 'about', element: <AsyncAbout /> },
  { path: '*', element: <NotFound /> },
];
