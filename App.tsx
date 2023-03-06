import React from 'react'
import { View } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigate from './src/navigations/StackNavigate'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { navigationTheme } from './src/themes/Navigation'
import AuthProvider from './src/contexts/AuthContext'
import {
  useFonts,
  Prompt_400Regular,
  Prompt_500Medium,
  Prompt_600SemiBold,
} from '@expo-google-fonts/prompt'
import Spinner from 'react-native-loading-spinner-overlay/lib'
import NativeBaseProviderWithTheme from 'components/NativeBaseProviderWithTheme'

export default function App() {
  const [fontsLoaded] = useFonts({
    Prompt_400Regular,
    Prompt_500Medium,
    Prompt_600SemiBold,
  })

  if (!fontsLoaded) {
    return <Spinner visible textContent="loading" />
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <NativeBaseProviderWithTheme>
        <SafeAreaProvider>
          <View height="100%">
            <AuthProvider>
              <StackNavigate />
            </AuthProvider>
          </View>
        </SafeAreaProvider>
      </NativeBaseProviderWithTheme>
    </NavigationContainer>
  )
}
