import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { ICategoriaCurso } from './categoria-curso.interfaces';

const createCategoriaCursoBody: Record<keyof ICategoriaCurso, any> = {
  name: Joi.string().required(),
  empresa: Joi.string().custom(objectId),
  user: Joi.string().custom(objectId),
};

export const createCategoriaCurso = {
  body: Joi.object().keys(createCategoriaCursoBody),
};

export const getCategoriaCursos = {
  query: Joi.object().keys({
    name: Joi.string(),
    empresa: Joi.string().custom(objectId),
    user: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getCategoriaCurso = {
  params: Joi.object().keys({
    categoriaCursoId: Joi.string().custom(objectId),
  }),
};

export const updateCategoriaCurso = {
  params: Joi.object().keys({
    categoriaCursoId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      empresa: Joi.string().custom(objectId),
      user: Joi.string().custom(objectId),
    })
    .min(1),
};

export const deleteCategoriaCurso = {
  params: Joi.object().keys({
    categoriaCursoId: Joi.string().custom(objectId),
  }),
};
