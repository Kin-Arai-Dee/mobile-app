import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import { IUserLoginForm } from 'dto/user'

import GenericFormProvider from 'components/hook-form/FormProvider'
import InputController from 'components/hook-form/InputController'

import { useAuthContext } from '../contexts/AuthContext'
import { AxiosError } from 'axios'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>

const Login: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>()
  const { login } = useAuthContext()

  const handleSubmit = async (data: IUserLoginForm) => {
    try {
      login(data)
    } catch (e) {
      const { response } = e as AxiosError
      alert(response?.data.detail)
    }
  }

  return (
    <KeyboardAwareScrollView extraScrollHeight={30} keyboardOpeningTime={0}>
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
    </KeyboardAwareScrollView>
  )
}

export default Login
