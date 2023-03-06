import IngredientChart from 'components/IngredientChart'
import useAutoGetTopIngredients from 'hooks/useAutoGetTopIngredients'
import { isEmpty } from 'lodash'
import { Box, ScrollView, Text, useTheme, VStack } from 'native-base'
import React from 'react'

const IngredientState = () => {
  const topIngredients = useAutoGetTopIngredients()

  const { colors } = useTheme()

  return (
    <ScrollView padding="4">
      <Text fontWeight="500" fontSize="4xl">
        สถิติการทานอาหาร
      </Text>
      {!isEmpty(topIngredients) && (
        <VStack space="4">
          <IngredientChart
            label="ประเภทเนื้อสัตว์"
            ingredientData={topIngredients.protein}
            color={colors.primary}
          />
          <IngredientChart
            label="ประเภทแป้ง"
            ingredientData={topIngredients.carbo}
            color={colors.purple}
          />
          <IngredientChart
            label="ประเภทผัก"
            ingredientData={topIngredients.mineral}
            color={colors.green}
          />
          <IngredientChart
            label="ประเภทผลไม้"
            ingredientData={topIngredients.vitamit}
            color={colors.fuchsia}
          />
          <IngredientChart
            label="อื่นๆ"
            ingredientData={topIngredients.other}
            color={colors.muted}
          />
        </VStack>
      )}
      <Box height={49} />
    </ScrollView>
  )
}

export default IngredientState
