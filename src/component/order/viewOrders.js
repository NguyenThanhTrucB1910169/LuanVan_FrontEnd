import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderByUser, detailOrder } from "../../store/actions/orderAction";
import { changeStatusOrder } from "../../store/actions/adminAction";
import "./viewOrders.css";
import moment from "moment";
import SubHeader from "../layouts/subHeader";
import Footer from "../home/footer";
import { toast } from "react-toastify";
import Toast from "../home/toast";

class ViewOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetail: false,
      listOrders: [],
      isUpdate: null,
    };
    this.myElementRef = React.createRef();
  }
  componentDidMount = () => {
    this.props.viewAllOrders();
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.orders !== this.props.orders) {
      this.setState({ listOrders: this.props.orders });
    }
  };

  updateStatus = (id, currentstatus) => {
    if (currentstatus === 1) {
      this.props.updateStatusOrder(id, 2);
    } else if (currentstatus === 2) {
      toast.warning(<Toast message="Đã xác nhận đơn" />, {
        className: "warning",
      });
    } else {
      toast.warning(<Toast message="Đang chờ xử lý" />, {
        className: "warning",
      });
    }
  };

  showDetail = (id) => {
    this.setState((prev) => ({
      isDetail: !prev.isDetail,
    }));
    console.log(id);
    // this.props.detailOrder(id)
  };
  render() {
    // console.log(this.props.orders);
    return (
      <Fragment>
        <SubHeader />
        <div class="container mt-5 mb-5 ">
          <div class="d-flex justify-content-center row">
            <div class="col-md-10 col-xl-8">
              <div class="his_order">
                <h1>Lịch sử đặt hàng</h1>
              </div>
              <div className="row justify-content-between list_title">
                <div className="fw-semibold col-1">Mã Đơn</div>
                <div className="fw-semibold col-3">Người đặt</div>
                <div className="fw-semibold col-sm-2 col-3">Tình Trạng</div>
                <div className="fw-semibold col-sm-3 col-2">Tổng đơn</div>
                <div className="fw-semibold col-2">Ngày đặt</div>
                <div className="col-1"></div>
              </div>
              <div className="list_order">
                {this.state.listOrders.length > 0 && this.props.user !== null ? (
                  this.state.listOrders.map((order, index) => (
                    <div className="order_card" key={order.id}>
                      <div className="col-1">#S{order.id}</div>
                      <div className="col-3">{this.props.user.fullname}</div>
                      {/* {order.status ? ( */}
                      <div className="col-sm-2 col-3">
                        {order.status === 0 ? (
                          <span>
                            Đã Đặt.{" "}
                            <span className="d-block"> Đang chờ xử lý...</span>
                          </span>
                        ) : order.status === 1 ? (
                          "Đang giao"
                        ) : order.status === 2 ? (
                          "Đã Nhận"
                        ) : (
                          ""
                        )}
                      </div>
                      {/* ) : null} */}
                      <div className="col-sm-3 col-2">
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(order.totalPrice)}
                      </div>
                      <div className="col-2">
                        {moment.utc(order.createdAt).format("DD/MM/YYYY")}
                      </div>
                      <div
                        className="col-1 detail_order"
                        onClick={() =>
                          this.setState((prev) => ({
                            isDetail: !prev.isDetail,
                          }))
                        }
                      >
                        <i className="fa-solid fa-ellipsis-vertical icon_detail"></i>
                      </div>
                      <div className="frame_detail">
                        <Link
                          to={{
                            pathname: "/detailorder",
                            params: { id: order.id },
                          }}
                        >
                          Xem chi tiết
                        </Link>
                        <button
                          onClick={() =>
                            this.updateStatus(order.id, order.status)
                          }
                        >
                          Đã Nhận
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-capitalize listorder_empty">
                    Không có lịch sử đặt hàng
                  </div>
                )}
              </div>
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
    orders: state.orderInfo.listOrder,
    user: state.login.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewAllOrders: () => dispatch(getOrderByUser()),
    updateStatusOrder: (id, status) => dispatch(changeStatusOrder(id, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrders);
