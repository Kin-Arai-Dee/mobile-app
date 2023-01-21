import React from 'react'
import { Box, Button, Stack, Text, VStack } from 'native-base'
import FoodCard from 'components/FoodCard'
import useGetPredictionState, {
  PredictionState,
} from 'hooks/usePredictionState'
import Spinner from 'react-native-loading-spinner-overlay'

const Random: React.FC = () => {
  const { state, predictionFood, onSubmitResult, onHandleRandom } =
    useGetPredictionState()

  const ctaElement = () => {
    switch (state) {
      case PredictionState.Init:
        return (
          <Button rounded="full" py="4" mt="6">
            <Text
              fontSize="xl"
              color="white"
              fontWeight="500"
              onPress={onHandleRandom}
            >
              กินอะไรดี ?
            </Text>
          </Button>
        )
      case PredictionState.Loading:
        return <Spinner visible textContent="loading" />
      case PredictionState.Random:
        return (
          <Stack direction="row" space="4">
            <Button
              rounded="full"
              py="4"
              mt="6"
              variant="outline"
              flex="1"
              bgColor="white"
            >
              <Text
                fontSize="xl"
                color="primary.400"
                fontWeight="500"
                onPress={onHandleRandom}
              >
                สุ่มใหม่
              </Text>
            </Button>
            <Button rounded="full" py="4" mt="6" flex="1">
              <Text
                fontSize="xl"
                color="white"
                fontWeight="500"
                onPress={() => onSubmitResult(true)}
              >
                กินเลย
              </Text>
            </Button>
          </Stack>
        )
      case PredictionState.NoMoreResult:
        return (
          <Stack direction="row" space="4" width="100%">
            <Button
              rounded="full"
              py="4"
              mt="6"
              variant="outline"
              flex="1"
              bgColor="white"
            >
              <Text
                fontSize="xl"
                color="primary.400"
                fontWeight="500"
                onPress={onHandleRandom}
              >
                กินอย่างอื่น
              </Text>
            </Button>
            <Button rounded="full" py="4" mt="6" flex="1">
              <Text
                fontSize="xl"
                color="white"
                fontWeight="500"
                onPress={() => onSubmitResult(true)}
              >
                กินเลย
              </Text>
            </Button>
          </Stack>
        )
      default:
        return null
    }
  }

  return (
    <Box m="5">
      <VStack space="8">
        <Text fontSize="4xl" fontWeight="500">
          กินอะไรดี
        </Text>
        <FoodCard food={predictionFood} size="large" isShowCal={false} />
        {ctaElement()}
      </VStack>
    </Box>
  )
}

export default Random
