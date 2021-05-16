import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { ExtendRouteObject } from '../types';
import Home from './pages/home';

const AsyncAbout = React.lazy(() => import('./pages/about'));

export const routes: ExtendRouteObject[] = [
  { path: '/', element: <Home /> },
  { path: 'home', element: <Home /> },
  { path: 'about', element: <AsyncAbout /> },
  { path: '*', element: <Home /> },
];

export const RoutesWrapper = () => useRoutes(routes);
