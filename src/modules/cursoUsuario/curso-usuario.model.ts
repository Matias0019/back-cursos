import mongoose from 'mongoose';
import { paginate } from '../paginate';
import toJSON from '../toJSON/toJSON';
import { ICursoUsuarioDoc, ICursoUsuarioModel } from './curso-usuario.interfaces';
const { Schema } = mongoose

const cursoUsuarioSchema = new mongoose.Schema<ICursoUsuarioDoc, ICursoUsuarioModel>(
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
      porcentajeCompleto:{
        type: Number,
        default: 0,
      },
      nombre:{
        type: String,
        default: '',
        trim: true,
      },
      descripcion:{
        type: String,
        default: '',
      },
      leccionesCompletas:{
        type: Number,
        default: 0,
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
                  },
                  correcta:{
                    type:Boolean,
                  },
                  respuestaUsuario:{
                    type:Boolean,
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
