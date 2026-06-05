import Button from '@material-ui/core/Button'
import CheckboxField from '../Form/CheckboxField'
import DateField from '../Form/DateField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import { MeasurementUnits } from '../../constants/units'
import NumberField from '../Form/NumberField'
import React from 'react'
import SelectField from '../Form/SelectField'
import TextField from '../Form/TextField'
import { Field, Form, Formik } from 'formik'

class InventoryFormModal extends React.Component {
  render() {
    const {
      formName,
      handleDialog,
      handleInventory,
      title,
      initialValues,
      products
    } = this.props
    return (
      <Dialog
        open={this.props.isDialogOpen}
        maxWidth='sm'
        fullWidth={true}
        onClose={() => { handleDialog(false) }}
      >
        <Formik
          initialValues={initialValues}
          validate = {values => {
            const errors = {}
            // Make 'name', 'productType', 'unitOfMeasurement' required
            if (!values.name) {
              errors.name = 'Name is required'
            }
            if (!values.productType) {
              errors.productType = 'Product Type is required'
            }
            if (!values.unitOfMeasurement) {
              errors.unitOfMeasurement = 'Unit of Measurement is required'
            }
            return errors
          }}
          onSubmit={ values => {
            const payload = {
              ...values,
              bestBeforeDate: values.bestBeforeDate ? new Date(values.bestBeforeDate + 'T12:00:00Z').toISOString() : null,
              measurementUnit: values.unitOfMeasurement !== null ? values.unitOfMeasurement : null,
            }
            handleInventory(payload)
            handleDialog(true)
          }}>
          {helpers =>
            <Form
              noValidate
              autoComplete='off'
              id={formName}
            >
              <DialogTitle id='alert-dialog-title'>
                {`${title} Inventory`}
              </DialogTitle>
              <DialogContent>
                <Grid container>
                  <Grid item xs={12} sm={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='name'
                      label='Name'
                      component={TextField}
                    />
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='productType'
                      label='Product Type'
                      component={SelectField}
                      options={products.map(product => ({ value: product.name, label: product.name }))}
                    />
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='description'
                      label='Description'
                      component={TextField}
                    />
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='averagePrice'
                      label='Average Price'
                      component={NumberField}
                    />
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='amount'
                      label='Amount'
                      component={NumberField}
                    />
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='unitOfMeasurement'
                      label='Unit of Measurement'
                      component={SelectField}
                      options={Object.entries(MeasurementUnits).map(
                        ([key, value]) =>
                          ({ value: key, label: value.name })
                      )}
                    />
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='bestBeforeDate'
                      label='Best Before Date'
                      component={DateField}
                    />
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='neverExpires'
                      label='Never Expires'
                      component={CheckboxField}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => { handleDialog(false) }} color='secondary'>Cancel</Button>
                <Button
                  disableElevation
                  variant='contained'
                  type='submit'
                  form={formName}
                  color='secondary'
                  disabled={!helpers.dirty}>
                  Save
                </Button>
              </DialogActions>
            </Form>
          }
        </Formik>
      </Dialog>
    )
  }
}

export default InventoryFormModal
