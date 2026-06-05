import FormControlLabel from '@material-ui/core/FormControlLabel'
import MuiCheckbox from '@material-ui/core/Checkbox'
import React from 'react'

export const CheckboxField = ({ field, form: { isSubmitting }, label, ...props }) =>
  <FormControlLabel
    label={label}
    control={
      <MuiCheckbox
        {...field}
        checked={!!field.value}
        disabled={isSubmitting}
      />
    }
  />
export default CheckboxField

CheckboxField.displayName = 'FormikCheckbox'
CheckboxField.tabIndex = 0