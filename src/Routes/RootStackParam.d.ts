import { IFood } from 'dto/food'
export type TabScreen = 'Profile' | 'FoodHistory' | 'Home' | 'Random'

export type RootStackParamList = {
  Auth: undefined
  HomeTabs: undefined
  Information: undefined
  UpdateInformation: undefined
  FoodSelector: undefined
  FoodDetail: { food: IFood | IFoodName }
} & Record<TabScreen, undefined>
