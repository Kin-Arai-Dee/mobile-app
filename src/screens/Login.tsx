import React from 'react'

import { Box, Button, FormControl, Input, Stack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import { IUserLoginForm } from 'dto/user'
import useForm from 'hooks/useForm'
import { SceneRendererProps } from 'react-native-tab-view'

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>

const defaultData: IUserLoginForm = {
  email: '',
  password: '',
}

const requireField: (keyof IUserLoginForm)[] = ['email', 'password']

const Login: React.FC<SceneRendererProps> = props => {
  const navigation = useNavigation<LoginNavigationProp>()

  const { errors, setValue, onSubmit } = useForm<IUserLoginForm>({
    defaultData,
    requireField,
  })

  const handleSubmit = (data: IUserLoginForm) => {
    console.log(data)
    navigation.replace('HomeTabs')
  }

  return (
    <FormControl py={12} px={8} isInvalid>
      <Stack justifyContent="space-between" height="100%">
        <Stack>
          <Stack>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Email Address
            </FormControl.Label>
            <Input
              size="lg"
              variant="underlined"
              p={2}
              placeholder="email address"
              onChangeText={value => setValue('email', value)}
            />
            <Box height={8}>
              <FormControl.ErrorMessage>
                {errors.email}
              </FormControl.ErrorMessage>
            </Box>
          </Stack>
          <Stack>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Password
            </FormControl.Label>
            <Input
              size="lg"
              variant="underlined"
              p={2}
              type="password"
              placeholder="Password"
              onChangeText={value => setValue('password', value)}
            />
            <Box height={8}>
              <FormControl.ErrorMessage height="12">
                {errors.password}
              </FormControl.ErrorMessage>
            </Box>
          </Stack>
        </Stack>
        <Button size="lg" onPress={() => onSubmit(handleSubmit)} mt="5">
          Login
        </Button>
      </Stack>
    </FormControl>
  )
}

export default Login
