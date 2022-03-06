import { FormHandles } from '@unform/core'
import { ObjectSchema, ValidationError } from 'yup'

export async function validateFormData(schema: ObjectSchema<any>, data: any, formRef?: FormHandles): Promise<any> {
  try {
    if (formRef) formRef.setErrors({})
    await schema.validate(data, { abortEarly: false })
    return null
  } catch (error) {
    if (error instanceof ValidationError) {
      const validationErrors = {}
      error.inner.forEach(error => (validationErrors[error.path] = error.message))
      if (formRef) {
        formRef.setErrors(validationErrors)
      }

      return validationErrors
    }
    return null
  }
}
