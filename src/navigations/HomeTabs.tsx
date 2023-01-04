import { View } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { navigationItems } from '../Routes/bottom'
import { useTheme } from 'native-base'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import { useAuthContext } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'

const Tab = createBottomTabNavigator()

export type HomeTabsScreenProp = StackScreenProps<
  RootStackParamList,
  'HomeTabs'
>

type HomeTabsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeTabs'
>

const HomeTabs: React.FC<HomeTabsScreenProp> = ({ route }) => {
  const navigation = useNavigation<HomeTabsNavigationProp>()

  const { user } = useAuthContext()

  const { colors } = useTheme()

  useEffect(() => {
    if (!user.userId) {
      navigation.replace('Auth')
    }
  }, [user.userId])

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
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
                  color={colors.primary[500]}
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

export default HomeTabs
