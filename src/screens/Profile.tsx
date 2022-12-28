import { View, Text } from 'react-native'
import React from 'react'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import { Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'

export type ProfileScreenProp = StackScreenProps<RootStackParamList, 'Profile'>

export type ProfileNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>

const Profile: React.FC<ProfileScreenProp> = ({ navigation }) => {
  console.log(navigation)

  return (
    <View>
      <Text>Profile</Text>
      <Button onPress={() => navigation.replace('Auth')}>log out</Button>
    </View>
  )
}

export default Profile
