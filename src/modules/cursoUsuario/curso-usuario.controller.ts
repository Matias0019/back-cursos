import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as cursoUsuarioService from './curso-usuario.service';

export const createCursoUsuario = catchAsync(async (req: Request, res: Response) => {
  req.body.empresa =  req.user.empresaActiva
  const cursoUsuario = await  cursoUsuarioService.createCursoUsuario(req.body)
  res.status(httpStatus.CREATED).send(cursoUsuario);
});

export const getCursoUsuarios = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'categoria', 'empresa', 'user']);
  filter.empresa = req.user.empresaActiva;
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  options.populate = "categoria"
  const result = await cursoUsuarioService.queryCursoUsuario(filter, options); 
  res.send(result);
});

export const getCursoUsuario = catchAsync(async (req: Request, res: Response) => {

  if (typeof req.params['cursoUsuarioId'] === 'string') {
    const cursoUsuario = await cursoUsuarioService.getCursoUsuarioById(new mongoose.Types.ObjectId(req.params['cursoUsuarioId']));
    if (!cursoUsuario) {
      throw new ApiError(httpStatus.NOT_FOUND, 'cursoUsuario not found');
    }
    res.send(cursoUsuario);
  }
});

export const updateCursoUsuario = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['cursoUsuarioId'] === 'string') {
    const cursoUsuario = await cursoUsuarioService.updateCursoUsuarioById(new mongoose.Types.ObjectId(req.params['cursoUsuarioId']), req.body);
    res.send(cursoUsuario);
  }
});

export const deleteCursoUsuario = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['cursoUsuarioId'] === 'string') {
    await cursoUsuarioService.deleteCursoUsuarioById(new mongoose.Types.ObjectId(req.params['cursoUsuarioId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
