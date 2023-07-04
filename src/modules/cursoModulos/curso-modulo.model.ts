import mongoose from 'mongoose';
import { paginate } from '../paginate';
import toJSON from '../toJSON/toJSON';
import { ICursoModuloDoc, ICursoModuloModel } from './curso-modulo.interfaces';
const { Schema } = mongoose

const cursoModuloSchema = new mongoose.Schema<ICursoModuloDoc, ICursoModuloModel>(
  {
    name: {
      type: String,
      default: '',
      trim: true,
    },
    descripcion: {
      type: String,
      default: '',
    },
    lecciones: [{
      type: Schema.Types.ObjectId,
      ref: 'CursoLeccion'
    }],
    curso: {
      type: Schema.Types.ObjectId,
      ref: 'CursoBase'
    }
  },
  {
    timestamps: true,
  }
);

cursoModuloSchema.plugin(toJSON);
cursoModuloSchema.plugin(paginate);

const CursoModulo = mongoose.model<ICursoModuloDoc, ICursoModuloModel>('CursoModulo', cursoModuloSchema);

export default CursoModulo;
