import React, { Fragment, useState, useEffect } from "react";
import OrderInfo from "./orderInfo";
import OrderConfirm from "./orderConfirm";
import { connect, useDispatch, useSelector } from "react-redux";
import { updateInfo } from "../../store/actions/usersAction";
import CompleteOrder from "./completeOrder";
import { createOrder } from "../../store/actions/orderAction";
import OrderPayment from "./orderPayment";
import Toast from "../home/toast";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Order = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [notes, setNotes] = useState("");
  const history = useHistory();
  const infoUser = useSelector((state) => state.login);
  const cartItem = useSelector((state) => state.cart);
  // const [payment, setPayment] = useState(false);
  const placedAction = useSelector((state) => state.orderInfo.placed);
  const infoById = useSelector((state) => state.orderInfo.infoByOrderId);
  const [orderInfo, setOrderInfo] = useState({});
  const [alert, setAlert] = useState(false);
  // const [placed, setPlaced] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
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
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        };
      });
      console.log('paymentResult ', paymentResult);
      console.log('price ', price)
      await dispatch(
        createOrder({
          products: pdOrder,
          total: price,
          status: 0,
          note: notes,
          payment: paymentResult,
        })
      );
      if (typeof paymentResult === "number") {
        setAlert(false);
      } else {
        setAlert(true);
      }
      // console.log(result);
      // setPlaced(result);
      //   console.log(orderInfo)
      //   if (orderInfo) {
      //     console.log(orderInfo);
      //     setOrderInfo(orderInfo);
      //     toast.success(<Toast message="Hoàn thành thanh toán" />, {
      //       className: "success",
      //     });
      //   } else {
      //     setOrderInfo(null);
      //     toast.error(<Toast message="Thanh toán thất bại" />, {
      //       className: "fail",
      //     });
      //   }
      setOrderSubmitted(true);
    } else {
      setOrderSubmitted(false);
    }
  };
  useEffect(() => {
    console.log(orderSubmitted);
    if (orderSubmitted) {
      if (placedAction) {
        toast.success(<Toast message="Hoàn thành thanh toán" />, {
          className: "success",
        });
        handleNext(4);
        // setPayment(true);
      } else {
        toast.error(<Toast message="Thanh toán thất bại" />, {
          onClose: () => {
           history.push('/')
          },
          className: "fail",
        });
      }
      console.log(infoById);
      console.log(typeof infoById);

      if (infoById !== null) {
        setOrderInfo(infoById);
      } else {
        setOrderInfo(null);
      }
    }
  }, [orderSubmitted, infoById]);

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
          // paymentResult={payment}
          //   notes={handleNotes}
        />
      ) : null}
      {activeIndex === 4 ? <CompleteOrder orderInfo={orderInfo} /> : null}
      {/* <CompleteOrder /> */}
    </Fragment>
  );
};

export default Order;
