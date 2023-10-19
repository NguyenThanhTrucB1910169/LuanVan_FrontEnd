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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const CompleteOrder = ({ orderInfo }) => {
  const user = useSelector((state) => state.login.user);
  const [detail, setShowDetails] = useState(false);
  const [info, setInfo] = useState({
    createdAt: "2023-10-14T21:30:18.000Z",
    id: 39,
    note: "",
    payment: "received",
    status: 0,
    totalPrice: 120000000,
    userId: 2,
    products: [
      {
        count: 1119,
        createdAt: "2023-09-17T07:35:15.000Z",
        description:
          "Chất lượng tay nghề thủ công và sự chú ý đến từng chi tiết đi vào từng thiết kế lụa thủ công của Elsa Peretti. Chiếc trâm Amapola này được chế tác bằng bạch kim sáng bóng và lụa đỏ sang trọng.",
        id: "JW02",
        image:
          "image-1694936115205-300740781.webp,image-1694936115241-671499175.webp,image-1694936115242-713037886.webp",
        material: "Bạch Kim",
        name: "Trâm cài Amapola ",
        orderItems: {
          orderId: 42,
          productId: "JW02",
          quantity: 4,
          price: 1200000,
        },
        price: 1200000,
        type: "Ghim Cài",
      },
      {
        count: 90,
        createdAt: "2023-09-17T07:32:10.000Z",
        description:
          "Gợi nhớ một hạt mưa đơn độc hay một hạt sương mai lấp lánh. Bông tai dạng vòng bằng bạch kim, bao quanh tai. Thiết kế ban đầu thuộc bản quyền của Elsa PerettiA",
        id: "JW01",
        image:
          "image-1696867733585-947390987.webp,image-1696867733588-960151481.webp,image-1696867733601-431407143.webp",
        material: "Bạc",
        name: "Hoa Tai Teardrop",
        orderItems: {
          orderId: 42,
          productId: "JW01",
          quantity: 7,
          price: 120000,
        },
        price: 120000,
        type: "Hoa Tai",
      },
      {
        count: 90,
        createdAt: "2023-09-17T07:32:10.000Z",
        description:
          "Gợi nhớ một hạt mưa đơn độc hay một hạt sương mai lấp lánh. Bông tai dạng vòng bằng bạch kim, bao quanh tai. Thiết kế ban đầu thuộc bản quyền của Elsa PerettiA",
        id: "JW01",
        image:
          "image-1696867733585-947390987.webp,image-1696867733588-960151481.webp,image-1696867733601-431407143.webp",
        material: "Bạc",
        name: "Hoa Tai Teardrop",
        orderItems: {
          orderId: 42,
          productId: "JW01",
          quantity: 7,
          price: 120000,
        },
        price: 120000,
        type: "Hoa Tai",
      },
    ],
  });
  // useEffect(() => {
  //   console.log(orderInfo);
  //   setInfo(orderInfo);
  // }, [orderInfo]);
  useEffect(() => {
    info.products.map((product) => {
      console.log(product)
    });
  },[])
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
                  }).format(info.totalPrice)}
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
                  Mã đơn hàng: <span className="fw-semibold">{info.id}</span>{" "}
                </p>
                <p>
                  Ngày tạo đơn: <span>{dateFormatted}</span>{" "}
                </p>
                <p className={!info.note ? "d-none" : "d-block"}>
                  Ghi chú: <span>{info.note}</span>{" "}
                </p>
                <p>
                  Tình trạng đơn:{" "}
                  <span>
                    {info.status === 0
                      ? "Đã đặt"
                      : info.status === 1
                      ? "Đang giao"
                      : info.status === 2
                      ? "Đã Nhận"
                      : ""}
                  </span>{" "}
                </p>
                <p>
                  Thanh toán:{" "}
                  <span>
                    {info.payment === "received"
                      ? "Thanh toán khi nhận hàng"
                      : "Đã thanh toán trực tuyến"}
                  </span>
                </p>
              </div>
              <div className="info_order_products">
                <div className="title">Đơn hàng của bạn</div>
                <div className="products_frame">
                  {info.products.map((item, index) => (
                    <div key={index} className="row mb-5 justify-content-start m-0">
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
                        <p className="ms-3">
                          Loại trang sức: <span>{item.type}</span>
                        </p>
                        <p className="ms-3" style={{fontSize: '17px'}}>
                          {" "}
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}
                           <span style={{fontWeight:'700', fontSize: '14px'}}> x</span> <span>{item.orderItems.quantity}</span>
                        </p>
                       
                      </div>
                      <div className="col-4 text-end">
                        <h5 className="fw-semibold" style={{fontFamily:'cursive'}}>Thành Tiền</h5>
                        <h6>
                        {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format((item.price * item.orderItems.quantity))}
                        </h6>
                      </div>
                    </div>
                  ))}
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
