import mongoose from 'mongoose';
import { paginate } from '../paginate';
import toJSON from '../toJSON/toJSON';
import { ICursoUsuarioDoc, ICursoUsuarioModel } from './curso-usuario.interfaces';
const { Schema } = mongoose

const cursoUsuarioSchema = new mongoose.Schema<ICursoUsuarioDoc, ICursoUsuarioModel>(
  {
    modulos:[{
      id:{
        type:Schema.Types.ObjectId,
      },
      porcentajeCompleto:{
        type: Number,
        default: 0,
      },
      leccionesCompletas:{
        type: Number,
        default: 0,
      },
      lecciones:[
        {
          id:{
            type:Schema.Types.ObjectId,
          },
          completa:{
            type:Boolean,
          },
          preguntas:[
            {
              id:{
                type:Schema.Types.ObjectId,
              },
              completa: {
                type: Boolean,
              },
              respuestas:[
                {
                  id:{
                    type:Schema.Types.ObjectId,
                  },
                  respuestaUsuario:{
                    type:Boolean,
                  },
                }
              ],
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
