import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as cursoBaseService from './curso-base.service';
//import CursoBase from './curso-base.model';

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
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const empresaId = new mongoose.Types.ObjectId(req.user.empresaActiva);
    // const pipeline = [
    //   {
    //     $lookup: {
    //       from: 'cursousuarios',
    //       localField: '_id',
    //       foreignField: 'curso',
    //       as: 'cursosBaseYUsuario',
    //     },
    //   },
    //   { $unwind: { path: '$cursosBaseYUsuario', preserveNullAndEmptyArrays: true } },
    //   {
    //     $match: { 'cursosBaseYUsuario.user': userId  },
    //   },
    // ];

    // const pipeline = [
    //   {
    //     $lookup: {
    //       from: 'cursousuarios',
    //       let: { cursoId: '$_id' },
    //       pipeline: [
    //         {
    //           $match: {
    //             $expr: {
    //               $and: [{ $eq: ['$curso', '$$cursoId'] }, { $eq: ['$user', userId] }],
    //             },
    //           },
    //         },
    //       ],
    //       as: 'cursosBaseYUsuario',
    //     },
    //   },
    //   {
    //     $addFields: {
    //       cursosBaseYUsuario: {
    //         $cond: {
    //           if: { $isArray: '$cursosBaseYUsuario' },
    //           then: { $arrayElemAt: ['$cursosBaseYUsuario', 0] },
    //           else: { userType: 'missing' }, // Agrega un campo userType para indicar que no está relacionado
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $match: { empresa: empresaId }, // Filtrar por la empresa del curso base
    //   },
    // ];

    //  CursoBase.aggregate(pipeline).exec((err:any,results:any)=> {
    //     if(err){
    //       res.status(httpStatus.NO_CONTENT).send()
    //     }
    //     res.status(httpStatus.OK).send(results);
    //  });

    const result = await cursoBaseService.joinCollectionsCursoBase(userId, empresaId);
    res.status(httpStatus.OK).send(result);
  } catch (error) {
    console.error('Error al obtener cursoBase con usuarios:', error);
    res.status(500).send('Error al obtener cursoBase con usuarios');
  }
});
