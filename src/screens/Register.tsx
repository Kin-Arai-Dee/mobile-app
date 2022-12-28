import { Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'

type RegisterScreenProp = StackNavigationProp<RootStackParamList, 'Register'>

const Register: React.FC = () => {
  const navigation = useNavigation<RegisterScreenProp>()
  return (
    <SafeAreaView>
      <Text>Register</Text>
      <Button onPress={() => navigation.navigate('Home')}>Register</Button>
    </SafeAreaView>
  )
}

export default Register
