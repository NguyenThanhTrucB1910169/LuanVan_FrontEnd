import React from "react";
import { Fragment } from "react";
import "./orderPayment.css";
import StepLayout from "./stepLayout";
import CardForm from "./paymentForm";
// import { Stripe } from "@stripe/stripe-js";
import CartReview from "../cart/cartReview";
// import React, { Component } from 'react';
// import Stripe from "stripe";
// import { Elements } from "@stripe/react-stripe-js";
// import { CardElement } from "@stripe/react-stripe-js";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
  Elements,
  injectStripe,
  StripeProvider
} from "@stripe/react-stripe-js";
// import {injectStripe} from 'react-stripe-elements';
import { loadStripe, } from '@stripe/stripe-js';
const stripe = loadStripe(
  "pk_test_51MWNRIDCE9QNRtxGVMQMl7RnfahEMvcytYHA9tGUUkAMshWYiQoasXdzYxz8DM4QbkUVGe86PnkAqZJGGnfqsKTs00WpdF3MUF"
);
class OrderPayment extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Elements stripe={stripe}>
        <CardForm />
      </Elements>
    )
  }
}

export default OrderPayment;