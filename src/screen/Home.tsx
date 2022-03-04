import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../screen/RootStackParam'

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>

const Home: React.FC = () => {
  const navigation = useNavigation<homeScreenProp>()
  return (
    <View>
      <Text>home</Text>
      <Button
        onPress={() => navigation.navigate('Random')}
        style={{ width: '50%' }}
      >
        Success
      </Button>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
