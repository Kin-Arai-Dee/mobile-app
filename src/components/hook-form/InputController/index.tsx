import { Box, FormControl, IInputProps, Input } from 'native-base'
import React from 'react'
import { FC } from 'react'
import { Controller, useFormContext, ControllerProps } from 'react-hook-form'

const NUMBER_PAD_TYPE = ['number-pad', 'decimal-pad']

export interface InputControllerProps
  extends Omit<IInputProps, 'value' | 'onChangeText' | 'onBlur'> {
  name: string
  label?: string
  rules?: ControllerProps['rules']
}

const InputController: FC<InputControllerProps> = ({
  name,
  label,
  rules,
  autoCapitalize,
  keyboardType,
  ...props
}) => {
  const { control, formState } = useFormContext()

  const error = formState.errors[name]

  return (
    <FormControl isRequired={!!rules?.required} isInvalid={!!error}>
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
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            onBlur={onBlur}
            autoCapitalize={autoCapitalize || 'none'}
            value={value ? `${value}` : ''}
            keyboardType={keyboardType}
            onChangeText={value => {
              if (keyboardType && NUMBER_PAD_TYPE.includes(keyboardType)) {
                onChange(+value)
              } else {
                onChange(value)
              }
            }}
            _focus={{
              borderColor: 'primary.400',
              bg: 'transparent',
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

export default InputController
