import { useAuthContext } from '../contexts/AuthContext'
import { IFoodHistory } from 'dto/history'
import { useEffect } from 'react'
import { useState } from 'react'
import UserService from 'services/UserService'

const useAutoGetHistoryLog = () => {
  const { user } = useAuthContext()

  const [historyLog, setHistoryLog] = useState<IFoodHistory[]>([])

  const fetchHistoryLog = async () => {
    try {
      const historyData = await UserService.getUserHistory(user.userId)

      setHistoryLog(historyData.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchHistoryLog()
  }, [])

  return historyLog
}

export default useAutoGetHistoryLog
