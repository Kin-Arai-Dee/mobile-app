import { IFood } from 'dto/food'
import { useEffect } from 'react'
import { useState } from 'react'
import FoodService from 'services/FoodService'

const useAutoGetTopFood = () => {
  const [topFoods, setTopFoods] = useState<IFood[]>([])
  const [topUserFoods, setTopUserFoods] = useState<IFood[]>([])
  const [deepFriedTopFood, setDeepFriedTopFood] = useState<IFood[]>([])
  const [friedTopFood, setFriedTopFood] = useState<IFood[]>([])
  const [loading, setLoading] = useState(false)

  const fetchTopFood = async () => {
    try {
      const foodList = await FoodService.getTopFood()

      setTopFoods(foodList.data)
    } catch (e) {
      console.log(e)
    }
  }

  const fetchTopUserFood = async () => {
    try {
      const foodList = await FoodService.getTopUserFood()

      setTopUserFoods(foodList.data)
    } catch (e) {
      console.log(e)
    }
  }

  const fetchDeepFriedTopFood = async () => {
    try {
      const foodList = await FoodService.getTopFoodByTag(
        '63fb38638de7bcc026697f39'
      )

      setDeepFriedTopFood(foodList.data)
    } catch (e) {
      console.log(e)
    }
  }

  const fetchFriedTopFood = async () => {
    try {
      const foodList = await FoodService.getTopFoodByTag(
        '63fb38638de7bcc026697f37'
      )

      setFriedTopFood(foodList.data)
    } catch (e) {
      console.log(e)
    }
  }

  const fetchAll = async () => {
    const pro = []
    setLoading(true)
    pro.push(fetchTopFood())
    pro.push(fetchTopUserFood())
    pro.push(fetchDeepFriedTopFood())
    pro.push(fetchFriedTopFood())

    await Promise.all(pro)

    setLoading(false)
  }

  useEffect(() => {
    fetchAll()
  }, [])

  return { topFoods, topUserFoods, deepFriedTopFood, friedTopFood, loading }
}

export default useAutoGetTopFood
