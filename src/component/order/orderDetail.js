import React from "react";
import { Fragment } from "react";
import "./orderDetail.css";
import Header from "../home/header";
import Footer from "../home/footer";
import { withRouter, Link } from "react-router-dom";
import { getDetailProduct } from "../../store/actions/orderAction";
import moment from "moment";
import FmdBadIcon from "@mui/icons-material/FmdBad";

import { connect } from "react-redux";
class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      // listNotExist: [],
      listDetails: {},
      date: "",
    };
  }

  componentDidMount = () => {
    var dateFormatted = "";
    if (Object.keys(this.props.detailsOrder).length > 0) {
      this.setState(
        {
          // listNotExist: this.props.detailsOrder.idNotExists,
          listDetails: this.props.detailsOrder,
        },
        () => {
          var date = moment.utc(this.state.listDetails.createdAt);
          dateFormatted = date.format("DD/MM/YYYY HH:mm");
          this.setState({ date: dateFormatted });
        }
      );
    }
  };

  render() {
    return (
      <Fragment>
        <Header type={0} />
        <div className="view_detail">
          <div className="row justify-content-between m-0">
            <div className="col-1 text-center detail_back">
              <Link to="/vieworder">
                <i className="fa-solid fa-angles-left"></i>
              </Link>
            </div>
            <h1 className="col-11 text-center detail_title">
              Chi Tiết Đơn hàng
            </h1>
          </div>

          {Object.keys(this.state.listDetails).length > 0 ? (
            <div>
              <div className="mx-sm-3 my-sm-3 detail_info ">
                <h3>
                  Mã đơn hàng:
                  {/* {this.state.listDetails[0].id} */}
                  {this.state.listDetails.rest.id.toString().length === 1
                    ? `#0${this.state.listDetails.id}`
                    : `#${this.state.listDetails.id}`}
                </h3>
                <p>Ngày đặt: {this.state.date}</p>
                <p className="mb-5">
                  Tình trạng:{" "}
                  {this.state.listDetails.status === 0 ? (
                    <span className="">Đã Đặt.</span>
                  ) : this.state.listDetails.status === 1 ? (
                    <span className="">Chờ nhận hàng.</span>
                  ) : this.state.listDetails.status === 2 ? (
                    <span className="">Đã Nhận.</span>
                  ) : this.state.listDetails.status === 3 ? (
                    <span className="">Đã Hủy.</span>
                  ) : (
                    ""
                  )}
                </p>
              </div>
              <div className="d-flex flex-sm-column flex-lg-row justify-content-between mb-5">
                <div className="col-sm-12 col-lg-6 detail_pd">
                  <div>
                    {this.state.listDetails.OrderItems.map((detail, index) => (
                      <div
                        className="row justify-content-around detail_card"
                        key={index}
                      >
                        <div className="col-sm-2 col-lg-2 img_detail p-0 text-center">
                          {detail.image &&
                            detail.image.split(",")[2] && (
                              <img
                                src={`http://localhost:3005/uploads/${
                                  detail.image.split(",")[2]
                                }`}
                                alt=""
                              />
                            )}
                        </div>
                        <div className="col-sm-5 col-lg-6 title_detail p-0">
                          <h5>{detail.name}</h5>
                          {/* <p>Mã sản phẩm: {detail.id}</p> */}
                        </div>
                        <div className="col-sm-5 col-lg-4 p-lg-0 pt-lg-2 price_detail">
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
                  {/* {this.state.listNotExist
                    ? this.state.listNotExist.map((item, index) => (
                        <div key={index} className="id_not_exist_detail">
                          <FmdBadIcon
                            className="d-inline-block"
                            style={{
                              color: "red",
                              marginBottom: "3px",
                            }}
                          />

                          {this.state.listDetails[0].status === 0
                            ? ` Sản phẩm ${item} mà bạn đang đặt hàng
                                      hiện không còn bán tại cửa hàng
                                      của chúng tôi. Chúng tôi rất tiếc về sự
                                      bất tiện này. Cảm ơn bạn đã ủng hộ chúng
                                      tôi.`
                            : this.state.listDetails[0].status === 1
                            ? ` Sản phẩm có mã ${item} trong đơn hàng của bạn đang
                                           được giao đến bạn. Tuy nhiên, chúng tôi muốn thông báo 
                                           rằng sản phẩm này hiện không còn sẵn có trong cửa hàng 
                                           của chúng tôi và không thể hiển thị chi tiết sản phẩm.
                                            Chúng tôi rất xin lỗi về sự bất tiện này và 
                                            cảm ơn bạn đã ủng hộ cửa hàng của chúng tôi.`
                            : this.state.listDetails[0].status === 2
                            ? ` Sản phẩm ${item} mà bạn đã mua trước đây
                                      hiện không còn trong danh sách sản phẩm
                                      của chúng tôi. Chúng tôi rất tiếc về sự
                                      bất tiện này. Cảm ơn bạn đã ủng hộ chúng
                                      tôi.`
                            : ` Sản phẩm ${item} có trong đơn hàng này
                                      hiện không còn trong danh sách sản phẩm
                                      của chúng tôi. Cảm ơn bạn đã ủng hộ chúng
                                      tôi.`}
                        </div>
                      ))
                    : null} */}
                  {/* } */}

                  {/* {
                      return detail.Products !== null &&
                        Object.keys(detail.Products).length > 0 ? ( */}
                  <div className="row justify-content-start mt-5">
                    <div className="col-8 sum_detail">
                      <div className="row justify-content-between">
                        <div className="col-4">Tổng đơn</div>
                        <div className="col-4">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(this.state.listDetails.totalPrice)}
                        </div>
                      </div>
                      <div className="row justify-content-between">
                        <div className="col-4">Phí</div>
                        <div className="col-4">Miễn Phí</div>
                      </div>
                      <div className="row justify-content-between mt-3">
                        <div className="col-4 fw-bold">Tổng cộng</div>
                        <div className="col-4 fw-bold">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(this.state.listDetails.totalPrice)}
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.state.listDetails.note ? (
                    <div className="my-sm-5 text-center note_detail">
                      <i className="fa-solid fa-asterisk"></i>
                      <span className="fw-bold text-decoration-underline">
                        {" "}
                        Ghi Chú:
                      </span>{" "}
                      {this.state.listDetails.note}
                    </div>
                  ) : null}
                </div>
                {this.props.user !== null ? (
                  <div className="col-sm-12 col-lg-5 ms-sm-4 detail_user">
                    <h1 className="mb-4 text-capitalize text-center">
                      Thông tin đặt hàng
                    </h1>
                    <h4>Họ Tên: {this.props.user.fullname}</h4>
                    <h4>Giới tính: {this.props.user.gender ? "Nam" : "Nữ"}</h4>
                    <h4>Địa chỉ: {this.props.user.address}</h4>
                    <h4>Email: {this.props.user.email}</h4>
                    <h4>SĐT: {this.props.user.phone}</h4>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
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
