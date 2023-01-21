import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import { IUserRegisterForm } from 'dto/user'
import GenericFormProvider from 'components/hook-form/FormProvider'
import InputController from 'components/hook-form/InputController'
import { EMAIL_REGEX } from 'constants/regex'
import { useAuthContext } from '../contexts/AuthContext'
import { AxiosError } from 'axios'
import { Alert } from 'react-native'

type RegisterNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>

const defaultData: IUserRegisterForm = {
  email: '',
  username: '',
  password: '',
}

const requireField: (keyof IUserRegisterForm)[] = [
  'email',
  'password',
  'username',
]

const Register: React.FC = () => {
  const navigation = useNavigation<RegisterNavigationProp>()
  const { register } = useAuthContext()

  const handleSubmit = async (data: IUserRegisterForm) => {
    try {
      await register(data)
      navigation.replace('HomeTabs')
    } catch (e) {
      const { response } = e as AxiosError

      Alert.alert('Register Failed', response?.data.detail)
    }
  }

  return (
    <GenericFormProvider
      submitText="Register"
      onSubmit={handleSubmit}
      py={12}
      px={8}
      resetAfterFail={{}}
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
        name="email"
        label="Email Address"
        rules={{
          required: 'Email address is require.',
          pattern: {
            value: EMAIL_REGEX,
            message: 'Must be valid Email',
          },
        }}
        placeholder="email address"
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
      />
    </GenericFormProvider>
  )
}

export default Register
