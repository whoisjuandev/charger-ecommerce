import React from 'react'
import { useParams } from 'react-router-dom'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  credit: {
      margin: 8,
      padding: 8,
      color: '#fafafa',
      backgroundColor: '#e0e0e0',
      borderRadius: 8,
      width: '100%'
  },
  buttonSubmit: {
    margin: 8
  }
})

export default function CardForm  ({doPayment})  {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const { orderId } = useParams();
  const message = 'Your payment was succesfull, check your email to confirm your purchase'

  // const element = elements.create('card', {
  //   style: {
  //     base: {
  //       iconColor: '#c4f0ff',
  //       color: '#fff',
  //       fontWeight: 500,
  //       fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
  //       fontSize: '16px',
  //       fontSmoothing: 'antialiased',
  //       ':-webkit-autofill': {
  //         color: '#fce883',
  //       },
  //       '::placeholder': {
  //         color: '#87BBFD',
  //       },
  //     },
  //     invalid: {
  //       iconColor: '#FFC7EE',
  //       color: '#FFC7EE',
  //     },
  //   },
  // });

  const handleSubmit = async (event) => {
    
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      doPayment(paymentMethod, orderId, message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className={classes.credit}/>
      <Button variant="contained" type="submit" color="secondary" disabled={!stripe} className={classes.buttonSubmit}>
          Purchase
      </Button>
    </form>
  );
};