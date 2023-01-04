import { ITimeStamp, ListResponse } from './base'
export interface IFood extends ITimeStamp {
  foodId: string
  foodName: string
  imageUrl: string
  ingredient1: string
  ingredient2?: string
  predictionPrice: Number
  calories: Number
  categorie: string
  cookMethod: string
  isSpicy: boolean
}

export interface IFoodName {
  foodId: string
  foodName: string
}

export type IFoodNameList = ListResponse<IFoodName>

export type IFoodList = ListResponse<IFood>
