import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { cursoModuloController, cursoModuloValidation } from '../../modules/cursoModulos';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageCursoModulo'), validate(cursoModuloValidation.createCursoModulo), cursoModuloController.createCursoModulo)
  .get(auth('getCursoModulo'), validate(cursoModuloValidation.getCursoModulos), cursoModuloController.getCursoModulos);

router
  .route('/:cursoModuloId')
  .get(auth('getCursoModulo'), validate(cursoModuloValidation.getCursoModulo), cursoModuloController.getCursoModulo)
  .patch(auth('manageCursoModulo'), validate(cursoModuloValidation.updateCursoModulo), cursoModuloController.updateCursoModulo)
  .delete(auth('manageCursoModulo'), validate(cursoModuloValidation.deleteCursoModulo), cursoModuloController.deleteCursoModulo);

export default router;