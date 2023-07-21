import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as cursoUsuarioService from './curso-usuario.service';
import * as cursoBaseService from '../cursoBase/curso-base.service';
import { ICursoUsuario } from './curso-usuario.interfaces';

export const createCursoUsuario = catchAsync(async (req: Request, res: Response) => {
  const cursoBaseId = req.body.curso
  const cursoBody = await  cursoBaseService.getCursoBaseById(cursoBaseId)
  if (cursoBody){
    const moduloArray = cursoBody.modulos.map((modulo) => ({
      id: modulo.id as mongoose.Types.ObjectId,
      porcentajeCompleto: 0,
      leccionesCompletas: 0,
      lecciones: modulo.lecciones.map((leccion) => ({
        id: leccion.id as mongoose.Types.ObjectId,
        completa: false,
        preguntas: leccion.preguntas.map((pregunta) => ({
          id: pregunta.id as mongoose.Types.ObjectId,
          completa: false,
          respuestas: pregunta.respuestas.map((respuesta) => ({
            id: respuesta.id as mongoose.Types.ObjectId,
            respuestaUsuario: false
          }))
        }))
      }))
    }))
  const cursoUsuarioBody: ICursoUsuario = {
    modulos:moduloArray,
    curso: cursoBaseId as mongoose.Types.ObjectId,
    cursoCompleto: false as boolean,
    empresa: req.user.empresaActiva as mongoose.Types.ObjectId,
    user: req.user.id as mongoose.Types.ObjectId
  }
  const cursoUsuario = await  cursoUsuarioService.createCursoUsuario(cursoUsuarioBody)
  res.status(httpStatus.CREATED).send(cursoUsuario);
}
if (!cursoBody) {
  throw new ApiError(httpStatus.NOT_FOUND, 'curso Base not found');
}
});

export const getCursoUsuarios = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'categoria', 'empresa', 'user']);
  filter.empresa = req.user.empresaActiva;
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
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
