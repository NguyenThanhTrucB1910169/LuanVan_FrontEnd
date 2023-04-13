import React from "react";
import { Fragment } from "react";
import "./orderDetail.css";
import SubHeader from "../layouts/subHeader";
import Footer from "../home/footer";
import { withRouter, Link } from "react-router-dom";
import { getDetailProduct } from "../../store/actions/orderAction";
import moment from "moment";

import { connect } from "react-redux";
class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      total: 0,
      qty: 0
    };
  }
  componentWillMount = async () => {
    this.props.getDetailProduct(this.props.location.params.id);
  };

  componentDidMount = () => {
    var total = 0;
    this.props.detailsOrder.map((detail) => {
        total += detail.price * detail.quantity;
    })
    this.setState({total: total});
  }

  render() {
    var date = moment.utc(this.props.detailsOrder[0].createdAt);
    var dateFormatted = date.format("DD/MM/YYYY HH:mm");
    return (
      <Fragment>
        <SubHeader />
        <div className="view_detail">
          <div className="row justify-content-between">
            <div className="col-1 text-center detail_back">
              <Link to="/vieworder">
                <i className="fa-solid fa-angles-left"></i>
              </Link>
            </div>
            <h1 className="col-11 text-center detail_title">
              Chi Tiết Đơn hàng
            </h1>
          </div>
          <div className="d-flex flex-column detail_info">
            <h3>
              Mã đơn hàng:{" "}
              {this.props.detailsOrder[0].id.toString().length === 1
                ? `#0${this.props.detailsOrder[0].id}`
                : `#${this.props.detailsOrder[0].id}`}
            </h3>
            <p>Ngày đặt: {dateFormatted}. Tình trạng: {this.props.detailsOrder[0].status === 0
                          ? (
                            <span>Đã đặt, đang chờ xử lý...</span>
                          )
                          : this.props.detailsOrder[0].status === 1
                          ? "Đang giao"
                          : this.props.detailsOrder[0].status === 2
                          ? "Đã Nhận"
                          : ""}</p>
          </div>
          <div className="row justify-content-between">
            <div className="col-6 detail_pd">
            <div>
              {this.props.detailsOrder.map((detail, index) => (
                <div
                  className="row justify-content-around detail_card"
                  key={index}
                >
                  <div className="col-2 img_detail p-0 text-center">
                    <img src={detail.image.split(",")[2]} alt="" />
                  </div>
                  <div className="col-6 title_detail p-0">
                    <h5>{detail.name}</h5>
                    <p>Mã sản phẩm: {detail.productId}</p>
                  </div>
                  <div className="col-4 price_detail">
                    <h5>
                      Giá:{" "}
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(detail.price)}
                    </h5>
                    <p>SL: {detail.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
              <div className="row justify-content-start">
                <div className="col-8 sum_detail">
                  <div className="row justify-content-between">
                    <div className="col-4">Tổng đơn</div>
                    <div className="col-4">{Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(this.state.total)}</div>
                  </div>
                  <div className="row justify-content-between">
                    <div className="col-4">Phí</div>
                    <div className="col-4">Miễn Phí</div>
                  </div>
                  <div className="border_sum"></div>
                  <div className="row justify-content-between">
                    <div className="col-4 fw-bold">Tổng cộng</div>
                    <div className="col-4 fw-bold">{Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(this.state.total)}</div>
                  </div>
                </div>
              </div>
              {/* <div className="note_detail"> */}
                      {this.props.detailsOrder[0].note ? (
                        <div className="note_detail">
                          <i className="fa-solid fa-asterisk"></i><span className="fw-bold text-decoration-underline"> Ghi Chú:</span> {this.props.detailsOrder[0].note}
                        </div>
                      ) : null}
              {/* </div> */}
            </div>
            <div className="col-5 detail_user">
              <h1 className="mb-4 text-capitalize text-center">Thông tin người đặt</h1>
              <h4>Họ Tên: {this.props.user.fullname}</h4>
              <h4>Giới tính: {this.props.user.gender ? "Nam" : "Nữ"}</h4>
              <h4>Địa chỉ: {this.props.user.address}</h4>
              <h4>Email: {this.props.user.email}</h4>
              <h4>SĐT: {this.props.user.phone}</h4>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailsOrder: state.orderInfo.detail,
    user: state.login.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailProduct: (id) => dispatch(getDetailProduct(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
);
