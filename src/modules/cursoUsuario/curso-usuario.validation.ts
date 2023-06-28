import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { ICursoUsuario } from './curso-usuario.interfaces';

const createCursoUsuarioBody: Record<keyof ICursoUsuario, any> = {
  name: Joi.string().required(),
  nivel: Joi.object({name: Joi.string(), codigo: Joi.number()}).required(),
  horas: Joi.number().required(),
  categoria: Joi.string().custom(objectId),
  descripcion: Joi.string().required(),
  img: Joi.string().required(),
  modulos: Joi.array({
    porcentajeCompleto: Joi.number(),
    nombre: Joi.string(),
    descripcion: Joi.string(),
    leccionesCompletas: Joi.number(),
    lecciones:[{
      nombre: Joi.string(),
      descripcion: Joi.string(),
      video: Joi.string(),
      img: Joi.string(), 
      completa: Joi.boolean(),
      materialApoyo:[{url:Joi.string()}],
      preguntas:[{pregunta: Joi.string(), respuestas:[{respuesta: Joi.string(),respuestaUsuario: Joi.boolean(), completa: Joi.boolean(),}], completa: Joi.boolean()}]
    }]
  }),
  curso: Joi.string().custom(objectId),
  empresa: Joi.string().custom(objectId),
  user: Joi.string().custom(objectId),
};

export const createCursoUsuario = {
  body: Joi.object().keys(createCursoUsuarioBody),
};

export const getCursoUsuarios = {
  query: Joi.object().keys({
    name: Joi.string(),
    nivel: Joi.object({ name: Joi.string(), codigo: Joi.number() }),
    horas: Joi.number(),
    categoria: Joi.string().custom(objectId),
    descripcion: Joi.string(),
    img: Joi.string(),
    modulos: Joi.array({
      porcentajeCompleto: Joi.number(),
      nombre: Joi.string(),
      descripcion: Joi.string(),
      leccionesCompletas: Joi.number(),
      lecciones: [{
        nombre: Joi.string(),
        descripcion: Joi.string(),
        video: Joi.string(),
        img: Joi.string(),
        completa: Joi.boolean(),
        materialApoyo: [{ url: Joi.string() }],
        preguntas: [{ pregunta: Joi.string(), respuestas: [{ respuesta: Joi.string(), respuestaUsuario: Joi.boolean(), completa: Joi.boolean(), }], completa: Joi.boolean() }]
      }]
    }),
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
      name: Joi.string(),
      nivel: Joi.object({ name: Joi.string(), codigo: Joi.number() }),
      horas: Joi.number(),
      categoria: Joi.string().custom(objectId),
      descripcion: Joi.string(),
      img: Joi.string(),
      modulos: Joi.array({
        porcentajeCompleto: Joi.number(),
        nombre: Joi.string(),
        descripcion: Joi.string(),
        leccionesCompletas: Joi.number(),
        lecciones: [{
          nombre: Joi.string(),
          descripcion: Joi.string(),
          video: Joi.string(),
          img: Joi.string(),
          completa: Joi.boolean(),
          materialApoyo: [{ url: Joi.string() }],
          preguntas: [{ pregunta: Joi.string(), respuestas: [{ respuesta: Joi.string(), respuestaUsuario: Joi.boolean(), completa: Joi.boolean(), }], completa: Joi.boolean() }]
        }]
      }),
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
