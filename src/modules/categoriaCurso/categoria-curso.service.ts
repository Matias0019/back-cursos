import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../errors/ApiError';
import { QueryResult } from '../paginate/paginate';
import { ICategoriaCursoDoc, ICategoriaCurso } from './categoria-curso.interfaces';
import CategoriaCurso from './categoria-curso.model';

/**
 * Create a categoriaCurso
 * @param {ICategoriaCursoDoc} categoriaCurso
 */
export const createCategoriaCurso = async (categoriaCurso: ICategoriaCurso): Promise<ICategoriaCursoDoc> => {
  return CategoriaCurso.create(categoriaCurso);
};

/**
 * Query for categoriaCurso
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
 export const queryCategoriaCursos = async (filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult> => {
  const categoriaCursos = await CategoriaCurso.paginate(filter, options);
  return categoriaCursos;
}

/**
 * Get categoriaCurso by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ICategoriaCursoDoc | null>}
 */
export const getCategoriaCursoById = async (id: mongoose.Types.ObjectId): Promise<ICategoriaCursoDoc | null> => CategoriaCurso.findById(id);

/**
 * Update categoriaCurso by id
 * @param {mongoose.Types.ObjectId} categoriaCursoId
 * @param {ICategoriaCurso} updateBody
 * @returns {Promise<ICategoriaCursoDoc | null>}
 */
export const updateCategoriaCursoById = async (
  categoriaCursoId: mongoose.Types.ObjectId,
  updateBody: ICategoriaCurso,
): Promise<ICategoriaCursoDoc> => {
  const categoriaCurso = await getCategoriaCursoById(categoriaCursoId);
  if (!categoriaCurso) {
    throw new ApiError(httpStatus.NOT_FOUND, 'categoriaCurso not found');
  }

  Object.assign(categoriaCurso, updateBody);

  return await categoriaCurso.save();

};

/**
 * Delete categoriaCurso by id
 * @param {mongoose.Types.ObjectId} categoriaCursoId
 * @returns {Promise<ICategoriaCursoDoc | null>}
 */
export const deleteCategoriaCursoById = async (categoriaCursoId: mongoose.Types.ObjectId): Promise<ICategoriaCursoDoc | null> => {
  const categoriaCurso = await getCategoriaCursoById(categoriaCursoId);
  if (!categoriaCurso) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No se encontro el categoriaCurso');
  }
  await categoriaCurso.remove();
  return categoriaCurso;
};
