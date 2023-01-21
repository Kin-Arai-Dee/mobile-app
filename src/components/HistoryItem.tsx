import { Ionicons } from '@expo/vector-icons'
import { IFoodHistory } from 'dto/history'
import { Avatar, Box, Stack, Text } from 'native-base'
import React from 'react'

export interface HistoryItemProps {
  historyData: IFoodHistory
}

const HistoryItem = ({ historyData }: HistoryItemProps) => {
  const { food, isSuccess, createAt } = historyData

  const time = createAt.replace('Z', '')

  return (
    <Box
      backgroundColor="white"
      borderRadius="full"
      mb="4"
      mt="8"
      bgColor={isSuccess ? 'success.300' : 'error.300'}
      shadow="7"
    >
      <Stack
        direction="row"
        space="2"
        p="4"
        alignItems="center"
        justifyContent="space-between"
        pr="10"
      >
        <Avatar
          width="110"
          mt="-10"
          height="110"
          source={{ uri: food.imageUrl }}
          shadow="3"
        />
        <Box>
          <Text fontWeight="500" fontSize="xl">
            {food.foodName}
          </Text>
          <Text fontSize="md">{new Date(time).toLocaleString('th-TH')} น.</Text>
        </Box>
        <Ionicons name={isSuccess ? 'md-checkmark' : 'md-close'} size={30} />
      </Stack>
    </Box>
  )
}

export default HistoryItem
