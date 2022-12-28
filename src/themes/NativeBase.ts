import { extendTheme } from 'native-base'

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

export const nativeTheme = extendTheme({
  shadows: {
    '10': {
      shadowColor: '#000',
      shadowOffset: {
        height: 6,
      },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 11,
    },
  },
  colors: {
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
  },
})

type MyThemeType = typeof nativeTheme

declare module 'native-base' {
  interface ICustomTheme extends MyThemeType {}
}
