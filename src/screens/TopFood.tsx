import React from 'react'
import { Box, ScrollView, Stack, Text, useTheme, VStack } from 'native-base'

import FoodCard from 'components/FoodCard'
import { Ionicons } from '@expo/vector-icons'
import useAutoGetTopFood from 'hooks/useAuthGetTopFood'
import FoodSuggest from 'components/foodSuggest'
import { useAutoRandomUnvotedFood } from 'hooks/useAutoRandomUnvotedFood'
import Spinner from 'react-native-loading-spinner-overlay/lib'

const TopFood: React.FC = () => {
  const { topFoods, loading } = useAutoGetTopFood()
  const { foods, loading: foodLoading } = useAutoRandomUnvotedFood(20)

  const { colors } = useTheme()

  if (loading || foodLoading) {
    return <Spinner visible textContent="loading..." />
  }

  return (
    <Box m="5">
      <VStack space="4">
        <Text fontWeight="500" fontSize="4xl">
          เมนูอาหารยอดนิยม
        </Text>
        <Stack
          direction="row"
          justifyContent="space-between"
          color="primary.500"
        >
          <Text color="primary.500" fontSize="md">
            <Ionicons name="trophy" color={colors.primary[600]} size={18} /> 10
            เมนูอาหารที่คนเลือกทานบ่อยที่สุด!!
          </Text>
        </Stack>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        >
          {topFoods.map(food => (
            <Box width={220} key={food.foodId}>
              <FoodCard food={food} isShowCal={false} />
            </Box>
          ))}
        </ScrollView>
        <Stack
          direction="row"
          justifyContent="space-between"
          color="primary.500"
        >
          <Text color="primary.500" fontSize="md">
            <Ionicons name="fast-food" color={colors.primary[600]} size={18} />{' '}
            อาหารแปลกที่คุณอาจจะอยากลอง
          </Text>
        </Stack>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        >
          {foods.map(food => (
            <Box key={food.foodId}>
              <FoodSuggest food={food} />
            </Box>
          ))}
        </ScrollView>
      </VStack>
    </Box>
  )
}

export default TopFood
