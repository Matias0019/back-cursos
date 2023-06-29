import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { ICursoBase } from './curso-base.interfaces';

const createCursoBaseBody: Record<keyof ICursoBase, any> = {
  name: Joi.string(),
  nivel: Joi.object({
    name: Joi.string(),
    codigo: Joi.number()
  }),
  horas: Joi.number(),
  categoria: Joi.string().custom(objectId),
  descripcion: Joi.string(),
  img: Joi.string(),
  modulos: Joi.array().items(Joi.object({
    nombre: Joi.string(),
    descripcion: Joi.string(),
    lecciones: Joi.array().items(Joi.object({
      nombre: Joi.string(),
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
      }))
    }))
  })),
  empresa: Joi.string().custom(objectId),
  user: Joi.string().custom(objectId),
};

export const createCursoBase = {
  body: Joi.object().keys(createCursoBaseBody),
};

export const getCursoBases = {
  query: Joi.object().keys({
    name: Joi.string(),
    nivel: Joi.object({
      name: Joi.string(),
      codigo: Joi.number()
    }),
    horas: Joi.number(),
    categoria: Joi.string().custom(objectId),
    descripcion: Joi.string(),
    img: Joi.string(),
    modulos: Joi.array().items(Joi.object({
      nombre: Joi.string(),
      descripcion: Joi.string(),
      lecciones: Joi.array().items(Joi.object({
        nombre: Joi.string(),
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
        }))
      }))
    })),
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
      nivel: Joi.object({
        name: Joi.string(),
        codigo: Joi.number()
      }),
      horas: Joi.number(),
      categoria: Joi.string().custom(objectId),
      descripcion: Joi.string(),
      img: Joi.string(),
      modulos: Joi.array().items(Joi.object({
        nombre: Joi.string(),
        descripcion: Joi.string(),
        lecciones: Joi.array().items(Joi.object({
          nombre: Joi.string(),
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
          }))
        }))
      })),
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
