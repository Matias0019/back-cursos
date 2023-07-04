import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { ICursoLeccion } from './curso-leccion.interfaces';

const createCursoLeccionBody: Record<keyof ICursoLeccion, any> = {
  name: Joi.string(),
  descripcion: Joi.string(),
  video: Joi.string(),
  img: Joi.string(),
  materialApoyo: Joi.array().items(Joi.object({
    url: Joi.string()
  })),
  preguntas: Joi.array().items(Joi.object({
    pregunta: Joi.string(),
    respuestas: Joi.array().items(Joi.object({
      respuesta: Joi.string(),
      correcta: Joi.boolean()
    }))
  })),
  modulo: Joi.string().custom(objectId),
};

export const createCursoLeccion = {
  body: Joi.object().keys(createCursoLeccionBody),
};

export const getCursoLeccions = {
  query: Joi.object().keys({
    name: Joi.string(),
    descripcion: Joi.string(),
    video: Joi.string(),
    img: Joi.string(),
    materialApoyo: Joi.array().items(Joi.object({
      url: Joi.string()
    })),
    preguntas: Joi.array().items(Joi.object({
      pregunta: Joi.string(),
      respuestas: Joi.array().items(Joi.object({
        respuesta: Joi.string(),
        correcta: Joi.boolean()
      }))
    })),
    modulo: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getCursoLeccion = {
  params: Joi.object().keys({
    cursoLeccionId: Joi.string().custom(objectId),
  }),
};

export const updateCursoLeccion = {
  params: Joi.object().keys({
    cursoLeccionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      descripcion: Joi.string(),
      video: Joi.string(),
      img: Joi.string(),
      materialApoyo: Joi.array().items(Joi.object({
        url: Joi.string()
      })),
      preguntas: Joi.array().items(Joi.object({
        pregunta: Joi.string(),
        respuestas: Joi.array().items(Joi.object({
          respuesta: Joi.string(),
          correcta: Joi.boolean()
        }))
      })),
      modulo: Joi.string().custom(objectId),
    })
    .min(1),
};

export const deleteCursoLeccion = {
  params: Joi.object().keys({
    cursoLeccionId: Joi.string().custom(objectId),
  }),
};
