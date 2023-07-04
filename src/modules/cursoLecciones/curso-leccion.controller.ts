import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as cursoLeccionService from './curso-leccion.service';

export const createCursoLeccion = catchAsync(async (req: Request, res: Response) => {
  const cursoLeccion = await  cursoLeccionService.createCursoLeccion(req.body)
  res.status(httpStatus.CREATED).send(cursoLeccion);
});

export const getCursoLeccions = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'modulo']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await cursoLeccionService.queryCursoLeccions(filter, options); 
  res.send(result);
});

export const getCursoLeccion = catchAsync(async (req: Request, res: Response) => {

  if (typeof req.params['cursoLeccionId'] === 'string') {
    const cursoLeccion = await cursoLeccionService.getCursoLeccionById(new mongoose.Types.ObjectId(req.params['cursoLeccionId']));
    if (!cursoLeccion) {
      throw new ApiError(httpStatus.NOT_FOUND, 'cursoLeccion not found');
    }
    res.send(cursoLeccion);
  }
});

export const updateCursoLeccion = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['cursoLeccionId'] === 'string') {
    const cursoLeccion = await cursoLeccionService.updateCursoLeccionById(new mongoose.Types.ObjectId(req.params['cursoLeccionId']), req.body);
    res.send(cursoLeccion);
  }
});

export const deleteCursoLeccion = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['cursoLeccionId'] === 'string') {
    await cursoLeccionService.deleteCursoLeccionById(new mongoose.Types.ObjectId(req.params['cursoLeccionId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
