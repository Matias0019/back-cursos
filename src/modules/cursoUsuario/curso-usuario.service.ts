import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../errors/ApiError';
import { QueryResult } from '../paginate/paginate';
import { ICursoUsuarioDoc, ICursoUsuario } from './curso-usuario.interfaces';
import CursoUsuario from './curso-usuario.model'; 

/**
 * Create cursoUsuario
 * @param {ICursoUsuarioDoc} cursoUsuario
 */
export const createCursoUsuario = async (cursoUsuario: ICursoUsuario): Promise<ICursoUsuarioDoc> => {
  return CursoUsuario.create(cursoUsuario);
};

/**
 * Query for cursoUsuario
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
 export const queryCursoUsuario = async (filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult> => {
  const cursoUsuario = await CursoUsuario.paginate(filter, options);
  return cursoUsuario;
}

/**
 * Get CursoBase by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ICursoUsuarioDoc | null>}
 */
export const getCursoUsuarioById = async (id: mongoose.Types.ObjectId): Promise<ICursoUsuarioDoc | null> => CursoUsuario.findById(id);

/**
 * Update CursoUsuario by id
 * @param {mongoose.Types.ObjectId} cursoUsuarioId
 * @param {ICursoUsuario} updateBody
 * @returns {Promise<ICursoUsuarioDoc | null>}
 */
export const updateCursoUsuarioById = async (
  cursoUsuarioId: mongoose.Types.ObjectId,
  updateBody: ICursoUsuario,
): Promise<ICursoUsuarioDoc> => {
  const cursoUsuario = await getCursoUsuarioById(cursoUsuarioId);
  if (!cursoUsuario) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CursoUsuario not found');
  }

  Object.assign(cursoUsuario, updateBody);

  return await cursoUsuario.save();

};

/**
 * Delete cursoUsuario by id
 * @param {mongoose.Types.ObjectId} cursoUsuarioId
 * @returns {Promise<ICursoUsuarioDoc | null>}
 */
export const deleteCursoUsuarioById = async (cursoUsuarioId: mongoose.Types.ObjectId): Promise<ICursoUsuarioDoc | null> => {
  const cursoUsuario = await getCursoUsuarioById(cursoUsuarioId);
  if (!cursoUsuario) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No se encontro el CursoUsuario');
  }
  await cursoUsuario.remove();
  return cursoUsuario;
};
