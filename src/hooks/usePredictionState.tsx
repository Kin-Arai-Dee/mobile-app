import { IFood } from 'dto/food'
import { useState } from 'react'
import PredictionService from 'services/PredictionService'

export enum PredictionState {
  Init = 'init',
  Loading = 'loading',
  Random = 'random',
  NoMoreResult = 'no-more-result',
  End = 'end',
}

export default function useGetPredictionState() {
  const [state, setState] = useState<PredictionState>(PredictionState.Init)

  const [predictionFoods, setPredictionFoods] = useState<IFood[]>([])
  const [index, setIndex] = useState(0)

  const onSubmitResult = async (impress: boolean, end = true) => {
    await PredictionService.submitPredictionResult(
      predictionFoods[index].foodId,
      {
        impress,
      }
    )
    if (end) {
      setState(PredictionState.End)
    }
  }

  const onHandleRandom = async () => {
    switch (state) {
      case PredictionState.Init:
        setState(PredictionState.Loading)
        const predictionResult = await PredictionService.predictionFood()
        setPredictionFoods(predictionResult.data)
        setState(PredictionState.Random)
        return
      case PredictionState.Random:
        await onSubmitResult(false, false)
        if (predictionFoods.length - 1 > index) {
          setIndex(index => index + 1)
        } else {
          setState(PredictionState.NoMoreResult)
        }
        return
      default:
        return
    }
  }

  return {
    state,
    predictionFood: predictionFoods?.[index],
    onSubmitResult,
    onHandleRandom,
  }
}
