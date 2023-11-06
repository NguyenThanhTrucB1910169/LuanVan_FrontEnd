import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./completeOrder.css";
import StepLayout from "./stepLayout";
import { Link } from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useSelector } from "react-redux";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import moment from "moment";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const CompleteOrder = ({ orderInfo }) => {
  const user = useSelector((state) => state.login.user);
  const [detail, setShowDetails] = useState(false);
  const [info, setInfo] = useState([]);
  const [infoUser, setInfoUser] = useState({});
  useEffect(() => {
    console.log("orderInfo ", orderInfo);
    setInfoUser(orderInfo.newOrder);
    setInfo(orderInfo.products);
  }, [orderInfo]);
  useEffect(() => {
    info.map((product) => {
      console.log(product);
    });
  }, []);
  const date = moment.utc(info.createdAt);
  const dateFormatted = date.format("DD/MM/YYYY HH:mm");
  return (
    <Fragment>
      <StepLayout activeStep={3} />
      <div className="order_complete_contain">
        <div className="order_complete">
          <div className="bag_icon">
            <LocalMallIcon />
          </div>
          <h1>Thank you!</h1>
          <p className="mt-4">
            Bạn đã hoàn thành đặt hàng!
            <img src="./cart-completed.png" alt="" className="img_completed" />
          </p>
        </div>
        <div className="row justify-content-center bg_order position-relative">
          <div className={`col-7 order_review ${detail ? "re_height" : ""}`}>
            <div className="row justify-content-between">
              <h1 className="col-7 title_info">Đơn hàng</h1>
              <div className="col-5 text-end total_order">
                Tổng đơn hàng:{" "}
                <span>
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(infoUser.totalPrice)}
                </span>
              </div>
            </div>
            <div className="info_frame">
              <div className="info_user">
                <div className="title">Thông tin giao hàng</div>
                <p className="mt-2">
                  Tên người nhận:{" "}
                  <span className="fw-semibold">{user.fullname}</span>{" "}
                </p>
                <p>
                  Địa chỉ giao hàng: <span>{user.address}</span>
                </p>
                <p>
                  Số điện thoại: <span>{user.phone}</span>
                </p>
              </div>
              <div className="info_order_completed">
                <div className="title">Thông tin đơn hàng</div>
                <p className="mt-2">
                  Mã đơn hàng:{" "}
                  <span className="fw-semibold">{infoUser.id}</span>{" "}
                </p>
                <p>
                  Ngày tạo đơn: <span>{dateFormatted}</span>{" "}
                </p>
                <p className={!infoUser.note ? "d-none" : "d-block"}>
                  Ghi chú: <span>{infoUser.note}</span>{" "}
                </p>
                <p>
                  Tình trạng đơn:{" "}
                  <span>
                    {infoUser.status === 0
                      ? "Đã đặt"
                      : infoUser.status === 1
                      ? "Đang giao"
                      : infoUser.status === 2
                      ? "Đã Nhận"
                      : ""}
                  </span>{" "}
                </p>
                <p>
                  Thanh toán:{" "}
                  <span>
                    {infoUser.payment === "received"
                      ? "Thanh toán khi nhận hàng"
                      : "Đã thanh toán trực tuyến"}
                  </span>
                </p>
              </div>
              <div className="info_order_products">
                <div className="title">Đơn hàng của bạn</div>
                <div className="products_frame">
                  {info
                    ? info.map((item, index) => (
                        <div
                          key={index}
                          className="row mb-5 justify-content-start m-0"
                        >
                          <div className="img col-2">
                            {item.image.split(",")[0] && (
                              <img
                                src={`http://localhost:3005/uploads/${
                                  item.image.split(",")[0]
                                }`}
                                alt=""
                              />
                            )}
                          </div>
                          <div className="col-6">
                            <p>
                              #<span>{item.id}</span>
                            </p>
                            <p className="title_pd">{item.name}</p>
                            
                            <p className="ms-3" style={{ fontSize: "17px" }}>
                              {" "}
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.price)}
                              <span
                                style={{ fontWeight: "700", fontSize: "14px" }}
                              >
                                {" "}
                                x
                              </span>{" "}
                              <span>{item.quantity}</span>
                            </p>
                          </div>
                          <div className="col-4 text-end">
                            <h5
                              className="fw-semibold"
                              style={{ fontFamily: "cursive" }}
                            >
                              Thành Tiền
                            </h5>
                            <h6>
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.price * item.quantity)}
                            </h6>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
          <button className="icon_down" onClick={() => setShowDetails(!detail)}>
            {detail ? (
              <KeyboardDoubleArrowUpIcon />
            ) : (
              <KeyboardDoubleArrowDownIcon />
            )}
          </button>
        </div>
        <div className="btn_navigate">
          <Link to="/" className="col-3 text-start">
            <i className="fa-solid fa-caret-left"></i>{" "}
            <span className="ms-2">Trang chủ</span>
          </Link>
          <Link to="/products/none" className="text-capitalize col-4">
            <div className="icon_shopping">
              <AddShoppingCartIcon />
            </div>
            <span className="ms-2">Tiếp tục mua sắm</span>{" "}
          </Link>
          <Link to="/vieworder" className="text-capitalize col-4">
            <i className="fa-solid fa-list-ol"></i>
            <span className="ms-2">Xem tất cả đơn hàng</span>{" "}
          </Link>
        </div>
      </div>
      {/* <h1 className="text-center text-capitalize my-3 success_order">
        Hoàn thành đặt hàng
      </h1>
      <div className="row justify-content-around btn_group_complete">
        <Link to="/" className="col-4 text-end">
          <i className="fa-solid fa-caret-left"></i>{" "}
          <span className="ms-3">Về Trang chủ</span>
        </Link>
        <Link to="/vieworder" className="text-capitalize col-4">
          <i className="fa-solid fa-list-ol"></i>
          <span className="ms-3">Xem lịch sử đặt hàng</span>{" "}
        </Link>
      </div> */}
    </Fragment>
  );
};

export default CompleteOrder;
