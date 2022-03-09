import React from 'react'
import { createStackNavigator } from '@react-navigation/Stack'
import Home from '../screens/Home'

const HomeStack = createStackNavigator()

const HomeNavigate = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Home' component={Home} />
    </HomeStack.Navigator>
  )
}

export default HomeNavigate
