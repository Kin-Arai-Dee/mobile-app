import React from 'react'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { AxiosError } from 'axios'
import GenericFormProvider from 'components/hook-form/FormProvider'
import InputController from 'components/hook-form/InputController'
import { useAuthContext } from '../contexts/AuthContext'
import { Gender, IUpdateUser } from '../dto/user'
import { Alert, ScrollView } from 'react-native'
import { RootStackParamList } from 'Routes/RootStackParam'
import UserService from 'services/UserService'
import { Stack, Text } from 'native-base'
import SelectController from 'components/hook-form/SelectController'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MultiSelectController from 'components/hook-form/MultiSelectController'
import { MOCK_INGREDIENTS } from '../mocks/ingredients'

type LoginNavigationProp = StackNavigationProp<RootStackParamList>

type InformationProps = StackScreenProps<RootStackParamList>

const Information: React.FC<InformationProps> = ({ route }) => {
  const { user, setUser } = useAuthContext()

  const { replace, goBack } = useNavigation<LoginNavigationProp>()

  const handleSubmit = async (data: any) => {
    try {
      const newData: IUpdateUser = {
        ...data,
        banFood: data.banFood.map((ban: any) => ban._id),
      }

      const userData = await UserService.updateUserData(user.userId, newData)

      setUser(userData)

      if (user.withDescription) {
        goBack()
      } else {
        replace('FoodSelector')
      }
    } catch (e) {
      const { response } = e as AxiosError

      Alert.alert('update fail', response?.data.detail)
    }
  }

  return (
    <KeyboardAwareScrollView extraScrollHeight={30} keyboardOpeningTime={0}>
      <ScrollView style={{ padding: 16 }}>
        <Text fontWeight="500" fontSize="4xl" fontStyle="normal" mb="5">
          {route.name === 'UpdateInformation'
            ? 'แก้ไขข้อมูลส่วนตัว'
            : 'กรอกข้อมูลส่วนตัว'}
        </Text>
        <Stack mb="10">
          <GenericFormProvider
            submitText="Next"
            onSubmit={handleSubmit}
            formOption={{
              defaultValues: user,
            }}
          >
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
                {
                  label: 'Other',
                  value: Gender.Other,
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
            <MultiSelectController
              name="banFood"
              label="Ban Food"
              valueField="_id"
              labelField="ingredientName"
              placeholder="select food that you ban"
              list={MOCK_INGREDIENTS.data}
              errorStyle={{ textColor: 'red' }}
            />
          </GenericFormProvider>
        </Stack>
      </ScrollView>
    </KeyboardAwareScrollView>
  )
}

export default Information
