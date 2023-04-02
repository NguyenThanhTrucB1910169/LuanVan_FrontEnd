import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderByUser, detailOrder } from "../../store/actions/orderAction";
import './viewOrders.css'
import moment from "moment";
import SubHeader from "../layouts/subHeader";
import Footer from "../home/footer";

class ViewOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetail: false,
    };
    this.myElementRef = React.createRef();
  }
  componentDidMount = () => {
    this.props.viewAllOrders();
  };

  showDetail = (id) => {
    this.setState((prev) => ({
      isDetail: !prev.isDetail,
    }));
    console.log(id);
    // this.props.detailOrder(id)
  };
  render() {
    console.log(this.props.orders.length);
    return (
      <Fragment>
      <SubHeader />
        <div class="container mt-5 mb-5 ">
          <div class="d-flex justify-content-center row">
            <div class="col-md-8">
              <div class="his_order">
                <h1>Lịch sử đặt hàng</h1>
              </div>
              <div className="row justify-content-between list_title">
                <div className="fw-semibold col-2">Mã Đơn</div>
                <div className="fw-semibold col-3">Người đặt</div>
                <div className="fw-semibold col-2">Tình Trạng</div>
                <div className="fw-semibold col-2">Tổng đơn</div>
                <div className="fw-semibold col-2">Ngày đặt</div>
                <div className="col-1"></div>
              </div>
              <div className="list_order">
              {this.props.orders.map((order, index) => (
                
                  <div className="order_card" key={order.id}>
                    <div className="col-2">#S{order.id}</div>
                    <div className="col-3">{this.props.user}</div>
                    <div className="col-2">Đã Đặt</div>
                    <div className="col-2">{Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.totalPrice)}</div>
                    <div className="col-2">{moment.utc(order.createdAt).format('DD/MM/YYYY')}</div>
                    <div
                      className="col-1 detail_order"
                      onClick={() =>
                        this.setState((prev) => ({ isDetail: !prev.isDetail }))
                      }
                    >
                      <i className="fa-solid fa-ellipsis-vertical icon_detail"></i>
                    </div>
                    <div className="frame_detail">
                      <Link
                        to={{
                          pathname: "/detailorder",
                          params: { id: order.id},
                        }}
                      >
                        Xem chi tiết
                      </Link>
                      <button
                      >
                        Đã Nhận
                      </button>
                    </div>
                  </div>
               
              ))}
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
    user: state.login.user.fullname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewAllOrders: () => dispatch(getOrderByUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrders);
