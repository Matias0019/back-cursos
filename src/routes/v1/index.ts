import express, { Router } from 'express';

import docsRoute from './swagger.route';
import userRoute from './user.route';
import cursoBaseRoute from './curso-base.route';
import cursoModuloRoute from './curso-modulo.route';
import cursoLeccionRoute from './curso-leccion.route';
import cursoUsuarioRoute from './curso-usuario.route';
import cuategoriaCursoRoute from './categoria-curso.route';
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
    path: '/curso-modulo',
    route: cursoModuloRoute,
  },
  {
    path: '/curso-leccion',
    route: cursoLeccionRoute,
  },
  {
    path: '/curso-usuario',
    route: cursoUsuarioRoute,
  },
  {
    path: '/categoria-curso',
    route: cuategoriaCursoRoute,
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
