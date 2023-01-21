import { ITimeStamp, ListResponse } from './base'
import { IFood } from './food'

export interface IFoodHistory extends ITimeStamp {
  _id: string
  isSuccess: boolean
  foodId: string
  userId: string
  food: IFood
}

export type IFoodHistoryList = ListResponse<IFoodHistory>
