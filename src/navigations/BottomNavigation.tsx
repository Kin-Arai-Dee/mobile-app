import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screen/Home'
import IoniconsList from '@expo/vector-icons/build/Ionicons'

import { Fontisto, Ionicons } from '@expo/vector-icons'
import Random from '../screen/Random'
import Target from '../screen/Target'
import Profile from '../screen/Profile'

const Tab = createBottomTabNavigator()
interface NavigationItem {
  name: string
  component: React.FC
  icon: 'home' | 'restaurant' | 'pie-chart' | 'person'
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Home',
    component: Home,
    icon: 'home',
  },
  {
    name: 'Random',
    component: Random,
    icon: 'restaurant',
  },
  {
    name: 'Target',
    component: Target,
    icon: 'pie-chart',
  },
  {
    name: 'Profile',
    component: Profile,
    icon: 'person',
  },
]

const BottomNavigation = () => {
  return (
    <Tab.Navigator>
      {navigationItems.map(({ name, component, icon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarLabel: () => {
              return null
            },
            tabBarIcon: ({ focused }) => (
              <View>
                <Ionicons
                  name={`${icon}${focused ? '' : '-outline'}`}
                  color='#fb923c'
                  size={22}
                />
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default BottomNavigation
