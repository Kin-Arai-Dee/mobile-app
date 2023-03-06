import { IFood } from 'dto/food'
export type TabScreen = 'Profile' | 'FoodHistory' | 'Home' | 'Random'

export type RootStackParamList = {
  Auth: undefined
  HomeTabs: {
    screen: TabScreen
  }
  Information: undefined
  UpdateInformation: undefined
  FoodSelector: undefined
  FoodDetail: { food: IFood }
  FoodDetail2: { food: IFood }
  IngredientState: undefined
  Webview: {
    uri: string
    headerLeftInfo?: { title?: string; onPress?: () => void }
  }
} & Record<TabScreen, undefined>

export type BottomTabParam = Record<TabScreen, undefined>
