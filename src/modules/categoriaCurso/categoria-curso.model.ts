import mongoose from 'mongoose';
import { paginate } from '../paginate';
import toJSON from '../toJSON/toJSON';
import { ICategoriaCursoDoc, ICategoriaCursoModel } from './categoria-curso.interfaces';
const { Schema } = mongoose

const categoriaCursoSchema = new mongoose.Schema<ICategoriaCursoDoc, ICategoriaCursoModel>(
  {

    name: {
      type: String,
      required: true
    },
    empresa:{
      type:Schema.Types.ObjectId,
      ref:'Empresa'
    },
    user:{
      type:Schema.Types.ObjectId,
      ref:'User',
    },
  },
  {
    timestamps: true,
  }
);

categoriaCursoSchema.plugin(toJSON);
categoriaCursoSchema.plugin(paginate);

const CategoriaCurso = mongoose.model<ICategoriaCursoDoc, ICategoriaCursoModel>('CategoriaCurso', categoriaCursoSchema);

export default CategoriaCurso;
