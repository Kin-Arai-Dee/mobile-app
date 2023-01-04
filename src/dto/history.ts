import { ITimeStamp, ListResponse } from './base'

export interface IFoodHistory extends ITimeStamp {
  _id: string
  isSuccess: boolean
  foodId: string
  userId: string
}

export type IFoodHistoryList = ListResponse<IFoodHistory>
