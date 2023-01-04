import React from 'react'
import { Box, ScrollView, Stack, Text, useTheme, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import FoodCard from 'components/FoodCard'
import { Ionicons } from '@expo/vector-icons'
import useAutoGetTopFood from 'hooks/useAuthGetTopFood'

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>

const Home: React.FC = () => {
  const navigation = useNavigation<homeScreenProp>()
  const topFoods = useAutoGetTopFood()

  const { colors } = useTheme()
  return (
    <Box m="5">
      <VStack space="16">
        <Text fontWeight="500" fontSize="4xl" mb="30">
          เมนูอาหารสำหรับคุณ
        </Text>
        <Stack
          direction="row"
          justifyContent="space-between"
          color="primary.500"
        >
          <Text color="primary.500">
            <Ionicons name="trophy" color={colors.primary[600]} size={23} />{' '}
            เมนูอาหารยอดนิยม
          </Text>
          <Text color="primary.500">ดูทั้งหมด</Text>
        </Stack>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        >
          {topFoods.map(food => (
            <Box width={220} key={food.foodId}>
              <FoodCard food={food} />
            </Box>
          ))}
        </ScrollView>
      </VStack>
    </Box>
  )
}

export default Home
