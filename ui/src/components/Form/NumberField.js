import { getIn } from 'formik'
import MuiNumber from '@material-ui/core/Input'
import React from 'react'

const fieldToNumberField = ({
  backgroundColor,
  custom,
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form: { errors, isSubmitting, touched },
  helperText,
  onBlur,
  variant,
  warning,
  ...props
}) => {
  const dirty = getIn(touched, field.name)
  const fieldError = getIn(errors, field.name)
  const showError = dirty && !!fieldError
  return {
    variant: variant,
    error: showError,
    helperText: showError ? fieldError : warning ?? helperText,
    disabled: disabled ?? isSubmitting,
    onBlur: (event) => onBlur ?? fieldOnBlur(event ?? field.name),
    ...custom,
    ...field,
    ...props,
  }
}

export const NumberField = ({ children, ...props }) =>
  <MuiNumber {...fieldToNumberField(props)}>
    {children}
  </MuiNumber>

export default NumberField

NumberField.displayName = 'FormikNumberField'
NumberField.tabIndex = 0