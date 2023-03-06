import { IFoodList } from 'dto/food'
import APIClient from 'cores/APIClient'
import { RequestMethod } from 'cores/BaseAPIClient'
import { IBodyPredictionResult } from 'dto/prediction'

class PredictionService {
  static client = new APIClient({
    pathPrefix: '/prediction',
  })

  static predictionFood(force = false) {
    return this.client.fetch<IFoodList>({
      path: '/food',
      method: RequestMethod.Get,
      params: {
        force,
      },
    })
  }

  static submitPredictionResult(foodId: string, body: IBodyPredictionResult) {
    return this.client.fetch({
      path: `/submit/${foodId}`,
      method: RequestMethod.Post,
      body: body,
    })
  }
}

export default PredictionService
