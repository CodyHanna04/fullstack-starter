import { getIn } from 'formik'
import MuiSelect from '@material-ui/core/Select'
import React from 'react'

const fieldToSelect = ({
  backgroundColor,
  custom,
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form: { errors, isSubmitting, touched },
  helperText,
  onBlur,
  variant,
  warning,
  options,
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

export const SelectField = ({ children, ...props }) =>
  <MuiSelect {...fieldToSelect(props)}>
    {children}
  </MuiSelect>

export default SelectField

SelectField.displayName = 'FormikSelect'
SelectField.tabIndex = 0