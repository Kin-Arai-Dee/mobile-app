import { ITimeStamp, ListResponse } from './base'

export interface IBaseTag {
  externalId: string
  primaryName: string
}

export interface ITag {
  _id: string
  externalId: string
  primaryName: string
}

export interface IIngredient {
  ingredientName: string
  amount: number
  unit: string
}

export interface IIngredientDB {
  _id: string
  ingredientName: string
}
export interface IIngredientCount extends IIngredientDB {
  count: number
}

export interface ITopIngredient {
  protein: IIngredientCount[]
  carbo: IIngredientCount[]
  mineral: IIngredientCount[]
  vitamit: IIngredientCount[]
  other: IIngredientCount[]
}

export interface IFood extends ITimeStamp {
  foodId: string
  title: string
  imageUrl: string
  url: string
  allTimeScore: number
  view: number
  totalLike: number
  ingredients: IIngredient[]
  methods: IBaseTag[]
  ingredientTags: IBaseTag[]
  categories: IBaseTag[]
  calories: number
  isSpicy: number
  isHealthy: boolean
  clusterId: number
}

export type IFoodList = ListResponse<IFood>
