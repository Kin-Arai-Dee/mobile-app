import { IFoodName } from 'dto/food'
import { useEffect, useState } from 'react'
import FoodService from 'services/FoodService'

export const useAutoRandomUnvotedFood = (limit: number) => {
  const [foods, setFoods] = useState<IFoodName[]>([])
  const [loading, setLoading] = useState(false)

  const getRamdomUnvotedFood = async () => {
    setLoading(true)

    const foodData = await FoodService.getRamdomUnvotedFood(limit)

    setFoods(foodData.data)

    setLoading(false)
  }

  useEffect(() => {
    getRamdomUnvotedFood()
  }, [])

  return {
    foods,
    loading,
    refetch: getRamdomUnvotedFood,
  }
}
