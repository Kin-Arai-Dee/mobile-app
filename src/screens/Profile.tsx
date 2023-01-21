import React from 'react'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import { Box, Button, Avatar, Divider, VStack, Text, Stack } from 'native-base'
import { useAuthContext } from '../contexts/AuthContext'
import { IUser } from 'dto/user'
import { Alert } from 'react-native'
import { FEMALE_AVATAR, MALE_AVATAR } from 'images'
import * as SecureStore from 'expo-secure-store'

export type ProfileScreenProp = StackScreenProps<RootStackParamList, 'Profile'>

export type ProfileNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>

const Profile: React.FC<ProfileScreenProp> = ({ navigation }) => {
  const { user, setUser } = useAuthContext()

  const createLogoutAlert = () =>
    Alert.alert('ออกจากระบบ', 'คุณแน่ใจใช่ไหมว่าต้องการออกจากระบบ', [
      {
        text: 'ยกเลิก',
        onPress: () => {},
      },
      {
        text: 'ตกลง',
        onPress: async () => {
          setUser({} as IUser)
          await SecureStore.deleteItemAsync('refreshToken')
        },
      },
    ])

  return (
    <Box m="5">
      <Text fontWeight="500" fontSize="4xl" fontStyle="normal">
        ข้อมูลส่วนตัว
      </Text>
      {/* <Stack direction="column">
        <Text>รายละเอียด</Text>
      </Stack> */}
      <Box backgroundColor="white" borderRadius="2xl" my="4" minH="370px">
        <Stack direction="row" space="4" p="4">
          <Avatar
            width="110"
            height="110"
            source={user.gender === 'male' ? MALE_AVATAR : FEMALE_AVATAR}
          />
          <VStack space="4" flex="1" divider={<Divider />}>
            <Box px="4">
              <Text fontSize="lg" fontWeight="500">
                {user.username}
              </Text>
              <Text>{user.email}</Text>
            </Box>
            <Box px="4">
              <Text>อายุ: {user.age}</Text>
              <Text>น้ำหนัก: {user.weight}</Text>
              <Text>ส่วนสูง: {user.height}</Text>
            </Box>
            <Box px="4" pb="4">
              อาหารที่แพ้
              {user.banFood?.map(food => `- ${food}`)}
            </Box>
          </VStack>
        </Stack>
      </Box>
      <Button width="120px" alignSelf="flex-end" onPress={createLogoutAlert}>
        <Text fontWeight="500" color="white" fontSize="md">
          ออกจากระบบ
        </Text>
      </Button>
    </Box>
  )
}

export default Profile
