import { IFood } from 'dto/food'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { Image } from 'react-native'
import PredictionService from 'services/PredictionService'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import AsyncStorage from '@react-native-async-storage/async-storage'

export enum PredictionState {
  Init = 'init',
  Loading = 'loading',
  Random = 'random',
  NoMoreResult = 'no-more-result',
  End = 'end',
}

type RamdonNavigationProp = StackNavigationProp<RootStackParamList, 'Random'>

export default function useGetPredictionState() {
  const [state, setState] = useState<PredictionState>(PredictionState.Init)
  // const { remainingTime, isOnCooldown, setCooldown, lastFood } =
  //   useCountdownTimer('foodCooldown')
  const { replace } = useNavigation<RamdonNavigationProp>()

  const [predictionFoods, setPredictionFoods] = useState<IFood[]>([])
  const [index, setIndex] = useState(0)

  const onSubmitResult = async (
    impress: boolean,
    end = true,
    predict = true
  ) => {
    if (end) {
      setState(PredictionState.End)
      await PredictionService.submitPredictionResult(
        predictionFoods[index].foodId,
        {
          impress,
          predict,
        }
      )

      // setCooldown(predictionFoods[index])
    } else {
      setState(PredictionState.Loading)
      await PredictionService.submitPredictionResult(
        predictionFoods[index].foodId,
        {
          impress,
          predict,
        }
      )
    }
  }

  const onSumbitUserResult = async (foodId: string) => {
    setState(PredictionState.End)
    await PredictionService.submitPredictionResult(foodId, {
      impress: true,
      predict: false,
    })
  }

  const onHandleRandom = async () => {
    switch (state) {
      case PredictionState.Init:
        setState(PredictionState.Loading)
        try {
          const force = await AsyncStorage.getItem('alreadySelect')

          const predictionResult = await PredictionService.predictionFood(
            force === '1'
          )

          await AsyncStorage.removeItem('alreadySelect')

          setPredictionFoods(predictionResult.data)
          setState(PredictionState.Random)
        } catch {
          replace('FoodSelector')
        }
        return
      case PredictionState.Random:
        if (predictionFoods.length - 1 > index) {
          await onSubmitResult(false, false)
          setIndex(index => index + 1)
        } else {
          setState(PredictionState.NoMoreResult)
        }
        return
      case PredictionState.NoMoreResult:
        if (predictionFoods.length - 1 > index) {
          await onSubmitResult(false, false)
          setIndex(index => index + 1)
        } else {
          setState(PredictionState.NoMoreResult)
        }
        return
      case PredictionState.End:
        setState(PredictionState.Init)
        setIndex(0)
        setPredictionFoods([])
        return
      default:
        return
    }
  }

  const onPreloadingImage = async (url: string) => {
    await Image.prefetch(url)
    setState(PredictionState.Random)
  }

  useEffect(() => {
    if (!isEmpty(predictionFoods)) {
      onPreloadingImage(predictionFoods[index].imageUrl)
    }
  }, [index])

  // useEffect(() => {
  //   if (isOnCooldown) {
  //     setState(PredictionState.End)
  //   } else {
  //     setState(PredictionState.Init)
  //   }
  // }, [isOnCooldown])

  return {
    state,
    predictionFood: predictionFoods?.[index],
    onSubmitResult,
    onHandleRandom,
    onSumbitUserResult,
    // cooldownTime: remainingTime || 0,
    // lastFood,
  }
}
