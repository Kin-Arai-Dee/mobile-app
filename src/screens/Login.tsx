import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import AuthTab from 'components/TabBar'

type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>

const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenProp>()
  return (
    <SafeAreaView>
      <AuthTab />
      <Text>Login</Text>
      <Button onPress={() => navigation.navigate('Home')}>Login</Button>
    </SafeAreaView>
  )
}

export default Login
