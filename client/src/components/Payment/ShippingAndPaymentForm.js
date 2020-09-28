import React from 'react'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Button} from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import CardForm from './DialogStripeCC'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
const stripePromise = loadStripe(
  'pk_test_51HWD2UEtDTWo6noV3gUPNIrAxavzvLeteUfpgbzKVyfmvy69AhCqQ6EBNQYXovnkSrt55NRajtc7FFYfrAkm1fiy00vqjtQjMz'
)
const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(1)
  }
}))

export default function ShippingAndPaymentForm({
  shippingAdress,
  purchaseMethod,
  setPurchaseData,
  setPaymentMethodDos,
  setShippingAdress,
  setPurchaseMethod,
  doPayment,
}) {
  const classes = useStyles()

  const handleChangeSelect = event => {
    setPurchaseMethod(event.target.value)
  }
  const handleChangeShippingAdress = event => {
    setShippingAdress(event.target.value)
  }

  return (
    <>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        /*         onSubmit={(e) => {
          e.preventDefault();
          setPurchaseData(paymentMethod, shippingAdress);
        }} */
      >
        <div>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item={12}>
              <TextField
                required
                label="Address"
                className={classes.textField}
                onChange={handleChangeShippingAdress}
                value={shippingAdress}
                placeholder="Example address 1489"
                helperText="Complete the shipping address"
                fullWidth
                margin="normal"
                color="secondary"
              />
              <FormControl required fullWidth className={classes.formControl}>
                <InputLabel id="demo-simple-select-label" color='secondary'>Payment</InputLabel>
                <Select
                  label="Payment Method"
                  id="demo-simple-select"
                  color='secondary'
                  value={purchaseMethod}
                  onChange={handleChangeSelect}
                >
                  <MenuItem value={'Credit Card'}>Credit Card</MenuItem>
                  <MenuItem value={null}>------------</MenuItem>
                </Select>
                <FormHelperText> Choose a payment method</FormHelperText>
              </FormControl>
              {purchaseMethod === 'Credit Card' ? (
                <Elements stripe={stripePromise}>
                  <CardForm doPayment={doPayment} />
                </Elements>
              ) : null}
            </Grid>
          </Grid>
        </div>
      </form>
    </>
  )
}
