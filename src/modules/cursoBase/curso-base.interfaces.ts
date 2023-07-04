import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface ICursoBase { //Define los campos del CursoBase

  name:string;
  nivel: {name: string, codigo: number},
  horas:number,
  categoria:mongoose.Types.ObjectId,
  descripcion:string,
  img:string,
  modulos:[{name: string;
    descripcion: string;
    lecciones: [{
      name: string,
      descripcion: string,
      video: string,
      img: string,
      materialApoyo: [{ url: string }],
      preguntas: [{ pregunta: string, respuestas: [{ respuesta: string, correcta: boolean, }] }]
    }];
  }],
  empresa:mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId,
}

export interface ICursoBaseDoc extends ICursoBase, Document { 
}

export interface ICursoBaseModel extends Model<ICursoBaseDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
