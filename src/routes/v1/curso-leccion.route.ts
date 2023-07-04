import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { cursoLeccionController, cursoLeccionValidation } from '../../modules/cursoLecciones';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageCursoLeccion'), validate(cursoLeccionValidation.createCursoLeccion), cursoLeccionController.createCursoLeccion)
  .get(auth('getCursoLeccion'), validate(cursoLeccionValidation.getCursoLeccions), cursoLeccionController.getCursoLeccions);

router
  .route('/:cursoLeccionId')
  .get(auth('getCursoLeccion'), validate(cursoLeccionValidation.getCursoLeccion), cursoLeccionController.getCursoLeccion)
  .patch(auth('manageCursoLeccion'), validate(cursoLeccionValidation.updateCursoLeccion), cursoLeccionController.updateCursoLeccion)
  .delete(auth('manageCursoLeccion'), validate(cursoLeccionValidation.deleteCursoLeccion), cursoLeccionController.deleteCursoLeccion);

export default router;