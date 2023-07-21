import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../errors/ApiError';
import { QueryResult } from '../paginate/paginate';
import { ICursoBaseDoc, ICursoBase } from './curso-base.interfaces';
import CursoBase from './curso-base.model'; 

/**
 * Create cursoBase
 * @param {ICursoBaseDoc} cursoBase
 */
export const createCursoBase = async (cursoBase: ICursoBase): Promise<ICursoBaseDoc> => {
  return CursoBase.create(cursoBase);
};

/**
 * Query for cursoBase
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
 export const queryCursoBases = async (filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult> => {
  const cursoBases = await CursoBase.paginate(filter, options);
  return cursoBases;
}

/**
 * Get CursoBase by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ICursoBaseDoc | null>}
 */
export const getCursoBaseById = async (id: mongoose.Types.ObjectId): Promise<ICursoBaseDoc | null> => CursoBase.findById(id).populate('categoria');

/**
 * Update CursoBase by id
 * @param {mongoose.Types.ObjectId} CursoBaseId
 * @param {ICursoBase} updateBody
 * @returns {Promise<ICursoBaseDoc | null>}
 */
export const updateCursoBaseById = async (
  cursoBaseId: mongoose.Types.ObjectId,
  updateBody: ICursoBase,
): Promise<ICursoBaseDoc> => {
  const cursoBase = await getCursoBaseById(cursoBaseId);
  if (!cursoBase) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CursoBase not found');
  }

  Object.assign(cursoBase, updateBody);

  return await cursoBase.save();

};

/**
 * Delete CursoBase by id
 * @param {mongoose.Types.ObjectId} cursoBaseId
 * @returns {Promise<ICursoBaseDoc | null>}
 */
export const deleteCursoBaseById = async (cursoBaseId: mongoose.Types.ObjectId): Promise<ICursoBaseDoc | null> => {
  const cursoBase = await getCursoBaseById(cursoBaseId);
  if (!cursoBase) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No se encontro el CursoBase');
  }
  await cursoBase.remove();
  return cursoBase;
};

export const joinCollectionsCursoBase = async (userId: any, empresaId: any) => {
  try {
    const result = await CursoBase.aggregate([
      {
        $lookup: {
          from: 'cursousuarios',
          let: { cursoId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$curso', '$$cursoId'] }, { $eq: ['$user', userId] }],
                },
              },
            },
          ],
          as: 'cursosBaseYUsuario',
        },
      },
      {
        $addFields: {
          cursosBaseYUsuario: {
            $cond: {
              if: { $isArray: '$cursosBaseYUsuario' },
              then: { $arrayElemAt: ['$cursosBaseYUsuario', 0] },
              else: { userType: 'missing' }, // Agrega un campo userType para indicar que no está relacionado
            },
          },
        },
      },
      {
        $lookup: {
          from: 'categoriacursos',
          localField: 'categoria',
          foreignField: '_id',
          as: 'categoria',
        },
      },
      {
        $unwind: {
          path: '$categoria',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: { empresa: empresaId }, // Filtrar por la empresa del curso base
      },
    ]).exec();
    return result;
  } catch (error) {
    throw error;
  }
}
