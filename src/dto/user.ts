import { ITimeStamp } from './base'
import { TokenResponse } from './token'

export enum Gender {
  Male = 'male',
  Female = 'female',
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
  banFood: string[]
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
  > {
  isFirstTime?: boolean
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
