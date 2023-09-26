// import {
//     CardNumberElement,
//     CardExpiryElement,
//     CardCvcElement,
//     ElementsConsumer,
//   } from "@stripe/react-stripe-js"

//   const StripeForm = ({ stripe, elements }) => {

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//       if (!stripe || !elements) {
//         return
//       }
//       const cardNumberElement = elements.getElement(CardNumberElement)
//       console.log(cardNumberElement)
//       const res = await stripe.createToken(cardNumberElement)
//       console.log(res)
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="cardNumber">Card Number</label>
//             <div>
//               <CardNumberElement />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="cardName">Card Name</label>
//             <input
//               type="text"
//               name="cardName"
//               required
//               placeholder="Please Enter"
//             //   pattern="[A-Za-z]"
//             />
//           </div>
//           <div>
//             <label htmlFor="expDate">Exp. Date</label>
//             <div>
//               <CardExpiryElement />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="CVC">CVC</label>
//             <div>
//               <CardCvcElement />
//             </div>
//           </div>
//           <button type="submit">enter</button>
//         </form>
//     )
//   }

//   const CardForm = () => {
//     return (
//       <ElementsConsumer>
//         {({ stripe, elements }) => (
//           <StripeForm stripe={stripe} elements={elements} />
//         )}
//       </ElementsConsumer>
//     )
//   }

//   export default CardForm

// import {
//       CardNumberElement,
//       CardExpiryElement,
//       CardCvcElement,
//       ElementsConsumer,
//     } from "@stripe/react-stripe-js"

//     const StripeForm = ({ stripe, elements }) => {

//       const handleSubmit = async (e) => {
//           e.preventDefault();
//         if (!stripe || !elements) {
//           return
//         }
//         const cardNumberElement = elements.getElement(CardNumberElement)
//         console.log(cardNumberElement)
//         const res = await stripe.createToken(cardNumberElement)
//         console.log(res)
//       }

//       return (
//           <form onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="cardNumber">Card Number</label>
//               <div>
//                 <CardNumberElement />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="cardName">Card Name</label>
//               <input
//                 type="text"
//                 name="cardName"
//                 required
//                 placeholder="Please Enter"
//               //   pattern="[A-Za-z]"
//               />
//             </div>
//             <div>
//               <label htmlFor="expDate">Exp. Date</label>
//               <div>
//                 <CardExpiryElement />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="CVC">CVC</label>
//               <div>
//                 <CardCvcElement />
//               </div>
//             </div>
//             <button type="submit">enter</button>
//           </form>
//       )
//     }

//     const CardForm = () => {
//       return (
//         <ElementsConsumer>
//           {({ stripe, elements }) => (
//             <StripeForm stripe={stripe} elements={elements} />

//           )}
//           <form onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="cardNumber">Card Number</label>
//               <div>
//                 <CardNumberElement />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="cardName">Card Name</label>
//               <input
//                 type="text"
//                 name="cardName"
//                 required
//                 placeholder="Please Enter"
//               //   pattern="[A-Za-z]"
//               />
//             </div>
//             <div>
//               <label htmlFor="expDate">Exp. Date</label>
//               <div>
//                 <CardExpiryElement />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="CVC">CVC</label>
//               <div>
//                 <CardCvcElement />
//               </div>
//             </div>
//             <button type="submit">enter</button>
//           </form>
//         </ElementsConsumer>
//       )
//     }

//     export default CardForm

