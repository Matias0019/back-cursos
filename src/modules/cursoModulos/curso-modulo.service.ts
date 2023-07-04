import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../errors/ApiError';
import { QueryResult } from '../paginate/paginate';
import { ICursoModuloDoc, ICursoModulo } from './curso-modulo.interfaces';
import CursoModulo from './curso-modulo.model'; 

/**
 * Create cursoModulo
 * @param {ICursoModuloDoc} cursoModulo
 */
export const createCursoModulo = async (cursoModulo: ICursoModulo): Promise<ICursoModuloDoc> => {
  return CursoModulo.create(cursoModulo);
};

/**
 * Query for cursoModulo
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
 export const queryCursoModulos = async (filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult> => {
  const cursoModulos = await CursoModulo.paginate(filter, options);
  return cursoModulos;
}

/**
 * Get CursoModulo by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ICursoModuloDoc | null>}
 */
export const getCursoModuloById = async (id: mongoose.Types.ObjectId): Promise<ICursoModuloDoc | null> => CursoModulo.findById(id).populate('lecciones');

/**
 * Update CursoModulo by id
 * @param {mongoose.Types.ObjectId} cursoModuloId
 * @param {ICursoModulo} updateBody
 * @returns {Promise<ICursoModuloDoc | null>}
 */
export const updateCursoModuloById = async (
  cursoModuloId: mongoose.Types.ObjectId,
  updateBody: ICursoModulo,
): Promise<ICursoModuloDoc> => {
  const cursoModulo = await getCursoModuloById(cursoModuloId);
  if (!cursoModulo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CursoModulo not found');
  }

  Object.assign(cursoModulo, updateBody);

  return await cursoModulo.save();

};

/**
 * Delete CursoModulo by id
 * @param {mongoose.Types.ObjectId} cursoModuloId
 * @returns {Promise<ICursoModuloDoc | null>}
 */
export const deleteCursoModuloById = async (cursoModuloId: mongoose.Types.ObjectId): Promise<ICursoModuloDoc | null> => {
  const cursoModulo = await getCursoModuloById(cursoModuloId);
  if (!cursoModulo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No se encontro el CursoModulo');
  }
  await cursoModulo.remove();
  return cursoModulo;
};
