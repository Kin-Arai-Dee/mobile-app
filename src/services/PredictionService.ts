import { IFoodList } from 'dto/food'
import APIClient from 'cores/APIClient'
import { RequestMethod } from 'cores/BaseAPIClient'
import { IBodyPredictionResult } from 'dto/prediction'

class PredictionService {
  static client = new APIClient({
    pathPrefix: '/prediction',
  })

  static predictionFood() {
    return this.client.fetch<IFoodList>({
      path: '/food',
      method: RequestMethod.Get,
    })
  }

  static sumitPredictionResult(body: IBodyPredictionResult) {
    return this.client.fetch({
      path: '/food',
      method: RequestMethod.Post,
      body: body,
    })
  }
}

export default PredictionService
