// // import React from "react";
// // import { Fragment } from "react";
// // import "./orderPayment.css";
// // import StepLayout from "./stepLayout";
// // import CardForm from "./paymentForm";
// // // import { Stripe } from "@stripe/stripe-js";
// // import CartReview from "../cart/cartReview";
// // // import React, { Component } from 'react';
// // // import Stripe from "stripe";
// // // import { Elements } from "@stripe/react-stripe-js";
// // // import { CardElement } from "@stripe/react-stripe-js";
// // import {
// //   CardNumberElement,
// //   CardCvcElement,
// //   CardExpiryElement,
// //   useStripe,
// //   useElements,
// //   Elements,
// //   injectStripe,
// //   StripeProvider
// // } from "@stripe/react-stripe-js";
// // // import {injectStripe} from 'react-stripe-elements';
// // import { loadStripe, } from '@stripe/stripe-js';
// // const stripe = loadStripe(
// //   "pk_test_51MWNRIDCE9QNRtxGVMQMl7RnfahEMvcytYHA9tGUUkAMshWYiQoasXdzYxz8DM4QbkUVGe86PnkAqZJGGnfqsKTs00WpdF3MUF"
// // );
// // class OrderPayment extends React.Component {
// //   constructor(props) {
// //     super(props);
// //   }

// //   render() {
// //     return (
// //       <Elements stripe={stripe}>
// //         <CardForm />
// //       </Elements>
// //     )
// //   }
// // }

// // export default OrderPayment;

// import React, { Fragment, useEffect, useRef } from "react";
// // import CheckoutSteps from "../Cart/CheckoutSteps";
// import { useSelector, useDispatch } from "react-redux";
// // import MetaData from "../layout/MetaData";
// import { Typography } from "@material-ui/core";
// // import { useAlert } from "react-alert";
// import StepLayout from "./stepLayout";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
//   Elements,
// } from "@stripe/react-stripe-js";

// import axios from "axios";
// // import "./payment.css";
// import CreditCardIcon from "@material-ui/icons/CreditCard";
// import EventIcon from "@material-ui/icons/Event";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
// // import { createOrder, clearErrors } from "../../actions/orderAction";
// const StripeForm = ({ stripe, elements }) => {
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }
//     const cardNumberElement = elements.getElement(CardNumberElement);
//     console.log(cardNumberElement);
//     const res = await stripe.createToken(cardNumberElement);
//     console.log(res);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="cardNumber">Card Number</label>
//         <div>
//           <CardNumberElement />
//         </div>
//       </div>
//       <div>
//         <label htmlFor="cardName">Card Name</label>
//         <input
//           type="text"
//           name="cardName"
//           required
//           placeholder="Please Enter"
//           //   pattern="[A-Za-z]"
//         />
//       </div>
//       <div>
//         <label htmlFor="expDate">Exp. Date</label>
//         <div>
//           <CardExpiryElement />
//         </div>
//       </div>
//       <div>
//         <label htmlFor="CVC">CVC</label>
//         <div>
//           <CardCvcElement />
//         </div>
//       </div>
//       <button type="submit">enter</button>
//     </form>
//   );
// };
// const OrderPayment = ({ handleNext }) => {
//   // const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

//   const dispatch = useDispatch();
//   // const alert = useAlert();
//   const stripe = useStripe();
//   const elements = useElements();
//   const payBtn = useRef(null);
//   const stripePromise = loadStripe(
//     "pk_test_51MWNRIDCE9QNRtxGVMQMl7RnfahEMvcytYHA9tGUUkAMshWYiQoasXdzYxz8DM4QbkUVGe86PnkAqZJGGnfqsKTs00WpdF3MUF"
//   );
//   // const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//   // const { user } = useSelector((state) => state.user);
//   // const { error } = useSelector((state) => state.newOrder);

//   // const paymentData = {
//   //   amount: Math.round(orderInfo.totalPrice * 100),
//   // };

//   // const order = {
//   //   shippingInfo,
//   //   orderItems: cartItems,
//   //   itemsPrice: orderInfo.subtotal,
//   //   taxPrice: orderInfo.tax,
//   //   shippingPrice: orderInfo.shippingCharges,
//   //   totalPrice: orderInfo.totalPrice,
//   // };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     payBtn.current.disabled = true;
//     handleNext(4);

//     // try {
//     //   const config = {
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //     },
//     //   };
//     //   const { data } = await axios.post(
//     //     "/api/v1/payment/process",
//     //     paymentData,
//     //     config
//     //   );

//     //   const client_secret = data.client_secret;

//     //   if (!stripe || !elements) return;

//     //   const result = await stripe.confirmCardPayment(client_secret, {
//     //     payment_method: {
//     //       card: elements.getElement(CardNumberElement),
//     //       billing_details: {
//     //         name: user.name,
//     //         email: user.email,
//     //         address: {
//     //           line1: shippingInfo.address,
//     //           city: shippingInfo.city,
//     //           state: shippingInfo.state,
//     //           postal_code: shippingInfo.pinCode,
//     //           country: shippingInfo.country,
//     //         },
//     //       },
//     //     },
//     //   });

//     //   if (result.error) {
//     //     payBtn.current.disabled = false;

//     //     alert.error(result.error.message);
//     //   } else {
//     //     if (result.paymentIntent.status === "succeeded") {
//     //       order.paymentInfo = {
//     //         id: result.paymentIntent.id,
//     //         status: result.paymentIntent.status,
//     //       };

//     //       dispatch(createOrder(order));

//     //       // history.push("/success");
//     //       handleNext(4)
//     //     } else {
//     //       alert.error("There's some issue while processing payment ");
//     //     }
//     //   }
//     // } catch (error) {
//     //   payBtn.current.disabled = false;
//     //   alert.error(error.response.data.message);
//     // }
//   };

//   // useEffect(() => {
//   //   if (error) {
//   //     alert.error(error);
//   //     dispatch(clearErrors());
//   //   }
//   // }, [dispatch, error, alert]);

//   return (
//     <Fragment>
//       {/* <MetaData title="Payment" /> */}
//       <StepLayout activeStep={2} />
//       <div className="paymentContainer">
//         <Elements stripe={stripePromise}>
//           {({ stripe, elements }) => (
//             <StripeForm stripe={stripe} elements={elements} />
//           )}
//         </Elements>
//       </div>
//     </Fragment>
//   );
// };

// // export default Payment;

// export default OrderPayment;

import React, { Fragment, useRef } from "react";
import PaymentForm from "./paymentForm";
import { loadStripe } from "@stripe/stripe-js";
import StepLayout from "./stepLayout";
import { Elements } from "@stripe/react-stripe-js";

const OrderPayment = ({ handleNext }) => {
  const payBtn = useRef(null);
  const stripePromise = loadStripe(process.env.REACT_APP_CLIENT_KEY); // Thay thế bằng khóa công khai Stripe của bạn

  const handleSubmit = (result) => {
    // e.preventDefault();
    payBtn.current.disabled = true;
    handleNext(4);
    // if (!stripe || !elements) {
    //   return;
    // }
    // const cardNumberElement = elements.getElement(CardNumberElement);
    // console.log(cardNumberElement);
    // const res = await stripe.createToken(cardNumberElement);
    // console.log(res);
  };

  return (
    <Fragment>
      <StepLayout activeStep={2} />
      <Elements stripe={stripePromise}>
        <PaymentForm payment={handleSubmit}/>
      </Elements>
    </Fragment>
  );
};

export default OrderPayment;
