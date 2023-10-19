import React, { Fragment, useEffect, useRef, useState } from "react";
import PaymentForm from "./paymentForm";
import { loadStripe } from "@stripe/stripe-js";
import StepLayout from "./stepLayout";
import { Elements } from "@stripe/react-stripe-js";
import "./orderPayment.css";
import PaypalCheckout from "./paypalCheckout";
import { useSelector } from "react-redux";

const OrderPayment = ({ handleNext, payment }) => {
  const stripePromise = loadStripe(process.env.REACT_APP_CLIENT_KEY); // Thay thế bằng khóa công khai Stripe của bạn
  const [selectedOption, setSelectedOption] = useState("");
  const [complete, setComplete] = useState(false);
  const cartItem = useSelector((state) => state.cart.cartItem);
  const [pay, setPay] = useState("");

  const handleOptionChange = (event) => {
    // console.log(event.target.value);
    // console.log(selectedOption);
    if (event.target.value === selectedOption) {
      setSelectedOption("");
      setPay('');
    } else {
      setSelectedOption(event.target.value);
      setPay('');
    }
  };

  const handleSubmit = (result) => {
    console.log(result);
    if (result !== "") {
      setPay(result);
    }
  };

  const handleOptionDelivery = (event) => {
    console.log(event.target.value);
    console.log(selectedOption);
    if (event.target.value === selectedOption) {
      setSelectedOption("");
      setPay('');
    } else if(event.target.value === undefined){
      setSelectedOption(event.target.value);
      setPay('')
    }
    else {
      setSelectedOption(event.target.value);
      setPay("received");
    }
  };

  const payToMain = () => {
    payment(pay);
  };

  // useEffect(() => {
  //   if (selectedOption === "option3") {
  //     setComplete(true);
  //     payment("receipt");
  //   } else {
  //     setComplete(false);
  //   }
  // }, [selectedOption]);

  useEffect(() => {
    console.log(pay);
  }, [pay]);

  return (
    <Fragment>
      <StepLayout activeStep={2} linkToStep={(step) => handleNext(step)} />

      <div className="div_choose">
        <div
          className={`option_frame ${
            selectedOption === "option1" ? "dsp" : "hide"
          }`}
        >
          <div
            className={
              selectedOption === "option1" ? "option display" : "option"
            }
            onClick={handleOptionChange}
          >
            <div className="input_radio">
              <input
                type="radio"
                value="option1"
                checked={selectedOption === "option1"}
                // onChange={handleOptionChange}
              />
            </div>
            <div className="div_method col-4">
              <p>Thanh toán qua thẻ</p>
            </div>
            <div className="div_img col-6 row">
              <img src="./payment_visa.png" alt="" className="col-4" />
              <img src="./payment_master.jpg" alt="" className="col-4" />
              <img src="./payment_express.png" alt="" className="col-4" />
            </div>
          </div>
          <div
            className={
              selectedOption === "option1" ? "down_frame display" : "down_frame"
            }
          >
            <Elements stripe={stripePromise}>
              <PaymentForm onPaymentResult={handleSubmit} />
            </Elements>
          </div>
        </div>
        <div
          className={`option_frame ${
            selectedOption === "option2" ? "dsp" : "hide"
          }`}
        >
          <div
            className={
              selectedOption === "option2" ? "option display" : "option"
            }
            onClick={handleOptionChange}
          >
            <div className="input_radio">
              <input
                type="radio"
                value="option2"
                checked={selectedOption === "option2"}
                // onChange={handleOptionChange}
              />
            </div>
            <div className="div_method div_paypal">
              <p>Thanh toán qua paypal</p>
            </div>
            <div className="div_img_paypal">
              <img src="./payment_paypal.png" alt="" />
            </div>
          </div>
          <div
            className={
              selectedOption === "option2"
                ? "down_frame display_paypal"
                : "down_frame"
            }
          >
            <div className="paypal_button">
              <PaypalCheckout onPaymentResult={handleSubmit} />
            </div>
          </div>
        </div>
        <div
          className={`option_frame ${
            selectedOption === "option3" ? "dsp" : "hide"
          }`}
        >
          <div
            className={
              selectedOption === "option3" ? "option display3" : "option"
            }
            onClick={handleOptionDelivery}
          >
            <div className="input_radio">
              <input
                type="radio"
                value="option3"
                checked={selectedOption === "option3"}
                // onChange={handleOptionChange}
              />
            </div>
            <div className="div_method div_paypal">
              <p>Thanh toán khi nhận hàng</p>
            </div>
            <div className="div_img_pay">
              <i className="fa-regular fa-money-bill-1"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="btn_complete_payment">
        <button disabled={pay === ""} onClick={() => payment(pay)}>
          Hoàn Tất
        </button>
      </div>
    </Fragment>
  );
};

export default OrderPayment;
