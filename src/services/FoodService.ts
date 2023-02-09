import { IFoodNameList, IFoodList } from 'dto/food'
import APIClient from 'cores/APIClient'
import { RequestMethod } from 'cores/BaseAPIClient'

class FoodService {
  static client = new APIClient({
    pathPrefix: '/food',
  })

  static async getAllFoodName() {
    return this.client.fetch<IFoodNameList>({
      path: '/food-list',
      method: RequestMethod.Get,
    })
  }

  static async getRamdomUnvotedFood(size?: number) {
    return this.client.fetch<IFoodNameList>({
      path: '/unvoted-food-list',
      method: RequestMethod.Get,
      params: {
        size,
      },
    })
  }

  static async getUserFavoriteFood() {
    return this.client.fetch<IFoodList>({
      path: '/favorite-food',
      method: RequestMethod.Get,
    })
  }

  static async getTopFood() {
    return this.client.fetch<IFoodList>({
      path: '/top-food',
      method: RequestMethod.Get,
    })
  }

  static async neverShowFood(foodId: string) {
    return this.client.fetch({
      path: `/never-show/${foodId}`,
      method: RequestMethod.Patch,
    })
  }

  static async updateInteract(foodId: string, interact: number) {
    return this.client.fetch<IFoodNameList>({
      path: `/interact/${foodId}`,
      method: RequestMethod.Patch,
      params: {
        interact,
      },
    })
  }
}

export default FoodService
