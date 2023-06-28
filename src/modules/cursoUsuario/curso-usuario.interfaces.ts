import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface ICursoUsuario { //Define los campos del CursoUsuario

  name:string;
  nivel: {name: string, codigo: number};
  horas:number;
  categoria:mongoose.Types.ObjectId;
  descripcion:string;
  img:string;
  modulos:[{
    porcentajeCompleto: number,
    nombre: string,
    descripcion: string,
    leccionesCompletas: string,
    lecciones:[{
      nombre: string,
      descripcion: string,
      video: string,
      img: string,
      completa: boolean,
      materialApoyo:[{url:string}],
      preguntas:[{pregunta: string, respuestas:[{respuesta: string,correcta: boolean, respuestaUsuario: boolean}], completa: boolean}]
    }]
  }];
  curso: mongoose.Types.ObjectId;
  empresa: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

export interface ICursoUsuarioDoc extends ICursoUsuario, Document { 
}

export interface ICursoUsuarioModel extends Model<ICursoUsuarioDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
