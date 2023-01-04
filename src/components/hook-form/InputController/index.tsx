import { Box, FormControl, IInputProps, Input } from 'native-base'
import React from 'react'
import { FC } from 'react'
import { Controller, useFormContext, ControllerProps } from 'react-hook-form'

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
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            onBlur={onBlur}
            autoCapitalize={autoCapitalize || 'none'}
            value={value}
            onChangeText={value => onChange(value)}
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
