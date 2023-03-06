import React, { useEffect, useRef } from 'react'
import { Avatar, Box, VStack, Text, Stack, Pressable } from 'native-base'
import { IFood } from 'dto/food'
import { THINKING_FOOD } from 'images'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from 'Routes/RootStackParam'
import { StackNavigationProp } from '@react-navigation/stack'
import AnimatedLottieView from 'lottie-react-native'

export interface FoodCardProps {
  food?: IFood
  size?: 'large' | 'medium'
  isShowCal?: boolean
  isLoading?: boolean
  popUp?: boolean
}

type FoodCardNavigationProp = StackNavigationProp<RootStackParamList>

const FoodCard: React.FC<FoodCardProps> = ({
  food,
  size = 'medium',
  isShowCal = true,
  isLoading = false,
  popUp = false,
}) => {
  const navigation = useNavigation<FoodCardNavigationProp>()

  const animationRef = useRef<AnimatedLottieView>(null)

  useEffect(() => {
    if (isLoading) {
      animationRef.current?.play()
    } else {
      animationRef.current?.pause()
    }
  }, [isLoading])

  return (
    <Pressable
      onPress={() =>
        food &&
        navigation.navigate(popUp ? 'FoodDetail2' : 'FoodDetail', { food })
      }
    >
      <Box
        borderRadius="3xl"
        bg="white"
        m="2"
        mt={size === 'medium' ? '20%' : '10%'}
        shadow="10"
      >
        <VStack space="4" alignItems="center" textAlign="center">
          {!isLoading && food?.imageUrl ? (
            <>
              <Avatar
                size={size === 'medium' ? '40' : '64'}
                mt={`-${size === 'medium' ? '20%' : '10%'}`}
                source={{
                  uri: food?.imageUrl,
                }}
                shadow="1"
              />
              <Box px="4">
                <Stack height="16" alignItems="center">
                  <Text
                    fontWeight="500"
                    fontSize={size === 'medium' ? 'xl' : '3xl'}
                    numberOfLines={2}
                    textAlign="center"
                  >
                    {food?.title || ''}
                  </Text>
                </Stack>
              </Box>
              <Box px="4" pb="4">
                {isShowCal && (
                  <Text fontWeight="500" fontSize="md" color="primary.600">
                    {`แคลลอรี่โดยประมาณ ${food?.calories}`}
                  </Text>
                )}
              </Box>
            </>
          ) : (
            <AnimatedLottieView
              ref={animationRef}
              source={THINKING_FOOD}
              loop
              autoSize
              style={{
                marginBottom: 36,
              }}
            />
          )}
        </VStack>
      </Box>
    </Pressable>
  )
}

export default FoodCard
