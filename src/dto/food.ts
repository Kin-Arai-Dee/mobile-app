export interface IFood {
  foodID: string
  foodName: string
  foodPic: string
  calories: number
  details?: string
  ingredient1: string
  ingredient2?: string
  cookMethod: string
  averagePrice: number
  restaurant?: string[]
  carbohydrates?: 'rice' | 'noodle' | 'bread'
  isSpicy: boolean
}
