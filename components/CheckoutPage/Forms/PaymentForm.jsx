import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import styled from 'styled-components';
import { InputField, DatePickerField } from '../../FormFields';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const SickButton = styled.button`
  background: red;
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 2rem;
  padding: 0.8rem 1.5rem;
  transform: skew(-2deg);
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    // 1. Stop the form from submitting and turn the loader one
    e.stopPropagation();
    setLoading(true);
    console.log('We gotta do some work..');
    // 2. Start the page transition
    // nProgress.start();
    // 3. Create the payment method via stripe (Token comes back here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    // 4. Handle any errors from stripe
    if (error) {
      setError(error);
      // nProgress.done();
      return; // stops the checkout from happening
    }
    // 5. Send the token from step 3 to our keystone server, via a custom mutation!
    // const order = await checkout({
    //   variables: {
    //     token: paymentMethod.id,
    //   },
    // });
    // console.log(`Finished with the order!!`);
    // console.log(order);
    // 6. Change the page to view the order
    // router.push({
    //   pathname: `/order/[id]`,
    //   query: {
    //     id: order.data.checkout.id,
    //   },
    // });
    // 7. Close the cart
    // closeCart();

    // 8. turn the loader off
    setLoading(false);
    // nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {/* {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>} */}
      <CardElement />
      <button type="submit">Check Out Now</button>
    </CheckoutFormStyles>
  );
}

export default function PaymentForm(props) {
  const {
    formField: { nameOnCard, cardNumber, expiryDate, cvv },
  } = props;

  return (
    <>
      <Elements stripe={stripeLib}>
        <CheckoutForm />
      </Elements>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InputField
            name={nameOnCard.name}
            label={nameOnCard.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={cardNumber.name}
            label={cardNumber.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePickerField
            name={expiryDate.name}
            label={expiryDate.label}
            format="MM/yy"
            views={['year', 'month']}
            minDate={new Date()}
            maxDate={new Date('2050/12/31')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField name={cvv.name} label={cvv.label} fullWidth />
        </Grid>
      </Grid>
    </>
  );
}