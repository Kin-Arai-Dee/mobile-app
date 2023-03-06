import { MOCK_FOOD_LIST } from '../mocks/foodName'
import { Actionsheet, Button, Input, Text, useDisclose } from 'native-base'
import { useState } from 'react'
import { Alert } from 'react-native'

export interface SelectUserFoodProps {
  onSelect: (id: string) => void
}

export default function SelectUserFood({ onSelect }: SelectUserFoodProps) {
  const [searchValue, setSearchValue] = useState('')

  const { isOpen, onOpen, onClose } = useDisclose()

  const onSelectResult = (id: string, name: string) => {
    Alert.alert('คุณได้เลือกทาน', `\n${name}\n`, [
      {
        text: 'ยกเลิก',
        onPress: () => {},
      },
      {
        text: 'ตกลง',
        onPress: () => onSelect(id),
      },
    ])
  }

  return (
    <>
      <Button
        rounded="full"
        py="4"
        mt="6"
        variant="outline"
        borderColor="primary.600"
        onPress={onOpen}
      >
        <Text fontSize="xl" color="primary.600" fontWeight="500">
          บอกให้เราทราบว่าคุณทานอะไร
        </Text>
      </Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content height={600}>
          <Input
            mx={1}
            mt={1}
            fontSize="lg"
            inlineImageLeft="search_icon"
            value={searchValue}
            placeholder="ค้นหา"
            _focus={{
              borderColor: 'primary.400',
              bg: 'transparent',
            }}
            onChangeText={(value: string) => {
              setSearchValue(value)
            }}
          />
          {MOCK_FOOD_LIST.filter(item =>
            searchValue
              ? item.title.toLowerCase().includes(searchValue.toLowerCase())
              : true
          )
            .slice(0, 50)
            .map(item => {
              return (
                <Actionsheet.Item
                  key={item.foodId}
                  onPress={() => onSelectResult(item.foodId, item.title)}
                >
                  {item.title}
                </Actionsheet.Item>
              )
            })}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}
