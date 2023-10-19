import React, { Fragment, useRef, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./paymentForm.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useEffect } from "react";
import Toast from "../home/toast";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const PaymentForm = ({ onPaymentResult }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const payBtn = useRef(null);
  const cartItem = useSelector((state) => state.cart.cartItem);
  const user = useSelector((state) => state.login.user);

  // const isValid = async () => {
  //   const number = elements.getElement(CardNumberElement);
  //   const expiry = elements.getElement(CardExpiryElement);
  //   const cvc = elements.getElement(CardCvcElement);
  //   await Promise.all([
  //     new Promise((resolve) => {
  //       number.on("change", (event) => {
  //         if (event.complete) {
  //           console.log("CardNumber hợp lệ");
  //           resolve(true);
  //         } else if (event.error) {
  //           console.log("CardNumber không hợp lệ");
  //           resolve(false);
  //         }
  //       });
  //     }),
  //     new Promise((resolve) => {
  //       expiry.on("change", (event) => {
  //         if (event.complete) {
  //           console.log("CardExpiry hợp lệ");
  //           resolve(true);
  //         } else if (event.error) {
  //           console.log("CardExpiry không hợp lệ");
  //           resolve(false);
  //         }
  //       });
  //     }),
  //     new Promise((resolve) => {
  //       cvc.on("change", (event) => {
  //         if (event.complete) {
  //           console.log("CardCvc hợp lệ");
  //           resolve(true);
  //         } else if (event.error) {
  //           console.log("CardCvc không hợp lệ");
  //           resolve(false);
  //         }
  //       });
  //     }),
  //   ]);
  //   if (!number || !expiry || !cvc) {
  //     console.log("ko hop le");
  //     return false;
  //   }
  //   return true;
  // };

  const totalAmount = cartItem.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  const paymentData = {
    amount: (totalAmount / 23000).toFixed(0) * 100,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(paymentData)
    console.log(totalAmount)
    payBtn.current.disabled = true;
    try {
      if(paymentData.amount > 0){
        const { data } = await axios.post(
          "http://localhost:3005/api/payment",
          paymentData,
          {
            withCredentials: true,
          }
        );
        console.log(data)
        const client_secret = data.client_secret;
        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.fullname,
              email: user.email,
            },
          },
        });
        if (result.error) {
          const errorMessage = `${result.error.message}`;
          console.error(errorMessage);
          toast.error(<Toast message='Thanh toán thất bại' />, {
            className: "fail",
          });
          onPaymentResult("");
          payBtn.current.disabled = false;
        } else if (result.paymentIntent.status === "succeeded") {
          const paymentInfo = result.paymentIntent.id;
          onPaymentResult(paymentInfo);
        } else {
          onPaymentResult("");
        }
      } else{
        toast.error(<Toast message='Đơn hàng không hợp lệ' />, {
          className: "fail",
      });
      }
    } catch (error) {
      onPaymentResult("");
      toast.error(<Toast message='Thanh toán thất bại' />, {
          className: "fail",
      });
      payBtn.current.disabled = false;
    }
  };

  return (
    <Fragment>
      <div className="payment_order">
        <form onSubmit={handleSubmit} className="form_stripe">
          <div className="position-relative input_stripe">
            <div className="icon_form">
              <CreditCardIcon />
            </div>
            <div className="payment_input">
              <CardNumberElement required />
            </div>
          </div>
          <div className="position-relative input_stripe">
            <div className="icon_form">
              <EventIcon />
            </div>
            <CardExpiryElement className="payment_input" required />
          </div>
          <div className="position-relative input_stripe">
            <div className="icon_form">
              <VpnKeyIcon />
            </div>
            <CardCvcElement className="payment_input" required />
          </div>
          <div className="text-center">
            <button type="submit" className="btn_pay" ref={payBtn}>
              Thanh Toán
            </button>
          </div>
        </form>
        {/* </div> */}
      </div>
    </Fragment>
  );
};

export default PaymentForm;
