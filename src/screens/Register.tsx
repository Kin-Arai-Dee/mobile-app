import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import { IUserRegisterForm } from 'dto/user'
import useForm from 'hooks/useForm'
import GenericFormProvider from 'components/hook-form/FormProvider'
import InputController from 'components/hook-form/InputController'
import { EMAIL_REGEX } from 'constants/regex'

type RegisterNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>

const defaultData: IUserRegisterForm = {
  username: '',
  email: '',
  password: '',
}

const requireField: (keyof IUserRegisterForm)[] = [
  'email',
  'password',
  'username',
]

const Register: React.FC = () => {
  const navigation = useNavigation<RegisterNavigationProp>()

  const { errors, setValue, onSubmit } = useForm<IUserRegisterForm>({
    defaultData,
    requireField,
  })

  const handleSubmit = (data: IUserRegisterForm) => {
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
        name="username"
        label="Username"
        rules={{
          required: 'Username is require.',
        }}
        placeholder="email address"
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
