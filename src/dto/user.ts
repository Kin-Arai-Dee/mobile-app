export interface IUser {
  userID: string
  username: string
  mail: string
  imageUrl: string
  age: number
  weight: number
  height: number
  favoriteFood: string[]
  freqFood: string
  banFood: string[]
}

export interface IUserLoginForm {
  email: string
  password: string
}

export interface IUserRegisterForm extends IUserLoginForm {
  username: string
}
