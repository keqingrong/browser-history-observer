import * as React from 'react';
import { ExtendRouteObject } from './types';
import { useRoutes } from 'react-router-dom';
import { routes as mainRoutes } from './pages/routes';
import SyncRoutesWrapper from './module-sync';

const AsyncRoutesWrapper = React.lazy(() => import('./module-async'));

// https://github.com/ReactTraining/react-router/issues/7529
const subModuleRoutes: ExtendRouteObject[] = [
  {
    path: 'module-sync/*',
    element: <SyncRoutesWrapper />
  },
  {
    path: 'module-async/*',
    element: <AsyncRoutesWrapper />
  }
];

export const routes: ExtendRouteObject[] = [...subModuleRoutes, ...mainRoutes];

export const RoutesWrapper = () => useRoutes(routes);
