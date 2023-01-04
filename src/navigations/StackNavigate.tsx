import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeTabs from './HomeTabs'
import FoodDetail from 'screens/FoodDetail'
import AuthTab from 'screens/AuthTab'
import { useAuthContext } from '../contexts/AuthContext'
import { Text } from 'native-base'
import { View } from 'react-native'

const Stack = createStackNavigator()

const StackNavigate = () => {
  const { user } = useAuthContext()

  return (
    <Stack.Navigator>
      {/* Auth screens */}
      {!user.userId && (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthTab} />
        </Stack.Group>
      )}
      {/* Screens for logged in users */}
      <Stack.Group screenOptions={{ presentation: 'card' }}>
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            headerTitle: 'Kin Arai Dee',
          }}
        />
      </Stack.Group>
      {/* Common modal screens */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="FoodDetail" component={FoodDetail} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default StackNavigate
