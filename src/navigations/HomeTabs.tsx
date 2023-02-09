import { View } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { navigationItems } from '../Routes/bottom'
import { useTheme, Text, Stack } from 'native-base'
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
        tabBarStyle: { paddingLeft: 10, paddingRight: 10, paddingTop: 30 },
      }}
    >
      {navigationItems.map(({ name, component, label, icon, title }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            headerTitle: title,
            tabBarLabel: ({ focused }) => {
              return (
                <Stack justifyContent="center" alignItems="center">
                  <Ionicons
                    name={`${icon}${focused ? '' : '-outline'}`}
                    color={focused ? colors.primary[500] : colors.primary[400]}
                    size={26}
                  />
                  <Text
                    fontSize="xs"
                    color={focused ? 'primary.500' : 'primary.400'}
                  >
                    {label}
                  </Text>
                </Stack>
              )
            },
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default HomeTabs
