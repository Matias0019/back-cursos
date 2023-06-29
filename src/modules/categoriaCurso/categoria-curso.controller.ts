import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as categoriaCursoService from './categoria-curso.service';

export const createCategoriaCurso = catchAsync(async (req: Request, res: Response) => {
  req.body.empresa =  req.user.empresaActiva
  req.body.user =  req.user.id
  const categoriaCurso = await  categoriaCursoService.createCategoriaCurso(req.body)
  res.status(httpStatus.CREATED).send(categoriaCurso);
});

export const getCategoriaCursos = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'empresa', 'user']);
  filter.empresa = req.user.empresaActiva;
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await categoriaCursoService.queryCategoriaCursos(filter, options); 
  res.send(result);
});

export const getCategoriaCurso = catchAsync(async (req: Request, res: Response) => {

  if (typeof req.params['categoriaCursoId'] === 'string') {
    const categoriaCurso = await categoriaCursoService.getCategoriaCursoById(new mongoose.Types.ObjectId(req.params['categoriaCursoId']));
    if (!categoriaCurso) {
      throw new ApiError(httpStatus.NOT_FOUND, 'categoriaCurso not found');
    }
    res.send(categoriaCurso);
  }
});

export const updateCategoriaCurso = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['categoriaCursoId'] === 'string') {
    const categoriaCurso = await categoriaCursoService.updateCategoriaCursoById(new mongoose.Types.ObjectId(req.params['categoriaCursoId']), req.body);
    res.send(categoriaCurso);
  }
});

export const deleteCategoriaCurso = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['categoriaCursoId'] === 'string') {
    await categoriaCursoService.deleteCategoriaCursoById(new mongoose.Types.ObjectId(req.params['categoriaCursoId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
