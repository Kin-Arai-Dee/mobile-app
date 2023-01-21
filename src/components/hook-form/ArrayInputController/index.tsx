import { Ionicons } from '@expo/vector-icons'
import { useTheme, VStack } from 'native-base'

import {
  Box,
  Button,
  FormControl,
  IInputProps,
  Input,
  Stack,
  View,
} from 'native-base'
import React from 'react'
import { FC } from 'react'
import {
  Controller,
  useFormContext,
  ControllerProps,
  useFieldArray,
} from 'react-hook-form'

export interface InputControllerProps
  extends Omit<IInputProps, 'value' | 'onChangeText' | 'onBlur'> {
  name: string
  label?: string
  rules?: ControllerProps['rules']
}

const ArrayInputController: FC<InputControllerProps> = ({
  name,
  label,
  rules,
  autoCapitalize,
  ...props
}) => {
  const { colors } = useTheme()

  const { control, formState } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  return (
    <FormControl isRequired={!!rules?.required}>
      {label && (
        <FormControl.Label
          _text={{
            bold: true,
          }}
        >
          {label}
        </FormControl.Label>
      )}
      <VStack space="4" mb="4" mt="2">
        {fields.map((field, index) => (
          <Stack direction="row" space="2">
            <Stack flex="1">
              <Controller
                name={`${name}.${index}`}
                defaultValue={field || ''}
                control={control}
                rules={rules}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    onBlur={onBlur}
                    autoCapitalize={autoCapitalize || 'none'}
                    value={value}
                    onChangeText={value => onChange(value)}
                    _focus={{
                      borderColor: 'primary.400',
                      bg: 'transparent',
                    }}
                    {...props}
                  />
                )}
              />
            </Stack>
            <Button onPress={() => remove(index)} variant="outline">
              <Ionicons
                name="trash-outline"
                color={colors.primary[700]}
                size={14}
              />
            </Button>
          </Stack>
        ))}
        <Button
          startIcon={
            <Ionicons
              name="add-circle-outline"
              color={colors.primary[700]}
              size={14}
            />
          }
          onPress={append}
          variant="outline"
        >
          add ban food
        </Button>
      </VStack>
    </FormControl>
  )
}

export default ArrayInputController
