import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import { IUserLoginForm } from 'dto/user'

import { SceneRendererProps } from 'react-native-tab-view'
import GenericFormProvider from 'components/hook-form/FormProvider'
import InputController from 'components/hook-form/InputController'

import { useAuthContext } from '../contexts/AuthContext'

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>

const Login: React.FC<SceneRendererProps> = props => {
  const navigation = useNavigation<LoginNavigationProp>()
  const { login } = useAuthContext()

  const handleSubmit = async (data: IUserLoginForm) => {
    try {
      login(data)
    } catch (e) {
      alert(e?.response?.detail)
    }
  }

  return (
    <GenericFormProvider
      submitText="Login"
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
      />
    </GenericFormProvider>
  )
}

export default Login
