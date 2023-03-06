/* eslint-disable react-native/no-inline-styles */
import React, { memo, useState, useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  Platform,
  ViewStyle,
  TextStyle,
} from 'react-native'
import {
  Actionsheet,
  Text,
  useDisclose,
  ScrollView,
  KeyboardAvoidingView,
  Input,
} from 'native-base'
import { CHECK, UNCHECK } from 'images'

export interface BTMultiSelectProps {
  list: Record<string, any>[]
  labelField: string
  valueField: string
  onSelection: (item: { value: any[]; selectedList: any[] }) => void
  selectedList: Record<string, any>[]
  placeholder: string
  selectInputStyle?: {
    paddingHorizontal?: number
    paddingVertical?: number
    backgroundColor?: ViewStyle['backgroundColor']
    borderRadius?: number
  }
  pillStyle?: {
    backgroundColor?: ViewStyle['backgroundColor']
    textColor?: TextStyle['color']
    fontSize?: TextStyle['fontSize']
    fontWeight?: TextStyle['fontWeight']
    borderRadius?: number
  }
  placeHolderStyle?: {
    textColor?: TextStyle['color']
    fontSize?: TextStyle['fontSize']
    fontWeight?: TextStyle['fontWeight']
  }
  labelStyle?: {
    textColor?: TextStyle['color']
    fontSize?: TextStyle['fontSize']
    fontWeight?: TextStyle['fontWeight']
  }
  errorStyle?: {
    textColor?: TextStyle['color']
    fontSize?: TextStyle['fontSize']
    fontWeight?: TextStyle['fontWeight']
  }
  selectedIconStyle?: {
    color?: TextStyle['color']
    size?: number
  }
  errorText?: string
  listTextStyle?: TextStyle
  actionSheetBackgroundColor?: ViewStyle['backgroundColor']
  searchStyle?: {
    backgroundColor?: ViewStyle['backgroundColor']
    textColor?: TextStyle['color']
    borderRadius?: number
    borderColor: ViewStyle['borderColor']
  }
}

const BTMultiSelect = ({
  list,
  labelField,
  valueField,
  onSelection,
  selectedList,
  placeholder,
  pillStyle,
  placeHolderStyle,
  labelStyle,
  selectInputStyle,
  errorText = '',
  errorStyle,
  listTextStyle,
  actionSheetBackgroundColor,
}: BTMultiSelectProps) => {
  const [arrayList, setArrayList] = useState([...list])

  const [arrayHolder, setArrayHolder] = useState([...list])
  const { isOpen, onOpen, onClose } = useDisclose()
  const [selectedValues, setSelectedValues] = useState([...selectedList]) // selected values
  const [search, setSearch] = useState('')

  useEffect(() => {
    setArrayList([...list])
    setSelectedValues([...selectedList])
  }, [list, selectedList])

  const _onClose = () => {
    const value = [...selectedValues].map(select => select[valueField])

    onSelection({ value, selectedList: selectedValues })
    // selectInputRef.current.blur();
    setSearch('')
    onClose()
  }

  const _onFocus = () => {
    setArrayList([...list])
    setArrayHolder([...list])
    setSelectedValues([...selectedList])
    onOpen()
  }
  const _onClick = (item: any) => {
    const selectedData = [...selectedValues]
    const selectedDataValue = selectedData.map(
      selectedValue => selectedValue[valueField]
    )

    const indexSelected = selectedDataValue.indexOf(item[valueField])
    if (indexSelected > -1) {
      selectedData.splice(indexSelected, 1)
    } else {
      selectedData.push(item)
    }
    setSelectedValues(selectedData)
  }
  const _exists = (item: any) => {
    const existingData = [...selectedValues].map(
      selectedValue => selectedValue[valueField]
    )

    return existingData.indexOf(item[valueField]) > -1 ? true : false
  }

  const _filterFunction = (text: string) => {
    setSearch(text)
    const newData = arrayHolder.filter(item =>
      item[labelField].toLowerCase().includes(text.toLowerCase())
    )
    setArrayList(newData)
  }

  return (
    <View style={{ marginTop: 20, width: '100%' }}>
      <TouchableOpacity onPress={() => _onFocus()}>
        <View
          style={{
            flexDirection: 'row',
            flexGrow: 1,
            paddingHorizontal: selectInputStyle?.paddingHorizontal || 14,
            paddingVertical: selectInputStyle?.paddingVertical || 12,
            backgroundColor: selectInputStyle?.backgroundColor || '#e5e5e5',
            borderRadius: selectInputStyle?.borderRadius || 6,
            flexWrap: 'wrap',
            minHeight: 45,
            height: 'auto',
          }}
        >
          {selectedList.length === 0 ? (
            <Text
              style={{
                color: placeHolderStyle?.textColor || 'gray',
                fontSize: placeHolderStyle?.fontSize || 12,
                fontWeight: placeHolderStyle?.fontWeight || '400',
              }}
            >
              {placeholder}
            </Text>
          ) : (
            selectedList.map((el: any, index: number) => {
              return (
                <Text
                  key={index}
                  style={{
                    fontSize: pillStyle?.fontSize || 14,
                    backgroundColor: pillStyle?.backgroundColor || 'silver',
                    color: pillStyle?.textColor || '#000',
                    padding: 8,
                    borderRadius: pillStyle?.borderRadius || 16,
                    margin: 3,
                  }}
                >
                  {el[labelField]}
                </Text>
              )
            })
          )}
        </View>
      </TouchableOpacity>
      <Actionsheet isOpen={isOpen} onClose={_onClose} size="full">
        <Actionsheet.Content
          style={{ backgroundColor: actionSheetBackgroundColor || '#f5f5f5' }}
        >
          <KeyboardAvoidingView
            style={{ width: '100%', height: 750 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View>
              <Input
                placeholder="ค้นหา"
                inlineImageLeft="search_icon"
                onChangeText={(text: string) => _filterFunction(text)}
                value={search}
                rounded="full"
                size="md"
                mx={1}
                mt={1}
                _focus={{
                  borderColor: 'gray.400',
                  bg: 'transparent',
                }}
              />
              <ScrollView
                persistentScrollbar={true}
                showsVerticalScrollIndicator={true}
                style={{ width: '100%', marginBottom: 20 }}
              >
                {arrayList.slice(0, 50).map((el, index) => {
                  return (
                    <Actionsheet.Item
                      onPress={() => _onClick(el)}
                      key={index}
                      startIcon={
                        _exists(el) ? (
                          <Image
                            source={CHECK}
                            resizeMode="contain"
                            resizeMethod="auto"
                            style={{
                              width: 24,
                              height: 24,
                              justifyContent: 'center',
                              alignSelf: 'center',
                            }}
                          />
                        ) : (
                          <Image
                            source={UNCHECK}
                            resizeMode="contain"
                            resizeMethod="auto"
                            style={{
                              width: 20,
                              height: 20,
                              justifyContent: 'center',
                              alignSelf: 'center',
                            }}
                          />
                        )
                      }
                    >
                      <Text key={index} style={listTextStyle}>
                        {el[labelField]}
                      </Text>
                    </Actionsheet.Item>
                  )
                })}
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Actionsheet.Content>
      </Actionsheet>
      {errorText.length > 0 ? (
        <Text
          style={{
            marginBottom: 10,
            fontWeight: errorStyle?.fontWeight || '500',
            fontSize: errorStyle?.fontSize || 12,
            color: errorStyle?.textColor || 'red',
          }}
        >
          {errorText}
        </Text>
      ) : (
        <View style={{ margin: 0 }} />
      )}
    </View>
  )
}

export default memo(BTMultiSelect)
