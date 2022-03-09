import React from 'react'
import { Avatar, Box, VStack, Text } from 'native-base'
import { IFood } from '../dto/food'

export interface FoodCardProps {
  food: IFood
  size?: string
  top?: string
  isShowCal?: boolean
}

const FoodCard: React.FC<FoodCardProps> = ({
  food,
  size = '48',
  top = '15%',
  isShowCal = true,
}) => {
  return (
    <Box borderRadius='3xl' bg='white' m='2' mt={top} shadow='10'>
      <VStack space='6' alignItems='center'>
        <Avatar
          size={size}
          mt={`-${top}`}
          source={{
            uri: food.foodPic,
          }}
          shadow='1'
        />
        <Box px='4'>
          <Text bold fontSize='xl'>
            {food.foodName}
          </Text>
        </Box>

        <Box px='4' pb='4'>
          {isShowCal && (
            <Text bold fontSize='md' color='primary.600'>
              แคลลอรี่ {food.calories}
            </Text>
          )}
        </Box>
      </VStack>
    </Box>
  )
}

export default FoodCard
