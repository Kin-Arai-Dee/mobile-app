import { IIngredientDB } from './food'
import { ITimeStamp } from './base'
import { TokenResponse } from './token'

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface IUser extends ITimeStamp {
  userId: string
  username: string
  email: string
  gender: Gender
  age: Number
  weight: Number
  height: Number
  withDescription: boolean
  banFood: IIngredientDB[]
}

export interface IUpdateUser
  extends Omit<
    IUser,
    | 'userId'
    | 'username'
    | 'email'
    | 'withDescription'
    | 'createAt'
    | 'updateAt'
    | 'banFood'
  > {
  banFood: string[]
}
export interface IUserLoginForm {
  username: string
  password: string
}

export interface IUserRegisterForm extends IUserLoginForm {
  email: string
}

export interface AuthResponse extends TokenResponse {
  user: IUser
}
