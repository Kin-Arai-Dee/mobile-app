import { Gender, IUser } from 'dto/user'

export const MOCK_USER: IUser = {
  userId: 'admin',
  username: 'James',
  email: 'yugijamedi@outlook.com',
  age: 21,
  weight: 53,
  height: 176,
  banFood: [
    {
      _id: '12',
      ingredientName: 'กุ้ง',
    },
  ],
  gender: Gender.Male,
  withDescription: false,
  createAt: '',
  updateAt: '',
}
