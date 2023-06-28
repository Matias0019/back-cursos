import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { cursoUsuarioController, cursoUsuarioValidation } from '../../modules/cursoUsuario';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageCursoUsuario'), validate(cursoUsuarioValidation.createCursoUsuario), cursoUsuarioController.createCursoUsuario)
  .get(auth('getCursoUsuario'), validate(cursoUsuarioValidation.getCursoUsuarios), cursoUsuarioController.getCursoUsuarios);

router
  .route('/:cursoUsuarioId')
  .get(auth('getCursoUsuario'), validate(cursoUsuarioValidation.getCursoUsuario), cursoUsuarioController.getCursoUsuario)
  .patch(auth('manageCursoUsuario'), validate(cursoUsuarioValidation.updateCursoUsuario), cursoUsuarioController.updateCursoUsuario)
  .delete(auth('manageCursoUsuario'), validate(cursoUsuarioValidation.deleteCursoUsuario), cursoUsuarioController.deleteCursoUsuario);

export default router;