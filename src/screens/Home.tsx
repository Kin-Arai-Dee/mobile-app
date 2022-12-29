import React from 'react'
import { Box, ScrollView, Stack, Text, useTheme, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import FoodCard from 'components/FoodCard'
import { mockFoods } from '../mocks/food'
import { Ionicons } from '@expo/vector-icons'

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>

const Home: React.FC = () => {
  const navigation = useNavigation<homeScreenProp>()

  const { colors } = useTheme()
  return (
    <Box m="5">
      <VStack space="16">
        <Text fontSize="4xl" bold mb="30">
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
          {mockFoods.map(food => (
            <Box width={220} key={food.foodID}>
              <FoodCard food={food} />
            </Box>
          ))}
        </ScrollView>
      </VStack>
    </Box>
  )
}

export default Home
