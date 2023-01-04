import React from 'react'
import { NativeBaseProvider, View } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigate from './src/navigations/StackNavigate'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { nativeTheme } from './src/themes/NativeBase'
import { navigationTheme } from './src/themes/Navigation'
import AuthProvider from './src/contexts/AuthContext'
import {
  useFonts,
  Prompt_400Regular,
  Prompt_500Medium,
  Prompt_600SemiBold,
} from '@expo-google-fonts/prompt'
import Spinner from 'react-native-loading-spinner-overlay/lib'

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
      <NativeBaseProvider theme={nativeTheme}>
        <SafeAreaProvider>
          <View fontFamily="body" height="100%">
            <AuthProvider>
              <StackNavigate />
            </AuthProvider>
          </View>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
