import mongoose from 'mongoose';
import { paginate } from '../paginate';
import toJSON from '../toJSON/toJSON';
import { ICursoUsuarioDoc, ICursoUsuarioModel } from './curso-usuario.interfaces';
const { Schema } = mongoose

const cursoUsuarioSchema = new mongoose.Schema<ICursoUsuarioDoc, ICursoUsuarioModel>(
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
      porcentajeCompleto:{
        type: Number,
        default: 0,
        required: true,
      },
      nombre:{
        type: String,
        default: '',
        trim: true,
        required: true,
      },
      descripcion:{
        type: String,
        default: '',
        trim: true,
        required: true,
      },
      leccionesCompletas:{
        type: Number,
        default: 0,
        required: true,
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
            required: true,
          },
          img:{
            type:String,
            required: true,
          },
          completa:{
            type:Boolean,
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
                  respuestaUsuario:{
                    type:Boolean,
                    required: true,
                  },
                }
              ],
              completa: {
                type: Boolean,
              }
            }
          ]
        }
      ]
    }],
    curso:{
      type:Schema.Types.ObjectId,
      ref:'CursoBase'
    },
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

cursoUsuarioSchema.plugin(toJSON);
cursoUsuarioSchema.plugin(paginate);

const CursoUsuario = mongoose.model<ICursoUsuarioDoc, ICursoUsuarioModel>('CursoUsuario', cursoUsuarioSchema);

export default CursoUsuario;
