import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeTabs from './HomeTabs'
import Login from '../screens/Login'
import Register from '../screens/Register'
import FoodDetail from '../screens/FoodDetail'

const Stack = createStackNavigator()

const StackNavigate = () => {
  return (
    <Stack.Navigator>
      {/* Screens for logged in users */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='HomeTabs'
          component={HomeTabs}
          options={{
            headerTitle: 'Kin Arai Dee',
          }}
        />
      </Stack.Group>
      {/* Auth screens */}
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
      </Stack.Group>
      {/* Common modal screens */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='FoodDetail' component={FoodDetail} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default StackNavigate
