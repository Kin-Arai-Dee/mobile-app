import React, { FormEvent } from 'react'

import { FormProvider, useForm, UseFormProps } from 'react-hook-form'
import { ReactNode, FC } from 'react'
import Spinner from 'react-native-loading-spinner-overlay/lib'
import { Button, Stack } from 'native-base'
import { GestureResponderEvent } from 'react-native'
import { InterfaceStackProps } from 'native-base/lib/typescript/components/primitives/Stack/Stack'

export interface GenericFormProviderProps extends InterfaceStackProps {
  children: ReactNode
  submitText: string
  onSubmit: (errors: any) => void
  formOption?: UseFormProps
  onSubmitWithError?: (data: any) => void
}

const GenericFormProvider: FC<GenericFormProviderProps> = ({
  children,
  submitText,
  onSubmit,
  formOption,
  onSubmitWithError,
  ...props
}) => {
  const methods = useForm(formOption)

  const { isSubmitting } = methods.formState

  const handleOnSubmit = (e: GestureResponderEvent) => {
    e.preventDefault()

    methods.handleSubmit(onSubmit, onSubmitWithError)()
  }

  return (
    // @ts-ignore
    <FormProvider {...methods}>
      <Stack justifyContent="space-between" height="100%" {...props}>
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
