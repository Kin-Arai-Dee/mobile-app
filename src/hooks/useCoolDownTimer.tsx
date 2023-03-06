import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import getCooldownTime from 'utils/getCooldownTime'
import { IFood } from 'dto/food'

const getTimeRemaining = (expirationTime: number): number => {
  return Math.max(0, expirationTime - Date.now())
}

const useCountdownTimer = (key: string) => {
  const [expirationTime, setExpirationTime] = useState<number | null>(null)
  const [remainingTime, setRemainingTime] = useState<number | null>(null)
  const [lastFood, setLastFood] = useState<IFood>()

  useEffect(() => {
    const retrieveExpirationTime = async () => {
      try {
        const value = await AsyncStorage.getItem(key)
        if (value) {
          const jsonValue = JSON.parse(value)
          const expirationTime =
            jsonValue.expired != null ? parseInt(jsonValue.expired) : null
          setExpirationTime(expirationTime)
          setLastFood(jsonValue.food)
        }
      } catch (e) {
        console.log('Error retrieving expiration time', e)
      }
    }

    retrieveExpirationTime()
  }, [key])

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (expirationTime !== null) {
      intervalId = setInterval(() => {
        setRemainingTime(getTimeRemaining(expirationTime))
      }, 1000)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [expirationTime])

  const setCooldown = async (newLastFood: IFood) => {
    const newExpirationTime = getCooldownTime() + Date.now()
    setExpirationTime(newExpirationTime)
    setLastFood(newLastFood)
    const itemKey = {
      expired: newExpirationTime,
      food: newLastFood,
    }
    try {
      await AsyncStorage.setItem(key, JSON.stringify(itemKey))
    } catch (e) {
      console.log('Error storing expiration time', e)
    }
  }

  const isOnCooldown = expirationTime !== null && expirationTime > Date.now()

  return { isOnCooldown, remainingTime, setCooldown, lastFood }
}

export default useCountdownTimer
