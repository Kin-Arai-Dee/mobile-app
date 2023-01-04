import { StackScreenProps } from '@react-navigation/stack'
import { Button, View } from 'native-base'
import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView, useWindowDimensions } from 'react-native'
import { TabView, SceneMap, SceneRendererProps } from 'react-native-tab-view'
import { RootStackParamList } from 'Routes/RootStackParam'
import Login from 'screens/Login'
import Register from 'screens/Register'
import CustomTabBar from 'components/TabBar'
import { useAuthContext } from '../contexts/AuthContext'

export type AuthScreenProp = StackScreenProps<RootStackParamList, 'Auth'>

const renderScene = SceneMap<SceneRendererProps>({
  login: Login,
  register: Register,
})

export default function AuthTab(props: AuthScreenProp) {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'login', title: 'เข้าสู่ระบบ' },
    { key: 'register', title: 'สมัครสมาชิก' },
  ])

  return (
    <>
      <SafeAreaView style={{ backgroundColor: 'white' }} />
      <SafeAreaView>
        <StatusBar backgroundColor="white" barStyle="light-content" />
        <View backgroundColor="gray.100" height="100%">
          <TabView
            navigationState={{
              index,
              routes,
            }}
            renderScene={renderScene}
            renderTabBar={props => (
              <CustomTabBar index={index} setIndex={setIndex} {...props} />
            )}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            style={{ marginTop: StatusBar.currentHeight }}
          />
        </View>
      </SafeAreaView>
    </>
  )
}
