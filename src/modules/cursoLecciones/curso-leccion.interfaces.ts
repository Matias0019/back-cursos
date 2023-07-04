import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface ICursoLeccion { //Define los campos del CursoLeccion

  name: string,
  descripcion: string,
  video: string,
  img: string,
  materialApoyo: [{ url: string }],
  preguntas: [{ pregunta: string, respuestas: [{ respuesta: string, correcta: boolean, }] }]
  modulo: mongoose.Types.ObjectId;
}

export interface ICursoLeccionDoc extends ICursoLeccion, Document { 
}

export interface ICursoLeccionModel extends Model<ICursoLeccionDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
