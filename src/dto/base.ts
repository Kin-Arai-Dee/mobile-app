export interface ITimeStamp {
  createAt: string
  updateAt: string
}

export interface ListResponse<IData> {
  data: IData[]
}
