import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as cursoBaseService from './curso-base.service';
import CursoBase from './curso-base.model';

export const createCursoBase = catchAsync(async (req: Request, res: Response) => {
  req.body.empresa =  req.user.empresaActiva
  req.body.user =  req.user.id
  const cursoBase = await  cursoBaseService.createCursoBase(req.body)
  res.status(httpStatus.CREATED).send(cursoBase);
});

export const getCursoBases = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'categoria', 'empresa', 'user']);
  filter.empresa = req.user.empresaActiva;
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  options.populate = "categoria"
  const result = await cursoBaseService.queryCursoBases(filter, options); 
  res.send(result);
});

export const getCursoBase = catchAsync(async (req: Request, res: Response) => {

  if (typeof req.params['cursoBaseId'] === 'string') {
    const cursoBase = await cursoBaseService.getCursoBaseById(new mongoose.Types.ObjectId(req.params['cursoBaseId']));
    if (!cursoBase) {
      throw new ApiError(httpStatus.NOT_FOUND, 'cursoBase not found');
    }
    res.send(cursoBase);
  }
});

export const updateCursoBase = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['cursoBaseId'] === 'string') {
    const cursoBase = await cursoBaseService.updateCursoBaseById(new mongoose.Types.ObjectId(req.params['cursoBaseId']), req.body);
    res.send(cursoBase);
  }
});

export const deleteCursoBase = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['cursoBaseId'] === 'string') {
    await cursoBaseService.deleteCursoBaseById(new mongoose.Types.ObjectId(req.params['cursoBaseId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});

export const getCursoBaseWithUsuarios = catchAsync(async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const pipeline = [
      {
        $lookup: {
          from: 'cursousuarios',
          localField: '_id',
          foreignField: 'curso',
          as: 'cursosBaseYUsuario',
        },
      },
      { $unwind: { path: '$cursosBaseYUsuario', preserveNullAndEmptyArrays: true } },
      {
        $match: { user: userId }, // Filtrar por el _id del usuario
      },
    ];

     CursoBase.aggregate(pipeline).exec((err:any,results:any)=> {
        if(err){
          res.status(httpStatus.NO_CONTENT).send()
        }
        console.log(results);
        res.status(httpStatus.OK).send(results);
     });
  } catch (error) {
    console.error('Error al obtener cursoBase con usuarios:', error);
    res.status(500).send('Error al obtener cursoBase con usuarios');
  }
});
