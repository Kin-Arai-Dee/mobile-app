import React from 'react'
import { Box, Text, ScrollView } from 'native-base'
import useAutoGetHistoryLog from 'hooks/useAutoGetHistoryLog'
import HistoryItem from 'components/HistoryItem'

const Target: React.FC = () => {
  const historyLog = useAutoGetHistoryLog()

  return (
    <ScrollView>
      <Box m="5">
        <Text fontWeight="500" fontSize="4xl" fontStyle="normal">
          ประวัติการสุ่มอาหาร
        </Text>
        {historyLog.map(log => (
          <HistoryItem historyData={log} key={log._id} />
        ))}
      </Box>
    </ScrollView>
  )
}

export default Target
