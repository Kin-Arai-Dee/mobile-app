import React, { useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import { Avatar, Box, Stack, Text } from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay/lib'

type FoodDetailProps = StackScreenProps<RootStackParamList, 'FoodDetail'>

const FoodDetail: React.FC<FoodDetailProps> = ({
  route: { params },
  navigation,
}) => {
  if (!params) {
    return <Spinner visible textContent="loading..." />
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: params.food.foodName,
    })
  }, [])
  return (
    <Box m="4" flex="1">
      <Stack alignItems="center" space="4" textAlign="center">
        <Avatar source={{ uri: params.food.imageUrl }} size="280px" />
        <Text fontSize="4xl" fontWeight="medium">
          {params.food.foodName}
        </Text>
        <Text fontSize="lg" fontWeight="medium" color="primary.600">
          {`แคลอรี่ ${params.food.calories}`}
        </Text>
        <Stack width="100%" p="4" space="2">
          <Text fontSize="md">วิธีการทำ : {params.food.cookMethod}</Text>
          <Text fontSize="md">อาหารประเภท : {params.food.categorie}</Text>
          <Text fontSize="md">วัตถุดิบหลัก: {params.food.ingredient1}</Text>
          {params.food.ingredient2 && (
            <Text fontSize="md">วัตถุดิบรอง: {params.food.ingredient2}</Text>
          )}
          <Text fontSize="md">
            {`ราคาโดยประมาณ: ${params.food.predictionPrice} บาท`}
          </Text>
        </Stack>
      </Stack>
    </Box>
  )
}

export default FoodDetail
