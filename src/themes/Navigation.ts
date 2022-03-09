import { DefaultTheme } from '@react-navigation/native'

type Theme = typeof DefaultTheme

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f97316',
  },
}
