import React from 'react'
import { Box, Button, Text, VStack } from 'native-base'
import FoodCard from '../components/FoodCard'
import { mockFood } from '../mocks/food'

const Random: React.FC = () => {
  return (
    <Box m='5'>
      <VStack space='8'>
        <Text fontSize='4xl' bold>
          กินอะไรดี
        </Text>
        <FoodCard food={mockFood} size='large' isShowCal={false} />
        <Button rounded='full' mx='10' py='4' mt='4'>
          <Text fontSize='xl' color='white'>
            กินอะไรดี ?
          </Text>
        </Button>
      </VStack>
    </Box>
  )
}

export default Random
