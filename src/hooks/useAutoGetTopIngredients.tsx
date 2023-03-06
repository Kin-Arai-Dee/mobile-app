import { useEffect } from 'react'
import { useState } from 'react'
import FoodService from 'services/FoodService'
import { ITopIngredient } from 'dto/food'

const useAutoGetTopIngredients = () => {
  const [topIngredient, setTopIngredient] = useState<ITopIngredient>(
    {} as ITopIngredient
  )

  const fetchTopIngredient = async () => {
    try {
      const topIngredient = await FoodService.getTopIngredients()

      setTopIngredient(topIngredient)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchTopIngredient()
  }, [])

  return topIngredient
}

export default useAutoGetTopIngredients
