import mongoose from 'mongoose';
import { paginate } from '../paginate';
import toJSON from '../toJSON/toJSON';
import { ICursoBaseDoc, ICursoBaseModel } from './curso-base.interfaces';
const { Schema } = mongoose

const cursoBaseSchema = new mongoose.Schema<ICursoBaseDoc, ICursoBaseModel>(
  {
    name: {
      type: String,
      default: '',
    },
    nivel: {
      name: {
        type: String,
      },
      codigo: {
        type: Number,
      },
    },
    horas: {
      type: Number,
    },
    categoria:{
      type:Schema.Types.ObjectId,
      ref:'CategoriaCurso'
    },
    descripcion:{
      type: String,
      
    },
    img:{
      type: String,
    },
    modulos:[{
      nombre:{
        type: String,
        default: '',
        trim: true,
      },
      descripcion:{
        type: String,
        default: '',
      },
      lecciones:[
        {
          nombre:{
            type: String,
            default: '',
            trim: true
          },
          descripcion:{
            type: String,
            default: '',
          },
          video:{
            type:String,
          },
          img:{
            type:String,
          },
          materialApoyo:[
            {
              url:{
                type:String,
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
                  },
                  correcta:{
                    type:Boolean,
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
