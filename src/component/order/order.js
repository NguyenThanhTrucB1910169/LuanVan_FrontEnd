import React, { Fragment, useState } from "react";
import OrderInfo from "./orderInfo";
import OrderConfirm from "./orderConfirm";
import { connect, useDispatch, useSelector } from "react-redux";
import { updateInfo } from "../../store/actions/usersAction";
import CompleteOrder from "./completeOrder";
import { createOrder } from "../../store/actions/orderAction";
import OrderPayment from "./orderPayment";

const Order = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [notes, setNotes] = useState("");
  const infoUser = useSelector((state) => state.login);
  const cartItem = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleUpdate = (info) => {
    dispatch(updateInfo(info));
  };

  const handleNext = (page) => {
    setActiveIndex(page);
  };

  const handleNotes = (notes) => {
    setNotes(notes);
  };

  const orderSubmit = async (paymentResult) => {
    var price = 0;
    if (paymentResult !== "") {
      const pdOrder = cartItem.cartItem.map((item) => {
        price += item.price * item.quantity;
        return {
          id: item.productId,
          quantity: item.quantity,
          price: item.price,
        };
      });
      await dispatch(
        createOrder({
          products: pdOrder,
          total: price,
          status: 0,
          note: notes,
          payment: paymentResult.id,
        })
      );
    }
  };

  return (
    <Fragment>
      {activeIndex === 1 ? (
        <OrderInfo
          updateInfo={handleUpdate}
          handleNext={handleNext}
          infoUser={infoUser}
        />
      ) : null}
      {activeIndex === 2 ? (
        <OrderConfirm
          handleNext={handleNext}
          info={infoUser.user}
          cartInfo={cartItem}
          // submit={orderSubmit}
          notes={handleNotes}
        />
      ) : null}
      {activeIndex === 3 ? (
        <OrderPayment
          handleNext={handleNext}
          payment={orderSubmit}
          //   notes={handleNotes}
        />
      ) : null}
      {activeIndex === 4 ? <CompleteOrder /> : null}
    </Fragment>
  );
};

export default Order;
