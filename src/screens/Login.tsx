import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import { IUserLoginForm } from 'dto/user'

import { SceneRendererProps } from 'react-native-tab-view'
import GenericFormProvider from 'components/hook-form/FormProvider'
import InputController from 'components/hook-form/InputController'
import { EMAIL_REGEX } from 'constants/regex'

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>

const Login: React.FC<SceneRendererProps> = props => {
  const navigation = useNavigation<LoginNavigationProp>()

  const handleSubmit = (data: IUserLoginForm) => {
    console.log(data)
    navigation.replace('HomeTabs')
  }

  return (
    <GenericFormProvider
      submitText="Login"
      onSubmit={handleSubmit}
      py={12}
      px={8}
    >
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

export default Login
