import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./paypalCheckout.css";

const PaypalCheckout = ({ onPaymentResult }) => {
  //   const { product } = props;

  const [paidFor, setPaidFor] = useState(false);
  const cartItem = useSelector((state) => state.cart.cartItem);
  const [error, setError] = useState(null);
  const handleApprove = (orderId) => {
    onPaymentResult(orderId);
    // setPaidFor(true);
  };
  const totalAmount = cartItem.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  const paymentData = {
    amount: (totalAmount / 23000).toFixed(0),
  };

  // if (paidFor) {
  //   alert("Thank you for your purchase!");
  // }
  // if (error) {
  //   alert(error);
  // }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
        // fundingSource: window.paypal.FUNDING.PAYPAL,
      }}
    >
      <PayPalButtons
        style={{
          color: "silver",
          layout: "horizontal",
          height: 48,
          tagline: true,
          shape: "pill",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: paymentData.amount,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          console.log("order", order);

          handleApprove(data.orderID);
        }}
        onError={(err) => {
          setError(err);
          console.error("PayPal Checkout onError", err);
        }}
        onCancel={() => {
          alert("Bạn đã hủy thanh toán!");
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalCheckout;
