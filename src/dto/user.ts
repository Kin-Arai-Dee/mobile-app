import { ITimeStamp } from './base'
import { TokenResponse } from './token'

export interface IUser extends ITimeStamp {
  userId: string
  username: string
  email: string
  gender: 'male' | 'female'
  age: Number
  weight: Number
  height: Number
  withDescription: boolean
  banFood: string[]
}

export interface IUpdateUsere
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
