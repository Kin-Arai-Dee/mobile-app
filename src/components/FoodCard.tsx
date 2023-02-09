import React from 'react'
import { Avatar, Box, VStack, Text, Stack, Pressable } from 'native-base'
import { IFood } from 'dto/food'
import { QUESTION_IMAGE } from 'images'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from 'Routes/RootStackParam'
import { StackNavigationProp } from '@react-navigation/stack'

export interface FoodCardProps {
  food?: IFood
  size?: 'large' | 'medium'
  isShowCal?: boolean
}

type FoodCardNavigationProp = StackNavigationProp<RootStackParamList>

const FoodCard: React.FC<FoodCardProps> = ({
  food,
  size = 'medium',
  isShowCal = true,
}) => {
  const navigation = useNavigation<FoodCardNavigationProp>()

  return (
    <Pressable
      onPress={() => food && navigation.navigate('FoodDetail', { food })}
    >
      <Box
        borderRadius="3xl"
        bg="white"
        m="2"
        mt={size === 'medium' ? '20%' : '10%'}
        shadow="10"
      >
        <VStack space="4" alignItems="center" textAlign="center">
          <Avatar
            size={size === 'medium' ? '40' : '64'}
            mt={`-${size === 'medium' ? '20%' : '10%'}`}
            source={
              food?.imageUrl
                ? {
                    uri: food?.imageUrl,
                  }
                : QUESTION_IMAGE
            }
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
                {food?.foodName || '????'}
              </Text>
            </Stack>
          </Box>
          <Box px="4" pb="4">
            {isShowCal && (
              <Text fontWeight="500" fontSize="md" color="primary.600">
                {`แคลลอรี่ ${food?.calories}`}
              </Text>
            )}
          </Box>
        </VStack>
      </Box>
    </Pressable>
  )
}

export default FoodCard
