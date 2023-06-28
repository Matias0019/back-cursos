import express, { Router } from 'express';

import docsRoute from './swagger.route';
import userRoute from './user.route';
import cursoBaseRoute from './curso-base.route';
import cursoUsuarioRoute from './curso-usuario.route';
import config from '../../config/config';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/curso-base',
    route: cursoBaseRoute,
  },
  {
    path: '/curso-usuario',
    route: cursoUsuarioRoute,
  },
];

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
