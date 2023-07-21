import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { ICursoUsuario } from './curso-usuario.interfaces';

const createCursoUsuarioBody: Record<keyof ICursoUsuario, any> = {
  modulos: Joi.array().items(Joi.object({
    id: Joi.string().custom(objectId),
    porcentajeCompleto: Joi.number(),
    leccionesCompletas: Joi.number(),
    lecciones: Joi.array().items(Joi.object({
      id: Joi.string().custom(objectId),
      completa: Joi.boolean(),
      preguntas: Joi.array().items(Joi.object({
        id: Joi.string().custom(objectId),
        completa: Joi.boolean(),
        respuestas: Joi.array().items(Joi.object({
          id: Joi.string().custom(objectId),
          respuestaUsuario: Joi.boolean(),
        })),
      }))
    }))
  })),
  cursoCompleto: Joi.boolean(),
  curso: Joi.string().custom(objectId),
  empresa: Joi.string().custom(objectId),
  user: Joi.string().custom(objectId),
};

export const createCursoUsuario = {
  body: Joi.object().keys(createCursoUsuarioBody),
};

export const getCursoUsuarios = {
  query: Joi.object().keys({
    modulos: Joi.array().items(Joi.object({
      id: Joi.string().custom(objectId),
      porcentajeCompleto: Joi.number(),
      leccionesCompletas: Joi.number(),
      lecciones: Joi.array().items(Joi.object({
        id: Joi.string().custom(objectId),
        completa: Joi.boolean(),
        preguntas: Joi.array().items(Joi.object({
          id: Joi.string().custom(objectId),
          completa: Joi.boolean(),
          respuestas: Joi.array().items(Joi.object({
            id: Joi.string().custom(objectId),
            respuestaUsuario: Joi.boolean(),
          })),
        }))
      }))
    })),
    cursoCompleto: Joi.boolean(),
    curso: Joi.string().custom(objectId),
    empresa: Joi.string().custom(objectId),
    user: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getCursoUsuario = {
  params: Joi.object().keys({
    cursoUsuarioId: Joi.string().custom(objectId),
  }),
};

export const updateCursoUsuario = {
  params: Joi.object().keys({
    cursoUsuarioId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      modulos: Joi.array().items(Joi.object({
        id: Joi.string().custom(objectId),
        porcentajeCompleto: Joi.number(),
        leccionesCompletas: Joi.number(),
        lecciones: Joi.array().items(Joi.object({
          id: Joi.string().custom(objectId),
          completa: Joi.boolean(),
          preguntas: Joi.array().items(Joi.object({
            id: Joi.string().custom(objectId),
            completa: Joi.boolean(),
            respuestas: Joi.array().items(Joi.object({
              id: Joi.string().custom(objectId),
              respuestaUsuario: Joi.boolean(),
            })),
          }))
        }))
      })),
      cursoCompleto: Joi.boolean(),
      curso: Joi.string().custom(objectId),
      empresa: Joi.string().custom(objectId),
      user: Joi.string().custom(objectId),
    })
    .min(1),
};

export const deleteCursoUsuario = {
  params: Joi.object().keys({
    cursoUsuarioId: Joi.string().custom(objectId),
  }),
};
