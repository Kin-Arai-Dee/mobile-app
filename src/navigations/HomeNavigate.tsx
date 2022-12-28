import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/Stack'
import HomeTabs from './HomeTabs'
import Login from 'screens/Login'
import Register from 'screens/Register'

const HomeStack = createStackNavigator()

const HomeNavigate = () => {
  return (
    <HomeStack.Navigator>
      {/* Auth screens */}
      <HomeStack.Group screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name='Login' component={Login} />
        <HomeStack.Screen name='Register' component={Register} />
      </HomeStack.Group>
      {/* Screens for logged in users */}
      <HomeStack.Group screenOptions={{ presentation: 'modal' }}>
        <HomeStack.Screen
          name='HomeTabs'
          component={HomeTabs}
          options={{
            headerTitle: 'Kin Arai Dee',
          }}
        />
      </HomeStack.Group>
    </HomeStack.Navigator>
  )
}

export default HomeNavigate
