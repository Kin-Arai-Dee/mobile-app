import { Pressable, View } from 'react-native'
import React, { useState } from 'react'
import FoodTinderCard from 'components/FoodTinderCard'
import { Overlay, Stack, Image } from 'native-base'
import { TUTORIAL_TINDER_CARD } from 'images'
const FoodSelector = () => {
  const [isShow, setIsShow] = useState(true)

  return (
    <View>
      <Overlay isOpen={isShow} isKeyboardDismissable useRNModal>
        <Pressable onPress={() => setIsShow(false)}>
          <Stack
            background="rgba(91, 91, 91, 0.85)"
            height="100%"
            alignItems="center"
          >
            <Image
              width="90%"
              height="300px"
              resizeMode="contain"
              mt="140px"
              source={TUTORIAL_TINDER_CARD}
              alt="tutorial"
            />
          </Stack>
        </Pressable>
      </Overlay>
      <FoodTinderCard nextPage />
    </View>
  )
}

export default FoodSelector
