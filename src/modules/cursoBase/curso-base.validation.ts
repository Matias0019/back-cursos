import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { ICursoBase } from './curso-base.interfaces';

const createCursoBaseBody: Record<keyof ICursoBase, any> = {
  name: Joi.string().required(),
  nivel: Joi.object({name: Joi.string(), codigo: Joi.number()}).required(),
  horas: Joi.number().required(),
  categoria: Joi.string().custom(objectId),
  descripcion: Joi.string().required(),
  img: Joi.string().required(),
  modulos: Joi.array({
    nombre: Joi.string(),
    lecciones:[{
      nombre: Joi.string(),
      video: Joi.string(),
      img: Joi.string(), 
      materialApoyo:[{url:Joi.string()}],
      preguntas:[{pregunta: Joi.string(), respuestas:[{respuesta: Joi.string(),correcta: Joi.boolean(),}]}]
    }]
  }),
  empresa: Joi.string().custom(objectId),
  user: Joi.string().custom(objectId),
};

export const createCursoBase = {
  body: Joi.object().keys(createCursoBaseBody),
};

export const getCursoBases = {
  query: Joi.object().keys({
    name: Joi.string(),
    nivel: Joi.object({name: Joi.string(), codigo: Joi.number()}),
    horas: Joi.number(),
    categoria: Joi.string().custom(objectId),
    descripcion: Joi.string(),
    img: Joi.string(),
    modulos: Joi.array({
    nombre: Joi.string(),
    lecciones:[{
      nombre: Joi.string(),
      video: Joi.string(),
      img: Joi.string(), 
      materialApoyo:[{url:Joi.string()}],
      preguntas:[{pregunta: Joi.string(), respuestas:[{respuesta: Joi.string(),correcta: Joi.boolean(),}]}]
    }]
    }),
    empresa: Joi.string().custom(objectId),
    user: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getCursoBase = {
  params: Joi.object().keys({
    cursoBaseId: Joi.string().custom(objectId),
  }),
};

export const updateCursoBase = {
  params: Joi.object().keys({
    cursoBaseId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      nivel: Joi.object({ name: Joi.string(), codigo: Joi.number() }),
      horas: Joi.number(),
      categoria: Joi.string().custom(objectId),
      descripcion: Joi.string(),
      img: Joi.string(),
      modulos: Joi.array({
        nombre: Joi.string(),
        lecciones: [{
          nombre: Joi.string(),
          video: Joi.string(),
          img: Joi.string(),
          materialApoyo: [{ url: Joi.string() }],
          preguntas: [{ pregunta: Joi.string(), respuestas: [{ respuesta: Joi.string(), correcta: Joi.boolean(), }] }]
        }]
      }),
      empresa: Joi.string().custom(objectId),
      user: Joi.string().custom(objectId),
    })
    .min(1),
};

export const deleteCursoBase = {
  params: Joi.object().keys({
    cursoBaseId: Joi.string().custom(objectId),
  }),
};
