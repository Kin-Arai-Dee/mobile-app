import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeTabs from './HomeTabs'
import FoodDetail from 'screens/FoodDetail'
import AuthTab from 'screens/AuthTab'
import { useAuthContext } from '../contexts/AuthContext'
import FoodSelector from 'screens/FoodSelector'
import Information from 'screens/Information'
import { RootStackParamList } from 'Routes/RootStackParam'
import HistoryFood from 'screens/HistoryFood'

const Stack = createStackNavigator<RootStackParamList>()

const StackNavigate = () => {
  const { user } = useAuthContext()

  return (
    <Stack.Navigator>
      {!user.userId && (
        <Stack.Group screenOptions={{ headerShown: false }}>
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
          <Stack.Screen
            name="FoodSelector"
            component={FoodSelector}
            options={{
              headerTitle: 'ปัดอาหารที่คุณชอบ',
            }}
          />
        </Stack.Group>
      )}

      {/* Screens for logged in users */}
      <Stack.Group screenOptions={{ presentation: 'card' }}>
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
      {/* Common modal screens */}
      <Stack.Group
        screenOptions={{ presentation: 'card', headerBackTitleVisible: false }}
      >
        <Stack.Screen
          name="UpdateInformation"
          component={Information}
          options={{
            headerTitle: 'แก้ไขข้อมูลส่วนตัว',
          }}
        />
        <Stack.Screen name="FoodDetail" component={FoodDetail} />
        <Stack.Screen
          name="FoodHistory"
          component={HistoryFood}
          options={{
            headerTitle: 'ประวัติการสุ่ม',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default StackNavigate
