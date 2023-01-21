import { IFood } from 'dto/food'
import { useEffect } from 'react'
import { useState } from 'react'
import FoodService from 'services/FoodService'

const useAutoGetTopFood = () => {
  const [topFoods, setTopFoods] = useState<IFood[]>([])

  const fetchTopFood = async () => {
    try {
      const foodList = await FoodService.getTopFood()

      setTopFoods(foodList.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchTopFood()
  }, [])

  return topFoods
}

export default useAutoGetTopFood
