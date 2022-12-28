import React from 'react'
import { Avatar, Box, VStack, Text, Stack } from 'native-base'
import { IFood } from 'dto/food'

export interface FoodCardProps {
  food: IFood
  size?: 'large' | 'medium'
  isShowCal?: boolean
}

const FoodCard: React.FC<FoodCardProps> = ({
  food,
  size = 'medium',
  isShowCal = true,
}) => {
  return (
    <Box
      borderRadius='3xl'
      bg='white'
      m='2'
      mt={size === 'medium' ? '20%' : '10%'}
      shadow='10'
    >
      <VStack space='4' alignItems='center' textAlign='center'>
        <Avatar
          size={size === 'medium' ? '40' : '64'}
          mt={`-${size === 'medium' ? '20%' : '10%'}`}
          source={{
            uri: food.foodPic,
          }}
          shadow='1'
        />
        <Box px='4'>
          <Stack height='16' alignItems='center'>
            <Text
              bold
              fontSize={size === 'medium' ? 'xl' : '3xl'}
              numberOfLines={2}
              textAlign='center'
            >
              {food.foodName}
            </Text>
          </Stack>
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
