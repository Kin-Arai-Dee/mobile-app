import FoodTinderCard from 'components/FoodTinderCard'
import React, { FC } from 'react'
import { Box, Text } from 'native-base'
const FoodHome: FC = () => {
  return (
    <FoodTinderCard
      height={550}
      title={
        <Text fontWeight="500" fontSize="4xl">
          ปัดอาหารที่คุณชอบ
        </Text>
      }
      limit={50}
    />
  )
}

export default FoodHome
