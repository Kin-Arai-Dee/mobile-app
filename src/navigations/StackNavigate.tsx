import React from 'react'
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import HomeTabs from './HomeTabs'
import FoodDetail from 'screens/FoodDetail'
import AuthTab from 'screens/AuthTab'
import { useAuthContext } from '../contexts/AuthContext'
import FoodSelector from 'screens/FoodSelector'
import Information from 'screens/Information'
import { RootStackParamList } from 'Routes/RootStackParam'
import HistoryFood from 'screens/HistoryFood'
import WebviewScreen from 'screens/Webview'
import { HeaderBackButton } from '@react-navigation/elements'
import { Icon } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import IngredientState from 'screens/IngredientState'
const Stack = createStackNavigator<RootStackParamList>()

const StackNavigate = () => {
  const { user } = useAuthContext()

  return (
    <Stack.Navigator>
      {!user.userId && (
        <Stack.Group
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forScaleFromCenterAndroid,
          }}
        >
          <Stack.Screen name="Auth" component={AuthTab} />
        </Stack.Group>
      )}

      {!user.withDescription && (
        <Stack.Group
          screenOptions={{
            presentation: 'card',
          }}
        >
          <Stack.Screen
            name="Information"
            component={Information}
            options={{
              headerTitle: 'กรอกข้อมูลส่วนตัว',
            }}
          />
        </Stack.Group>
      )}

      {/* Screens for logged in users */}
      <Stack.Group
        screenOptions={{
          presentation: 'card',
          cardStyleInterpolator:
            CardStyleInterpolators.forScaleFromCenterAndroid,
        }}
      >
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FoodSelector"
          component={FoodSelector}
          options={{
            headerTitle: 'ปัดอาหารตามความชอบ',
          }}
        />
      </Stack.Group>
      {/* Common modal screens */}
      <Stack.Group
        screenOptions={{
          presentation: 'card',
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="UpdateInformation"
          component={Information}
          options={{
            headerTitle: 'แก้ไขข้อมูลส่วนตัว',
          }}
        />
        <Stack.Screen name="FoodDetail" component={FoodDetail} />
        <Stack.Screen name="IngredientState" component={IngredientState} />
        <Stack.Screen
          name="FoodHistory"
          component={HistoryFood}
          options={{
            headerTitle: 'ประวัติการสุ่ม',
          }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerBackTitleVisible: false,
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      >
        <Stack.Screen
          name="FoodDetail2"
          component={FoodDetail}
          options={({ navigation }) => ({
            headerLeft: () => {
              return (
                <Icon
                  as={Ionicons}
                  size={10}
                  ml={1}
                  name="close-outline"
                  color="primary.600"
                  onPress={navigation.goBack}
                />
              )
            },
          })}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerBackTitleVisible: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      >
        <Stack.Screen
          name="Webview"
          component={WebviewScreen}
          options={({ route, navigation }) => ({
            headerTitle: 'wongnai',
            headerBackgroundContainerStyle: {
              alignItems: 'center',
            },
            headerRight: () => {
              const { headerLeftInfo } = route.params
              if (!headerLeftInfo?.onPress) return undefined
              return (
                <Icon
                  as={Ionicons}
                  size={10}
                  name="close-outline"
                  color="primary.600"
                  onPress={navigation.goBack}
                />
              )
            },
            headerLeft: props => {
              const { headerLeftInfo } = route.params

              if (headerLeftInfo?.onPress) {
                return (
                  <HeaderBackButton
                    {...props}
                    label={headerLeftInfo.title}
                    onPress={headerLeftInfo.onPress}
                  />
                )
              }

              return (
                <Icon
                  as={Ionicons}
                  size={10}
                  name="close-outline"
                  color="primary.600"
                  onPress={navigation.goBack}
                />
              )
            },
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default StackNavigate
