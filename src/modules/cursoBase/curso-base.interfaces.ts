import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface ICursoBase { //Define los campos del CursoBase

  name:string;
  nivel: {name: string, codigo: number},
  horas:number,
  categoria:mongoose.Types.ObjectId,
  descripcion:string,
  img:string,
  modulos:[{id?:mongoose.Types.ObjectId,
    name: string;
    descripcion: string;
    lecciones: [{
      id?:mongoose.Types.ObjectId,
      name: string,
      descripcion: string,
      video: string,
      img: string,
      materialApoyo: [{ url: string }],
      preguntas: [{ pregunta: string, id?:mongoose.Types.ObjectId, respuestas: [{ respuesta: string, correcta: boolean, id?:mongoose.Types.ObjectId}] }]
    }];
  }],
  activo:boolean;
  empresa:mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId,
}

export interface ICursoBaseDoc extends ICursoBase, Document { 
}

export interface ICursoBaseModel extends Model<ICursoBaseDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
