import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { ICursoModulo } from './curso-modulo.interfaces';

const createCursoModuloBody: Record<keyof ICursoModulo, any> = {
  name: Joi.string(),
  descripcion: Joi.string(),
  lecciones: Joi.array().items(Joi.string().custom(objectId)),
  curso: Joi.string().custom(objectId),
};

export const createCursoModulo = {
  body: Joi.object().keys(createCursoModuloBody),
};

export const getCursoModulos = {
  query: Joi.object().keys({
    name: Joi.string(),
    descripcion: Joi.string(),
    lecciones: Joi.array().items(Joi.string().custom(objectId)),
    curso: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getCursoModulo = {
  params: Joi.object().keys({
    cursoModuloId: Joi.string().custom(objectId),
  }),
};

export const updateCursoModulo = {
  params: Joi.object().keys({
    cursoModuloId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      descripcion: Joi.string(),
      lecciones: Joi.array().items(Joi.string().custom(objectId)),
      curso: Joi.string().custom(objectId),
    })
    .min(1),
};

export const deleteCursoModulo = {
  params: Joi.object().keys({
    cursoModuloId: Joi.string().custom(objectId),
  }),
};
