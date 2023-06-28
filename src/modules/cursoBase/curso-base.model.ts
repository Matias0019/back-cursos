import mongoose from 'mongoose';
import { paginate } from '../paginate';
import toJSON from '../toJSON/toJSON';
import { ICursoBaseDoc, ICursoBaseModel } from './curso-base.interfaces';
const { Schema } = mongoose

const cursoBaseSchema = new mongoose.Schema<ICursoBaseDoc, ICursoBaseModel>(
  {
    name: {
      type: String,
      required: true,
      default: '',
    },
    nivel: {
      name: {
        type: String,
        required: true,
      },
      codigo: {
        type: Number,
        required: true,
      },
    },
    horas: {
      type: Number,
      required: true,
    },
    categoria:{
      type:Schema.Types.ObjectId,
      ref:'Categoriacurso'
    },
    descripcion:{
      type: String,
      required: true,
    },
    img:{
      type: String,
      required: true,
    },
    modulos:[{
      nombre:{
        type: String,
        default: '',
        trim: true,
        required: true,
      },
      lecciones:[
        {
          nombre:{
            type: String,
            default: '',
            trim: true
          },
          video:{
            type:String,
            required: true,
          },
          img:{
            type:String,
            required: true,
          },
          materialApoyo:[
            {
              url:{
                type:String,
                required: false,
              },
            }
          ],
          preguntas:[
            {
              pregunta: {
                type: String,
                default: '',
                trim: true
              },
              respuestas:[
                {
                  respuesta:{
                    type:String,
                    required: true,
                  },
                  correcta:{
                    type:Boolean,
                    required: true,
                  },
                }
              ]
            }
          ]
        }
      ]
    }],
    empresa:{
      type:Schema.Types.ObjectId,
      ref:'Empresa'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
  }
);

cursoBaseSchema.plugin(toJSON);
cursoBaseSchema.plugin(paginate);

const CursoBase = mongoose.model<ICursoBaseDoc, ICursoBaseModel>('CursoBase', cursoBaseSchema);

export default CursoBase;
