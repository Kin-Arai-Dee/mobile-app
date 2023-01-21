import { IFood } from 'dto/food'
export type TabScreen = 'Profile' | 'Target' | 'Home' | 'Random'

export type RootStackParamList = {
  Auth: undefined
  HomeTabs: undefined
  Information: undefined
  FoodSelector: undefined
  FoodDetail: { food: IFood }
} & Record<TabScreen, undefined>
