import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { AxiosError } from 'axios'
import GenericFormProvider from 'components/hook-form/FormProvider'
import InputController from 'components/hook-form/InputController'
import { useAuthContext } from '../contexts/AuthContext'
import { Gender, IUpdateUser } from '../dto/user'
import { Alert, ScrollView } from 'react-native'
import { RootStackParamList } from 'Routes/RootStackParam'
import UserService from 'services/UserService'
import { Stack, Text, View } from 'native-base'
import SelectController from 'components/hook-form/SelectController'
import ArrayInputController from 'components/hook-form/ArrayInputController'

export type ProfileScreenProp = StackScreenProps<
  RootStackParamList,
  'Information'
>

const Information: React.FC<ProfileScreenProp> = ({ navigation }) => {
  const { user } = useAuthContext()

  const handleSubmit = async (data: IUpdateUser) => {
    try {
      await UserService.updateUserData(user.userId, {
        ...data,
        isFirstTime: true,
      })
      navigation.navigate('FoodSelector')
    } catch (e) {
      const { response } = e as AxiosError

      Alert.alert('update fail', response?.data.detail)
    }
  }

  return (
    <View style={{ height: '100%' }}>
      <ScrollView style={{ padding: 16 }}>
        <Text fontWeight="500" fontSize="4xl" fontStyle="normal" mb="5">
          ข้อมูลส่วนตัว
        </Text>
        <Stack mb="10">
          <GenericFormProvider submitText="Next" onSubmit={handleSubmit}>
            <SelectController
              name="gender"
              label="Gender"
              rules={{
                required: 'Gender is require.',
              }}
              placeholder="gender"
              size="lg"
              selectItems={[
                {
                  label: 'Male',
                  value: Gender.Male,
                },
                {
                  label: 'Female',
                  value: Gender.Female,
                },
              ]}
            />
            <InputController
              name="age"
              label="Age"
              rules={{
                required: 'Age is require.',
              }}
              size="lg"
              placeholder="age"
              keyboardType="number-pad"
            />
            <InputController
              name="weight"
              label="Weight"
              rules={{
                required: 'Weight is require.',
              }}
              placeholder="weight"
              size="lg"
              keyboardType="decimal-pad"
            />
            <InputController
              name="height"
              label="height"
              rules={{
                required: 'Height is require.',
              }}
              placeholder="height"
              size="lg"
              keyboardType="decimal-pad"
            />
            <ArrayInputController
              name="banFood"
              label="Ban Food Ingredients"
              placeholder="ingredients name"
              size="lg"
            />
          </GenericFormProvider>
        </Stack>
      </ScrollView>
    </View>
  )
}

export default Information
