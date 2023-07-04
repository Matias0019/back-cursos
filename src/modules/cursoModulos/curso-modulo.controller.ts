import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as cursoModuloService from './curso-modulo.service';

export const createCursoModulo = catchAsync(async (req: Request, res: Response) => {
  const cursoModulo = await  cursoModuloService.createCursoModulo(req.body)
  res.status(httpStatus.CREATED).send(cursoModulo);
});

export const getCursoModulos = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'curso', 'lecciones']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  options.populate = "lecciones"
  const result = await cursoModuloService.queryCursoModulos(filter, options); 
  res.send(result);
});

export const getCursoModulo = catchAsync(async (req: Request, res: Response) => {

  if (typeof req.params['cursoModuloId'] === 'string') {
    const cursoModulo = await cursoModuloService.getCursoModuloById(new mongoose.Types.ObjectId(req.params['cursoModuloId']));
    if (!cursoModulo) {
      throw new ApiError(httpStatus.NOT_FOUND, 'cursoModulo not found');
    }
    res.send(cursoModulo);
  }
});

export const updateCursoModulo = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['cursoModuloId'] === 'string') {
    const cursoModulo = await cursoModuloService.updateCursoModuloById(new mongoose.Types.ObjectId(req.params['cursoModuloId']), req.body);
    res.send(cursoModulo);
  }
});

export const deleteCursoModulo = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['cursoModuloId'] === 'string') {
    await cursoModuloService.deleteCursoModuloById(new mongoose.Types.ObjectId(req.params['cursoModuloId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
