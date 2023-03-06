import React from 'react'
import { Box, Button, Stack, Text, VStack } from 'native-base'
import FoodCard from 'components/FoodCard'
import useGetPredictionState, {
  PredictionState,
} from 'hooks/usePredictionState'
import SingleSelectSearch from 'components/SingleSelectSearch'
// @ts-ignore
import { MOCK_FOOD_LIST } from '../mocks/foodName'
import SelectUserFood from 'components/SelectUserFood'

const Random: React.FC = () => {
  const {
    state,
    predictionFood,
    onSubmitResult,
    onHandleRandom,
    onSumbitUserResult,
    // lastFood,
    // cooldownTime,
  } = useGetPredictionState()

  const ctaElement = () => {
    switch (state) {
      case PredictionState.Init:
        return (
          <Button rounded="full" py="4" mt="6" onPress={onHandleRandom}>
            <Text fontSize="xl" color="white" fontWeight="500">
              กินอะไรดี ?
            </Text>
          </Button>
        )
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
              onPress={onHandleRandom}
            >
              <Text fontSize="xl" color="primary.400" fontWeight="500">
                ลองอีกครั้ง
              </Text>
            </Button>
            <Button
              rounded="full"
              py="4"
              mt="6"
              flex="1"
              onPress={() => onSubmitResult(true)}
            >
              <Text fontSize="xl" color="white" fontWeight="500">
                ทานเลย
              </Text>
            </Button>
          </Stack>
        )
      case PredictionState.NoMoreResult:
        return (
          // <SingleSelectSearch
          //   data={MOCK_FOOD_LIST}
          //   onSelect={onSumbitUserResult}
          // />
          <SelectUserFood onSelect={onSumbitUserResult} />
        )
      case PredictionState.End:
        // return <CoolDownButton cooldownTime={cooldownTime} />
        return (
          <Button
            rounded="full"
            py="4"
            mt="6"
            onPress={onHandleRandom}
            variant="outline"
            borderColor="primary.600"
          >
            <Text fontSize="xl" color="primary.600" fontWeight="500">
              สุ่มอีกครั้ง
            </Text>
          </Button>
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
        <FoodCard
          food={
            // state === PredictionState.End
            //   ? lastFood || predictionFood:
            predictionFood
          }
          size="large"
          isShowCal={false}
          isLoading={state === PredictionState.Loading}
          popUp={true}
        />
        {ctaElement()}
      </VStack>
    </Box>
  )
}

export default Random
