import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigate from './src/navigations/StackNavigate'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { nativeTheme } from './src/themes/NativeBase'
import { navigationTheme } from './src/themes/Navigation'

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <NativeBaseProvider theme={nativeTheme}>
        <SafeAreaProvider>
          <StackNavigate />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
