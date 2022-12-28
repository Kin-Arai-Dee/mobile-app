export type TabScreen = 'Profile' | 'Target' | 'Home' | 'Random'

export type RootStackParamList = {
  Auth: undefined
  HomeTabs: undefined
} & Record<TabScreen, undefined>
