import React from 'react'

import { Box, Button, FormControl, Input, Stack, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import { IUserRegisterForm } from 'dto/user'
import useForm from 'hooks/useForm'

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
    <FormControl py={12} px={8} isInvalid>
      <Stack justifyContent="space-between" height="100%">
        <Stack>
          <Stack>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Username
            </FormControl.Label>
            <Input
              size="lg"
              variant="underlined"
              p={2}
              placeholder="username"
              onChangeText={value => setValue('username', value)}
            />
            <Box height={6}>
              <FormControl.ErrorMessage>
                {errors.username}
              </FormControl.ErrorMessage>
            </Box>
          </Stack>
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
            <Box height={6}>
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
            <Box height={6}>
              <FormControl.ErrorMessage>
                {errors.password}
              </FormControl.ErrorMessage>
            </Box>
          </Stack>
        </Stack>
        <Button size="lg" onPress={() => onSubmit(handleSubmit)} mt="5">
          Register
        </Button>
      </Stack>
    </FormControl>
  )
}

export default Register
