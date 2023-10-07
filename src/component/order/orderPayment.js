import React, { Fragment, useRef } from "react";
import PaymentForm from "./paymentForm";
import { loadStripe } from "@stripe/stripe-js";
import StepLayout from "./stepLayout";
import { Elements } from "@stripe/react-stripe-js";
import "./orderPayment.css";

const OrderPayment = ({ handleNext, payment }) => {
  const stripePromise = loadStripe(process.env.REACT_APP_CLIENT_KEY); // Thay thế bằng khóa công khai Stripe của bạn

  const handleSubmit = (result) => {
    if (result === "") {
      handleNext(3);
    } else {
      handleNext(4);
    }
    payment(result);
  };
  return (
    <Fragment>
      <StepLayout activeStep={2} linkToStep={(step) => handleNext(step)} />
      <Elements stripe={stripePromise}>
        <PaymentForm onPaymentResult={handleSubmit} />
      </Elements>
    </Fragment>
  );
};

export default OrderPayment;
