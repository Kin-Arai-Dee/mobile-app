import { useState } from 'react'

export interface FormOption<TFormData> {
  defaultData?: TFormData
  requireField?: (keyof TFormData)[]
}

export type TError<TFormData> = Partial<Record<keyof TFormData, string>>

export default function useForm<TFormData extends Record<string, any>>(
  option: FormOption<TFormData>
) {
  const { defaultData = {}, requireField = [] } = option
  const [formData, setFormData] = useState<TFormData>(defaultData as TFormData)
  const [errors, setErrors] = useState<TError<TFormData>>({})

  const validate = () => {
    let isValid = true

    requireField.forEach(field => {
      if (formData[field] === '') {
        setErrors(errors => ({ ...errors, [field]: `${field} is required` }))
        isValid = false
      } else {
        setErrors(errors => ({ ...errors, [field]: undefined }))
      }
    })

    return isValid
  }

  const setValue = (fieldKey: keyof TFormData, value: any) =>
    setFormData(data => ({ ...data, [fieldKey]: value }))

  const onSubmit = (handleSubmit: (formData: TFormData) => void) => {
    validate() && handleSubmit(formData)
  }

  return { formData, errors, setValue, onSubmit }
}
