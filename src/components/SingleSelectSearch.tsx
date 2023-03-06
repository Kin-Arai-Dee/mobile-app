import React, { useState } from 'react'
import { FormControl, Input, KeyboardAvoidingView, Select } from 'native-base'
import { Platform } from 'react-native'

export interface SingleSelectSearchProps {
  data: {
    foodId: string
    title: string
  }[]
  onSelect: (value: string) => void
}

const SingleSelectSearch = ({ data, onSelect }: SingleSelectSearchProps) => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Select
      variant="outline"
      minWidth="200"
      mt={1}
      onValueChange={onSelect}
      _actionSheetBody={{
        height: 600,
        ListHeaderComponent: (
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
        ),
      }}
    >
      <Input
        placeholder="Search"
        variant="filled"
        width="100%"
        h="6%"
        borderRadius="10"
        py="1"
        px="2"
        borderWidth="0"
      />
      {data &&
        data
          .filter(item =>
            searchValue
              ? item.title.toLowerCase().includes(searchValue.toLowerCase())
              : true
          )
          .slice(0, 50)
          .map(item => {
            return <Select.Item label={item.title} value={item.foodId} />
          })}
    </Select>
  )
}

export default SingleSelectSearch
