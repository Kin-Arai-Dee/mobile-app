import React from 'react'
import { Button, Text } from 'native-base'
import getTimeFormat from 'utils/getTimeFormat'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface CoolDownButtonProps {
  cooldownTime: number
}

const CoolDownButton = ({ cooldownTime }: CoolDownButtonProps) => {
  return (
    <Button
      rounded="full"
      py="4"
      mt="6"
      // disabled
      onPress={async () => await AsyncStorage.removeItem('foodCooldown')}
      variant="outline"
      borderColor="primary.600"
    >
      <Text fontSize="xl" fontWeight="500" color="primary.600">
        {!cooldownTime
          ? 'กำลังโหลด..'
          : `สุ่มได้อีกครั้งใน ${getTimeFormat(cooldownTime)}`}
      </Text>
    </Button>
  )
}

export default CoolDownButton
