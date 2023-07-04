import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../errors/ApiError';
import { QueryResult } from '../paginate/paginate';
import { ICursoLeccionDoc, ICursoLeccion } from './curso-leccion.interfaces';
import CursoLeccion from './curso-leccion.model'; 

/**
 * Create cursoLeccion
 * @param {ICursoLeccionDoc} cursoLeccion
 */
export const createCursoLeccion = async (cursoLeccion: ICursoLeccion): Promise<ICursoLeccionDoc> => {
  return CursoLeccion.create(cursoLeccion);
};

/**
 * Query for cursoLeccion
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
 export const queryCursoLeccions = async (filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult> => {
  const cursoLeccions = await CursoLeccion.paginate(filter, options);
  return cursoLeccions;
}

/**
 * Get CursoLeccion by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ICursoLeccionDoc | null>}
 */
export const getCursoLeccionById = async (id: mongoose.Types.ObjectId): Promise<ICursoLeccionDoc | null> => CursoLeccion.findById(id);

/**
 * Update CursoLeccion by id
 * @param {mongoose.Types.ObjectId} CursoLeccionId
 * @param {ICursoLeccion} updateBody
 * @returns {Promise<ICursoLeccionDoc | null>}
 */
export const updateCursoLeccionById = async (
  cursoLeccionId: mongoose.Types.ObjectId,
  updateBody: ICursoLeccion,
): Promise<ICursoLeccionDoc> => {
  const cursoLeccion = await getCursoLeccionById(cursoLeccionId);
  if (!cursoLeccion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CursoLeccion not found');
  }

  Object.assign(cursoLeccion, updateBody);

  return await cursoLeccion.save();

};

/**
 * Delete CursoLeccion by id
 * @param {mongoose.Types.ObjectId} cursoLeccionId
 * @returns {Promise<ICursoLeccionDoc | null>}
 */
export const deleteCursoLeccionById = async (cursoLeccionId: mongoose.Types.ObjectId): Promise<ICursoLeccionDoc | null> => {
  const cursoLeccion = await getCursoLeccionById(cursoLeccionId);
  if (!cursoLeccion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No se encontro el CursoLeccion');
  }
  await cursoLeccion.remove();
  return cursoLeccion;
};
