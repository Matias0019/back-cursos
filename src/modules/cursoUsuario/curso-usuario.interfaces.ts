import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

// export interface ICursoUsuario { //Define los campos del CursoUsuario

//   // name:string;
//   // nivel: {name: string, codigo: number};
//   // horas:number;
//   // categoria:mongoose.Types.ObjectId;
//   // descripcion:string;
//   // img:string;
//   modulos:[{
//     id: mongoose.Types.ObjectId,
//     porcentajeCompleto: number,
//     //nombre: string,
//     //descripcion: string,
//     leccionesCompletas: number,
//     lecciones:[{
//       id:mongoose.Types.ObjectId,
//       //nombre: string,
//       // descripcion: string,
//       // video: string,
//       // img: string,
//       completa: boolean,
//       //materialApoyo:[{url:string}],
//       preguntas:[{
//         id:mongoose.Types.ObjectId,
//         //pregunta: string,
//         completa: boolean,
//         respuestas:[{
//           id:mongoose.Types.ObjectId,
//           //respuesta: string,
//           //correcta: boolean, 
//           respuestaUsuario: boolean
//         }], 
//         }]
//     }]
//   }];
//   curso: mongoose.Types.ObjectId;
//   empresa: mongoose.Types.ObjectId;
//   user: mongoose.Types.ObjectId;
// }

export interface ICursoUsuario {
  modulos: {
    id: mongoose.Types.ObjectId;
    porcentajeCompleto: number;
    leccionesCompletas: number;
    lecciones: {
      id: mongoose.Types.ObjectId;
      completa: boolean;
      preguntas: {
        id: mongoose.Types.ObjectId;
        completa: boolean;
        respuestas: {
          id: mongoose.Types.ObjectId;
          respuestaUsuario: boolean;
        }[];
      }[];
    }[];
  }[];
  curso: mongoose.Types.ObjectId;
  empresa: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

export interface ICursoUsuarioDoc extends ICursoUsuario, Document { 
}

export interface ICursoUsuarioModel extends Model<ICursoUsuarioDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
