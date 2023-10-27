import React from "react";
import { Fragment } from "react";
import SideBar from "./sideBar";
import "./dashBoard.css";
import { connect } from "react-redux";
import moment from "moment";
import {
  getAllOrders,
  getAllUsers,
  getIdProducts,
} from "../../store/actions/adminAction";
import { fetchProducts } from "../../store/actions/productsAction";
import { toast } from "react-toastify";
import Toast from "../home/toast";

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
      revenue: 0,
      // products: this.props.admin.idproducts.length,
      // users: [],
    };
  }

  customOrder = () => {
    const custom = this.props.admin.orders.reduce((result, product) => {
      const mdh = product.id;
      if (!result[mdh]) {
        result[mdh] = [];
      }
      result[mdh].push(product);
      return result;
    }, {});
    this.setState({ order: custom }, () => {
      Object.entries(this.state.order).map(([key, value]) => {
        this.setState((prev) => ({
          revenue: prev.revenue + value[0].totalPrice,
        }));
      });
    });
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.admin.allusers === undefined) {
      this.props.adAllUsers();
    }
    if (prevProps.admin.orders !== this.props.admin.orders) {
      this.customOrder();
    }
  };

  async componentDidMount() {
    await this.props.adOrders();
    await this.props.adProducts();
    await this.props.adUsers();
    await this.props.adAllUsers();
  }
  render() {
    return (
      <Fragment>
        <div className="row ad_dash">
          <SideBar />
          <div className="main_side col-8 mt-4">
            <h1 className="ad_dashtitle">swans lux</h1>
            <div>Ngày: {moment(Date.now()).format("DD.MM.YYYY")}</div>
            <div className="row justify-content-around mt-5">
              <div className="mb-sm-4 mb-lg-0 col-sm-11 col-lg-3 ad_card">
                <div className="row justify-content-between">
                  <p className="col-8 me-0 pt-1">Tổng sản phẩm</p>
                  <div className="col-3 ad_dashicon">
                    <i className="fa-solid fa-truck"></i>
                  </div>
                </div>
                <h2 className="text-center fw-bold">
                  {this.props.admin && this.props.admin.idproducts.length}
                </h2>
              </div>
              <div className="mb-sm-4 mb-lg-0 col-sm-11 col-lg-3 ad_card">
                <div className="row justify-content-between">
                  <p className="col-7 me-0 pt-1">Số người dùng</p>
                  <div className="col-3 ad_dashicon">
                    <i className="fa-solid fa-users"></i>
                  </div>
                </div>
                <h2 className="text-center fw-bold">
                  <h2 className="text-center fw-bold">
                    {this.props.admin && this.props.admin.allusers
                      ? this.props.admin.allusers.length
                      : "Loading..."}
                  </h2>
                </h2>
              </div>
            </div>
            <div className="row justify-content-around mt-5">
              <div className="mb-sm-4 mb-lg-0 col-sm-11 col-lg-3 ad_card">
                <div className="row justify-content-between">
                  <p className="col-7 me-0 pt-1">Tổng đơn hàng</p>
                  <div className="col-3 ad_dashicon">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </div>
                </div>
                <h2 className="text-center fw-bold">
                  {Object.keys(this.state.order).length}
                </h2>
              </div>
              <div className="mb-sm-4 mb-lg-0 col-sm-11 col-lg-3 ad_card">
                <div className="row justify-content-between">
                  <p className="col-8 me-0 pt-1">Tổng doanh thu</p>
                  <div className="col-3 ad_dashicon">
                    <i className="fa-solid fa-hand-holding-dollar"></i>
                  </div>
                </div>
                <h2 className="text-center fw-bold mt-2">
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(this.state.revenue)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    products: state.getAllProducts.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    adOrders: () => dispatch(getAllOrders()),
    adProducts: () => dispatch(fetchProducts()),
    adUsers: () => dispatch(getIdProducts()),
    adAllUsers: () => dispatch(getAllUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