import React, { Fragment, useRef, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import "./paymentForm.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useEffect } from "react";
import Toast from "../home/toast";
import { toast, ToastContainer } from "react-toastify";

const PaymentForm = ({ onPaymentResult }) => {
  const stripe = useStripe();
  const elements = useElements();
  // const [cardNumber, setCardNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberFormat, setCardNumberFormat] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [error, setError] = useState({
    numberError: "",
    expiryError: "",
    cvcError: "",
  });
  const isValid = () => {
    if (error.numberError === "" && error.expiryError === "" && error.cvcError === "") {
      return true;
    } else return false;
  };
  const isLuhnValid = (cardNumber) => {
    let sum = 0;
    let doubleUp = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i]);
      if (doubleUp) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      doubleUp = !doubleUp;
    }
    return sum % 10 === 0;
  };
  const validatePayment = (name) => {
    let errors = {};
    console.log(name);
    switch (name) {
      case "cardNumber":
        console.log(cardNumber);
        if (cardNumber === "") {
          setError((prevState) => ({
            ...prevState,
            numberError: "Nhập số thẻ",
          }));
        } else if (/^\d{13,19}$/.test(cardNumber)) {
          if (isLuhnValid(cardNumber)) {
            setError((prevState) => ({
              ...prevState,
              numberError: "",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              numberError: "Số thẻ không hợp lệ",
            }));
          }
        } else {
          setError((prevState) => ({
            ...prevState,
            numberError: "Số thẻ không hợp lệ",
          }));
        }
        return errors;
      case "cardExpiry":
        console.log(cardExpiry);
        if (cardExpiry === "") {
          setError((prevState) => ({
            ...prevState,
            expiryError: "Nhập ngày hết hạn",
          }));
        } else if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
          const [month, year] = cardExpiry.split("/");
          const currentYear = new Date().getFullYear() % 100; // Lấy 2 chữ số cuối của năm hiện tại
          console.log(currentYear);
          console.log(parseInt(year, 10));
          console.log(parseInt(year, 10));
          console.log(parseInt(year, 10));

          if (
            parseInt(year, 10) < currentYear ||
            (parseInt(year, 10) === currentYear &&
              parseInt(month, 10) < new Date().getMonth() + 1)
          ) {
            setError((prevState) => ({
              ...prevState,
              expiryError: "Expiration Date không hợp lệ",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              expiryError: "",
            }));
          }
        } else {
          setError((prevState) => ({
            ...prevState,
            expiryError: "Expiration Date không hợp lệ",
          }));
        }
        return errors;
      case "cardCvc":
        if (cardCvc === "") {
          setError((prevState) => ({
            ...prevState,
            cvcError: "Nhập mã Cvc",
          }));
        } else if (/^\d{3,4}$/.test(cardCvc)) {
          setError((prevState) => ({
            ...prevState,
            cvcError: "",
          }));
        } else
          setError((prevState) => ({
            ...prevState,
            cvcError: "Mã Cvc không hợp lệ",
          }));
        return errors;
      default:
        return errors;
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "cardNumber") {
      if (e.target.value.replace(/\s+/g, "").length <= 19) {
        setCardNumber(e.target.value.replace(/\s+/g, ""));
      }
    } else if (e.target.name === "cardExpiry") {
      if (e.target.value.length <= 5) {
        setCardExpiry(e.target.value);
      }
    } else {
      if (e.target.value.length <= 4) {
        setCardCvc(e.target.value);
      }
    }
    setCurrentInput(e.target.name);
  };

  useEffect(() => {
    // if(
    let formattedCreditCardNumber = "";
    // let numberInput = "1234567891234325";
    // console.log(cardNumber.length);
    // console.log(cardNumber)
    for (let i = 0; i < cardNumber.length; i++) {
      formattedCreditCardNumber += cardNumber[i];
      if ((i + 1) % 4 === 0 && i !== cardNumber.length - 1) {
        formattedCreditCardNumber += " ";
      }
    }
    setCardNumberFormat(formattedCreditCardNumber);
  }, [cardNumber]);
  useEffect(() => {
    validatePayment(currentInput);
  }, [cardNumber, cardExpiry, cardCvc]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isValid){
      try {
        // Tạo một token từ dữ liệu thẻ
        if (!stripe || !elements) {
          return;
        }
        const { token } = await stripe.createToken("card", {
          number: cardNumber,
          exp_month: cardExpiry.slice(0, 2),
          exp_year: cardExpiry.slice(3, 5),
          cvc: cardCvc,
        });
  
        // Gửi token đến máy chủ để xử lý thanh toán hoặc lưu trữ
        console.log(token);
  
        // Đặt lại trạng thái dữ liệu thẻ
        setCardNumber("");
        setCardExpiry("");
        setCardCvc("");
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    } else{
      toast.error(<Toast message="Thông tin không hợp lệ" />, {
        className: "fail",
      });
    }
  };

  //   const handleChangeCardNumber = () => {
  //       var cardNumber = document.getElementById('cardNumberElement').value;
  //       console.log(cardNumber)
  //     // setCardNumber(e.target.value);
  //   }

  return (
    <Fragment>
      <div className="payment_order">
        <div className="col-5">
          <div className="payment_card">
            <div className="card_inner">
              <div className="card_front">
                <div className="card_title">
                  <p className="text-uppercase text-end">card</p>
                </div>
                <div className="card_id">
                  <div className="col-3">
                    <img src="./chip.png" alt="" className="h-100 ms-3" />
                  </div>
                  <div className="col-3">
                    <img
                      src="./contactless.png"
                      alt=""
                      className="h-75 ms-3 mt-2"
                    />
                  </div>
                </div>
                <div className="card_number">
                  <p>{cardNumberFormat}</p>
                </div>
                <div className="card_date">
                  <div className="col-3 date_exp">{cardExpiry}</div>
                  <div className="col-6 text-end">
                    <img src="./circle-bank.png" alt="" className="h-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          {/* <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="cardNumber">Card Number</label>
              <div>
                <CardNumberElement />
              </div>
            </div>
            <div>
              <label htmlFor="cardName">Card Name</label>
              <input
                type="text"
                name="cardName"
                required
                placeholder="Please Enter"
              />
            </div>
            <div>
              <label htmlFor="expDate">Exp. Date</label>
              <div>
                <CardExpiryElement />
              </div>
            </div>
            <div>
              <label htmlFor="CVC">CVC</label>
              <div>
                <CardCvcElement />
              </div>
            </div>
            <button type="submit">Enter</button>
          </form> */}
          <form onSubmit={handleSubmit} className="form_stripe">
            <div className="mb-4">
              <div className="input_stripe">
                <label htmlFor="card-number">Card Number</label>
                <input
                  type="text"
                  id="card-number"
                  value={cardNumberFormat}
                  onChange={handleChange}
                  placeholder="Card Number"
                  required
                  name="cardNumber"
                  // className="col-9"
                />
                <div className="input_icon">
                  <CreditCardIcon />
                </div>
              </div>
              {error.numberError && (
                <div className="input_error">{error.numberError}</div>
              )}
            </div>
            <div className="mb-4">
              <div className="input_stripe">
                <label htmlFor="card-expiry">Expiration Date</label>
                <input
                  type="text"
                  id="card-expiry"
                  name="cardExpiry"
                  value={cardExpiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  required
                />
                <div className="input_icon">
                  <VpnKeyIcon />
                </div>
              </div>
              {error.expiryError && (
                <div className="input_error">{error.expiryError}</div>
              )}
            </div>
            <div className="mb-4">
              <div className="input_stripe">
                <label htmlFor="card-cvc">CVC</label>
                <input
                  type="text"
                  id="card-cvc"
                  value={cardCvc}
                  onChange={handleChange}
                  placeholder="CVC"
                  required
                  name="cardCvc"
                />
                <div className="input_icon">
                  <EventIcon />
                </div>
              </div>
              {error.cvcError && (
                <div className="input_error">{error.cvcError}</div>
              )}
            </div>
            <div className="text-center">
              <button type="submit" className="btn_pay">
                Thanh Toán
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default PaymentForm;
