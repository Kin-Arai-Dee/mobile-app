import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import Login from 'screens/Login'
import Register from 'screens/Register'

const renderScene = SceneMap({
  login: Login,
  register: Register,
})

export default function AuthTab() {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'login', title: 'เข้าสู่ระบบ' },
    { key: 'register', title: 'สมัครสมาชิก' },
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}
