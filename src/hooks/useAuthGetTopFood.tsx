import { IFood } from 'dto/food'
import { useEffect } from 'react'
import { useState } from 'react'
import FoodService from 'services/FoodService'

const useAutoGetTopFood = () => {
  const [topFoods, setTopFoods] = useState<IFood[]>([])
  const [loading, setLoading] = useState(false)

  const fetchTopFood = async () => {
    setLoading(true)
    try {
      const foodList = await FoodService.getTopFood()

      setTopFoods(foodList.data)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTopFood()
  }, [])

  return { topFoods, loading }
}

export default useAutoGetTopFood
