import {
  Box,
  CheckIcon,
  FormControl,
  ISelectProps,
  Select,
  useTheme,
} from 'native-base'
import React, { useState } from 'react'
import { FC } from 'react'
import { Controller, useFormContext, ControllerProps } from 'react-hook-form'
import BTMultiSelect, { BTMultiSelectProps } from 'components/SelectSearch'
export interface MultiSelectControllerProps
  extends Omit<
    BTMultiSelectProps,
    'selectedValue' | 'onSelection' | 'selectedList'
  > {
  name: string
  label?: string
  rules?: ControllerProps['rules']
}

const MultiSelectController: FC<MultiSelectControllerProps> = ({
  name,
  label,
  rules,
  ...props
}) => {
  const { control, formState } = useFormContext()
  const { colors } = useTheme()

  const error = formState.errors[name]

  return (
    <FormControl isRequired isInvalid={!!error}>
      {label && (
        <FormControl.Label
          _text={{
            bold: true,
          }}
        >
          {label}
        </FormControl.Label>
      )}
      <Controller
        name={name}
        defaultValue=""
        control={control}
        rules={rules}
        render={({ field: { value, onChange } }) => (
          <BTMultiSelect
            pillStyle={{ backgroundColor: colors.primary['300'] }}
            selectedList={value}
            onSelection={({ selectedList: selected }) => {
              onChange(selected)
            }}
            {...props}
          />
        )}
      />
      <Box height={6}>
        <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
      </Box>
    </FormControl>
  )
}

export default MultiSelectController
