import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { categoriaCursoController, categoriaCursoValidation } from '../../modules/categoriaCurso';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageCategoriaCurso'), validate(categoriaCursoValidation.createCategoriaCurso), categoriaCursoController.createCategoriaCurso)
  .get(auth('getCategoriaCurso'), validate(categoriaCursoValidation.getCategoriaCursos), categoriaCursoController.getCategoriaCursos);

router
  .route('/:categoriaCursoId')
  .get(auth('getCategoriaCurso'), validate(categoriaCursoValidation.getCategoriaCurso), categoriaCursoController.getCategoriaCurso)
  .patch(auth('manageCategoriaCurso'), validate(categoriaCursoValidation.updateCategoriaCurso), categoriaCursoController.updateCategoriaCurso)
  .delete(auth('manageCategoriaCurso'), validate(categoriaCursoValidation.deleteCategoriaCurso), categoriaCursoController.deleteCategoriaCurso);

export default router;