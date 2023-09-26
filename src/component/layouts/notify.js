import React, { Fragment, useState } from "react";
import "./notify.css";
import { useHistory } from "react-router-dom";
// import { useAlert } from "react-alert";
// import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const Notify = ({ user }) => {
  // const { cartItems } = useSelector((state) => state.cart);

  const history = useHistory();
  // const alert = useAlert();
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className="notify">
      <div className="row justify-content-around card_noti">
        <div className="col-2 p-0">
          <img src="./bh.jpg" alt="" className="img_noti"/>
        </div>
        <div className="col-10 ps-3 pe-0">
          <div className="title">
            <p className="text-uppercase mb-2">voucher đến 500.000đ cho bạn</p>
          </div>
          <div className="des">
            <p className="mb-0">
              luu123 ơi. Sản phẩm Giảm ₫15.000 phí vận chuyển đơn tối thiểu
              ₫50.000; Giảm ₫25.000 phí vận chuyển đơn tối thiểu ₫99.000
            </p>
          </div>
        </div>
      </div>
      </div>
    </Fragment>
  );
};

export default Notify;
