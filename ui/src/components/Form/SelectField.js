import { getIn } from 'formik'
import MuiItem from '@material-ui/core/MenuItem'
import MuiTextField from '@material-ui/core/TextField'
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

export const SelectField = ({ options, ...props }) =>
  <MuiTextField select {...fieldToSelect(props)}>
    {options.map(option =>
      <MuiItem key={option.value} value={option.value}>{option.label}</MuiItem>
    )}
  </MuiTextField>

export default SelectField

SelectField.displayName = 'FormikSelect'
SelectField.tabIndex = 0