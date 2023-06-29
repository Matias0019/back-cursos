import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface ICategoriaCurso { //Define los campos del CategoriaCurso

  name:string;
  empresa:mongoose.Types.ObjectId;
  user:mongoose.Types.ObjectId;
}

export interface ICategoriaCursoDoc extends ICategoriaCurso, Document { 
}

export interface ICategoriaCursoModel extends Model<ICategoriaCursoDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
