import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderByUser, detailOrder } from "../../store/actions/orderAction";
import './viewOrders.css'

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
        <div class="container mt-5 mb-5">
          <div class="d-flex justify-content-center row">
            <div class="col-md-8">
              <div class="p-2">
                <h1>Lịch sử đặt hàng</h1>
              </div>
              <div className="row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                <div className="col-2">Mã Đơn</div>
                <div className="col-2">Người đặt</div>
                <div className="col-2">Tình Trạng</div>
                <div className="col-2">Tổng đơn</div>
                <div className="col-3">Ngày đặt</div>
              </div>
              {this.props.orders.map((order, index) => (
                <div>
                  <div className="order_card" key={order.id}>
                    <div className="col-2">#S{order.id}</div>
                    <div className="col-2">{this.props.user}</div>
                    <div className="col-2">Đã Đặt</div>
                    <div className="col-2">{order.totalPrice}</div>
                    <div className="col-3">{order.createdAt}</div>
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
