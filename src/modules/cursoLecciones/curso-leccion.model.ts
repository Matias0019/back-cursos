import mongoose from 'mongoose';
import { paginate } from '../paginate';
import toJSON from '../toJSON/toJSON';
import { ICursoLeccionDoc, ICursoLeccionModel } from './curso-leccion.interfaces';
const { Schema } = mongoose

const cursoLeccionSchema = new mongoose.Schema<ICursoLeccionDoc, ICursoLeccionModel>(
  {
    name: {
      type: String,
      default: '',
      trim: true
    },
    descripcion: {
      type: String,
      default: '',
    },
    video: {
      type: String,
    },
    img: {
      type: String,
    },
    materialApoyo: [
      {
        url: {
          type: String,
        },
      }
    ],
    preguntas: [
      {
        pregunta: {
          type: String,
          default: '',
        },
        respuestas: [
          {
            respuesta: {
              type: String,
            },
            correcta: {
              type: Boolean,
            },
          }
        ]
      }
    ],
    modulo: {
      type: Schema.Types.ObjectId,
      ref: 'CursoModulo'
    }
  },
  {
    timestamps: true,
  }
);

cursoLeccionSchema.plugin(toJSON);
cursoLeccionSchema.plugin(paginate);

const CursoLeccion = mongoose.model<ICursoLeccionDoc, ICursoLeccionModel>('CursoLeccion', cursoLeccionSchema);

export default CursoLeccion;
