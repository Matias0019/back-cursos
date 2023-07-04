import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface ICursoModulo { //Define los campos del CursoModulo
 
  name: string;
  descripcion: string;
  lecciones:[mongoose.Types.ObjectId];
  curso: mongoose.Types.ObjectId;
}

export interface ICursoModuloDoc extends ICursoModulo, Document { 
}

export interface ICursoModuloModel extends Model<ICursoModuloDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
