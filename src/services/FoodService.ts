import { IFoodList, ITopIngredient, IIngredientDB } from 'dto/food'
import APIClient from 'cores/APIClient'
import { RequestMethod } from 'cores/BaseAPIClient'

class FoodService {
  static client = new APIClient({
    pathPrefix: '/food',
  })

  static async getAllIngredients() {
    return this.client.fetch<IIngredientDB>({
      path: '/ingredients',
      method: RequestMethod.Get,
    })
  }

  static async getTopIngredients() {
    return this.client.fetch<ITopIngredient>({
      path: '/top-ingredients',
      method: RequestMethod.Get,
    })
  }

  static async getTopFoodByTag(tagId: string) {
    return this.client.fetch<IFoodList>({
      path: `/top-food/${tagId}`,
      method: RequestMethod.Get,
    })
  }
  static async getTopUserFood() {
    return this.client.fetch<IFoodList>({
      path: '/top-user-food',
      method: RequestMethod.Get,
    })
  }

  static async getAllFoodName() {
    return this.client.fetch<IFoodList>({
      path: '/food-list',
      method: RequestMethod.Get,
    })
  }

  static async getRamdomUnvotedFood(size?: number) {
    return this.client.fetch<IFoodList>({
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

  static async updateInteract(
    foodId: string,
    interact: number,
    clusterId: number
  ) {
    return this.client.fetch<IFoodList>({
      path: `/interact/${foodId}`,
      method: RequestMethod.Patch,
      params: {
        interact,
        clusterId,
      },
    })
  }
}

export default FoodService
