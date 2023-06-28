import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { AccessAndRefreshTokens } from '../token/token.interfaces';

export interface IUser {
    _id: mongoose.Types.ObjectId;
    firstName: string,
    lastName: string,
    displayName:string,
    password: string,
    active:Boolean,
    email: string,
    profileImageURL:string,
    role:string,
    isEmailVerified:Boolean,
    cuentaActiva:mongoose.Types.ObjectId,
    cuentas:[mongoose.Types.ObjectId],
    empresas:Array<mongoose.Types.ObjectId>,
		empresaActiva:mongoose.Types.ObjectId
}

export interface IUserDoc extends IUser, Document {
  _id: mongoose.Types.ObjectId;
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateUserBody = Partial<IUser>;

export type NewRegisteredUser = Omit<IUser, 'role' | 'isEmailVerified' | 'active' | 'profileImageURL'| 'cuenta' | 'empresas' | 'empresaActiva' | '_id' | "cuentaActiva" | "cuentas">;

export type NewCreatedUser = Omit<IUser, 'isEmailVerified' |  'active' | 'profileImageURL' | 'cuenta' | 'empresas' | 'empresaActiva' | 'displayName'| 'password' |'_id' >;

export type NewCreatedUserByBroken = Omit<IUser,   'profileImageURL' | 'active' >;

export interface IUserWithTokens {
  user: IUserDoc;
  tokens: AccessAndRefreshTokens;
}
