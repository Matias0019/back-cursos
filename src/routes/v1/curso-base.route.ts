import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { cursoBaseController, cursoBaseValidation } from '../../modules/cursoBase';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageCursoBase'), validate(cursoBaseValidation.createCursoBase), cursoBaseController.createCursoBase)
  .get(auth('getCursoBase'), validate(cursoBaseValidation.getCursoBases), cursoBaseController.getCursoBases);

router
  .route('/:cursoBaseId')
  .get(auth('getCursoBase'), validate(cursoBaseValidation.getCursoBase), cursoBaseController.getCursoBase)
  .patch(auth('manageCursoBase'), validate(cursoBaseValidation.updateCursoBase), cursoBaseController.updateCursoBase)
  .delete(auth('manageCursoBase'), validate(cursoBaseValidation.deleteCursoBase), cursoBaseController.deleteCursoBase);

export default router;