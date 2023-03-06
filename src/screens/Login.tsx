import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import { IUserLoginForm } from 'dto/user'

import GenericFormProvider from 'components/hook-form/FormProvider'
import InputController from 'components/hook-form/InputController'

import { useAuthContext } from '../contexts/AuthContext'
import { AxiosError } from 'axios'

import { KeyboardAvoidingView } from 'native-base'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import SingleSelectSearch from 'components/SingleSelectSearch'
import { MOCK_FOOD_LIST } from '../mocks/foodName'

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>

const Login: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>()
  const { login } = useAuthContext()

  const handleSubmit = async (data: IUserLoginForm) => {
    try {
      await login(data)
    } catch (e) {
      const { response } = e as AxiosError
      alert(response?.data.detail)
    }
  }

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={20}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <GenericFormProvider
          submitText="เข้าสู่ระบบ"
          onSubmit={handleSubmit}
          py={12}
          px={8}
        >
          <InputController
            name="username"
            label="Username"
            rules={{
              required: 'Username is require.',
            }}
            placeholder="username"
            size="lg"
            variant="underlined"
          />
          <InputController
            name="password"
            label="Password"
            rules={{
              required: 'Password is require.',
            }}
            size="lg"
            placeholder="password"
            variant="underlined"
            type="password"
            mb={24}
          />
        </GenericFormProvider>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Login
