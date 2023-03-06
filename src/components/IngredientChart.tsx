import React from 'react'
import { IIngredientCount } from 'dto/food'
import { BarChart } from 'react-native-chart-kit'
import { isEmpty } from 'lodash'
import { processFontFamily } from 'expo-font'
import { useTheme, View, Text } from 'native-base'
import { Dimensions } from 'react-native'
import { IColorHues } from 'native-base/lib/typescript/theme/v33x-theme/base/colors'

const screenDimensions = Dimensions.get('screen')

export interface IngredientChartProps {
  label: string
  ingredientData: IIngredientCount[]
  color: IColorHues
}

const IngredientChart = ({
  label,
  ingredientData,
  color,
}: IngredientChartProps) => {
  if (isEmpty(ingredientData)) {
    return null
  }

  const { colors } = useTheme()

  const labels = ingredientData.map(
    (ingredinet: IIngredientCount) => ingredinet.ingredientName
  )
  const data = ingredientData.map(
    (ingredinet: IIngredientCount) => ingredinet.count
  )

  if (isEmpty(data)) {
    return null
  }

  return (
    <View background="white">
      <Text padding="2" fontSize="lg" fontWeight="medium">
        {label}
      </Text>
      <BarChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
              withDots: false,
            },
          ],
        }}
        width={screenDimensions.width - 40}
        showValuesOnTopOfBars
        showBarTops={false}
        height={200}
        yAxisLabel=""
        yAxisSuffix=""
        fromZero
        withHorizontalLabels={false}
        withInnerLines={false}
        chartConfig={{
          formatTopBarValue: text => `${text} ครั้ง`,
          propsForLabels: {
            fontSize: '14',
            fontFamily: processFontFamily('Prompt_400Regular') || '',
          },
          backgroundColor: colors.white,
          backgroundGradientFrom: colors.white,
          backgroundGradientTo: colors.white,
          color: () => color[600],
          labelColor: () => color[600],
          fillShadowGradient: color[500],
          fillShadowGradientOpacity: 0.5,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: color[600],
          },
        }}
        style={{
          paddingRight: 0,
          marginVertical: 4,
        }}
      />
    </View>
  )
}

export default IngredientChart
