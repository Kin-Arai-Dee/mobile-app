import React from 'react'
import { Image, Box, VStack, Pressable } from 'native-base'
import { IFoodName } from 'dto/food'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from 'Routes/RootStackParam'
import { StackNavigationProp } from '@react-navigation/stack'

export interface FoodSuggestProps {
  food: IFoodName
}

type FoodSuggestNavigationProp = StackNavigationProp<RootStackParamList>

const FoodSuggest: React.FC<FoodSuggestProps> = ({ food }) => {
  const navigation = useNavigation<FoodSuggestNavigationProp>()

  return (
    <Pressable
      onPress={() => food && navigation.navigate('FoodDetail', { food })}
      shadow="10"
      borderRadius="3xl"
    >
      <Box
        borderRadius="3xl"
        borderWidth="2px"
        borderColor="white"
        bg="white"
        m="2"
        shadow="10"
        overflow="hidden"
        width="150px"
        height="150px"
      >
        <VStack space="4" alignItems="center" textAlign="center">
          <Image
            width="100%"
            height="100%"
            alt={food.foodId}
            source={{
              uri: food?.imageUrl,
            }}
          />
        </VStack>
      </Box>
    </Pressable>
  )
}

export default FoodSuggest
