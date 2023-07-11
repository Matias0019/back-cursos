import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { ICursoBase } from './curso-base.interfaces';

const createCursoBaseBody: Record<keyof ICursoBase, any> = {
  name: Joi.string().allow(""),
  nivel: Joi.object({
    name: Joi.string().allow(""),
    codigo: Joi.number()
  }),
  horas: Joi.number(),
  categoria: Joi.string().custom(objectId),
  descripcion: Joi.string().allow(""),
  img: Joi.string().allow(""),
  modulos: Joi.array().items(Joi.object({
    name: Joi.string().allow(""),
    descripcion: Joi.string().allow(""),
    lecciones: Joi.array().items(Joi.object({
      name: Joi.string().allow(""),
      descripcion: Joi.string().allow(""),
      video: Joi.string().allow(""),
      img: Joi.string().allow(""),
      materialApoyo: Joi.array().items(Joi.object({
        url: Joi.string().allow("")
      })),
      preguntas: Joi.array().items(Joi.object({
        pregunta: Joi.string().allow(""),
        respuestas: Joi.array().items(Joi.object({
          respuesta: Joi.string().allow(""),
          correcta: Joi.boolean()
        }))
      })),
    })),
  })),
  empresa: Joi.string().custom(objectId),
  user: Joi.string().custom(objectId),
};

export const createCursoBase = {
  body: Joi.object().keys(createCursoBaseBody),
};

export const getCursoBases = {
  query: Joi.object().keys({
    name: Joi.string().allow(""),
    nivel: Joi.object({
      name: Joi.string().allow(""),
      codigo: Joi.number()
    }),
    horas: Joi.number(),
    categoria: Joi.string().custom(objectId),
    descripcion: Joi.string().allow(""),
    img: Joi.string().allow(""),
    modulos: Joi.array().items(Joi.object({
      name: Joi.string().allow(""),
      descripcion: Joi.string().allow(""),
      lecciones: Joi.array().items(Joi.object({
        name: Joi.string().allow(""),
        descripcion: Joi.string().allow(""),
        video: Joi.string().allow(""),
        img: Joi.string().allow(""),
        materialApoyo: Joi.array().items(Joi.object({
          url: Joi.string().allow("")
        })),
        preguntas: Joi.array().items(Joi.object({
          pregunta: Joi.string().allow(""),
          respuestas: Joi.array().items(Joi.object({
            respuesta: Joi.string().allow(""),
            correcta: Joi.boolean()
          }))
        })),
      })),
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
      name: Joi.string().allow(""),
      nivel: Joi.object({
        name: Joi.string().allow(""),
        codigo: Joi.number()
      }),
      horas: Joi.number(),
      categoria: Joi.string().custom(objectId),
      descripcion: Joi.string().allow(""),
      img: Joi.string().allow(""),
      modulos: Joi.array().items(Joi.object({
        name: Joi.string().allow(""),
        descripcion: Joi.string().allow(""),
        lecciones: Joi.array().items(Joi.object({
          name: Joi.string().allow(""),
          descripcion: Joi.string().allow(""),
          video: Joi.string().allow(""),
          img: Joi.string().allow(""),
          materialApoyo: Joi.array().items(Joi.object({
            url: Joi.string().allow("")
          })),
          preguntas: Joi.array().items(Joi.object({
            pregunta: Joi.string().allow(""),
            respuestas: Joi.array().items(Joi.object({
              respuesta: Joi.string().allow(""),
              correcta: Joi.boolean()
            }))
          })),
        })),
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
