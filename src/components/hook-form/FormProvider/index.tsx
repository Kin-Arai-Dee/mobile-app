import React from 'react'

import { FormProvider, useForm, UseFormProps } from 'react-hook-form'
import { ReactNode, FC } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import { Button, Stack } from 'native-base'
import { GestureResponderEvent } from 'react-native'
import { InterfaceStackProps } from 'native-base/lib/typescript/components/primitives/Stack/Stack'

export interface GenericFormProviderProps extends InterfaceStackProps {
  children: ReactNode
  submitText: string
  onSubmit: (errors: any) => Promise<void>
  formOption?: UseFormProps
  onSubmitWithError?: (data: any) => void
  resetAfterFail?: Record<string, string>
}

const GenericFormProvider: FC<GenericFormProviderProps> = ({
  children,
  submitText,
  onSubmit,
  formOption,
  onSubmitWithError,
  resetAfterFail,
  ...props
}) => {
  const methods = useForm(formOption)

  const { isSubmitting } = methods.formState

  const { reset } = methods

  const handleOnSubmit = (e: GestureResponderEvent) => {
    e.preventDefault()

    methods.handleSubmit(async data => {
      await onSubmit(data)
      resetAfterFail && reset(resetAfterFail)
    })()
  }

  return (
    // @ts-ignore
    <FormProvider {...methods}>
      <Stack justifyContent="space-between" {...props}>
        <Stack>{children}</Stack>
        <Button size="lg" onPress={handleOnSubmit}>
          {submitText}
        </Button>
      </Stack>
      <Spinner visible={isSubmitting} textContent="loading" />
    </FormProvider>
  )
}

export default GenericFormProvider
