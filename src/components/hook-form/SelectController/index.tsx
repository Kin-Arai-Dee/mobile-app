import { Box, CheckIcon, FormControl, ISelectProps, Select } from 'native-base'
import React from 'react'
import { FC } from 'react'
import { Controller, useFormContext, ControllerProps } from 'react-hook-form'

export interface SelectControllerProps
  extends Omit<
    ISelectProps,
    'selectedValue' | 'onValueChange' | 'accessibilityLabel'
  > {
  name: string
  selectItems: {
    label: string
    value: any
  }[]
  label?: string
  rules?: ControllerProps['rules']
}

const SelectController: FC<SelectControllerProps> = ({
  name,
  label,
  rules,
  width = '100%',
  selectItems,
  ...props
}) => {
  const { control, formState } = useFormContext()

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
          <Select
            width={width}
            accessibilityLabel={label}
            selectedValue={value}
            onValueChange={value => onChange(value)}
            _selectedItem={{
              bg: 'primary.100',
              borderColor: 'primary.400',
              endIcon: <CheckIcon size="5" />,
            }}
            {...props}
          >
            {selectItems.map(selectItem => (
              <Select.Item value={selectItem.value} label={selectItem.label} />
            ))}
          </Select>
        )}
      />
      <Box height={6}>
        <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
      </Box>
    </FormControl>
  )
}

export default SelectController
