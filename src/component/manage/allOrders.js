import React, { Fragment } from "react";
import SideBar from "./sideBar";
import { connect } from "react-redux";
import {
  getAllOrders,
  changeStatusOrder,
} from "../../store/actions/adminAction";
// import { updateStatus } from "../../store/actions/adminAction";
import moment from "moment";
import "./allOrders.css";
import { toast } from "react-toastify";
import Toast from "../home/toast";
import RoomIcon from "@mui/icons-material/Room";
import SearchOffIcon from "@mui/icons-material/SearchOff";

class AllOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      open: [],
      total: {},
      filter: 5,
      filteredOrder: [],
      // placed: 0,
      // deliver: 0,
      // recieve: 0,
    };
  }

  clickDetail = (id) => {
    if (this.state.open.includes(id)) {
      this.setState((prevState) => ({
        open: prevState.open.filter((number) => number !== id),
      }));
    } else this.setState((prev) => ({ open: [...prev.open, id] }));
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.allOrders !== this.props.allOrders) {
      const custom = this.props.allOrders.reduce((result, product) => {
        const mdh = product.id;
        if (!result[mdh]) {
          result[mdh] = [];
        }
        result[mdh].push(product);
        return result;
      }, {});
      this.setState({ order: custom, filteredOrder: custom }, () => {
        Object.entries(this.state.order).map(([key, value]) => {
          // console.log(value);
          var price = 0;
          // var placed= value.filter((item) => item.status === 0).length;
          // var deliver= value.filter((item) => item.status === 1).length;
          // var recieve= value.filter((item) => item.status === 2).length

          value.map((item) => (price += item.quantity));
          this.setState((prev) => ({
            total: { ...prev.total, [key]: price },
            // placed: value.filter((item) => item.status === 0).length
          }));
        });
      });
    }
  };

  componentDidMount = () => {
    this.props.getAllOrders();
  };

  setStatusOrder = async (id, currentStatus) => {
    if (currentStatus === 0) {
      await this.props.setStatusOrder(id, 1);
      toast.success(<Toast message="Giao hàng thành công" />, {
        className: "success",
      });
    } else if (currentStatus === 1) {
      toast.warning(<Toast message="Đơn hàng đang giao" />, {
        className: "warning",
      });
    } else if (currentStatus === 3) {
      toast.warning(<Toast message="Đơn hàng đã hủy" />, {
        className: "warning",
      });
    } else {
      toast.warning(<Toast message="Giao hàng hoàn tất" />, {
        className: "warning",
      });
    }
  };

  handleFilter = (e) => {
    const selectedFilter = parseInt(e.target.value);
    console.log("selectedFilter ", selectedFilter);
    console.log("this.state.order ", this.state.order);
    // Lọc danh sách đơn hàng dựa trên giá trị được chọn
    const filteredOrders = Object.values(this.state.order).filter((order) => {
      console.log("order ", order[0].status);
      switch (selectedFilter) {
        case 0:
          return order[0].status === 0;
        case 1:
          return order[0].status === 1;
        case 2:
          return order[0].status === 2;
        case 3:
          return order[0].status === 3;
        case 5:
          return true; // Chọn "Tất cả đơn hàng" - trả về tất cả đơn hàng
        default:
          return true;
      }
    });

    this.setState(
      { filter: selectedFilter, filteredOrder: filteredOrders },
      () => {
        console.log("filteredOrders ", filteredOrders);
      }
    );
  };

  render() {
    return (
      <Fragment>
        <SideBar />
        <div className="col-sm-7 col-lg-7 ms-sm-5 ms-lg-0 main_side">
          <h1 className="text-uppercase text-center my-4">tất cả đơn hàng</h1>
          <div className="stats row justify-content-between">
            <p className="col-5">
              Tổng số đơn hàng:{" "}
              {this.state.order !== null
                ? Object.entries(this.state.order).length
                : null}
            </p>
            <div className="col-5 text-end">
              <select
                name="order_filter"
                id=""
                className="filter_status"
                value={this.state.filter}
                onChange={(e) => this.handleFilter(e)}
              >
                <option value="0">Đã Đặt</option>
                <option value="1">Đang Giao</option>
                <option value="2">Hoàn Thành</option>
                <option value="3">Đã Hủy</option>
                <option value="5">Tất cả đơn hàng</option>
              </select>
            </div>
          </div>
          <div className="row ad_pdhead">
            <div className="col-2">Mã Đơn</div>
            <div className="col-sm-4 col-lg-3">Người Đặt</div>
            <div className="col-sm-4 col-lg-2">Tổng Đơn</div>
            <div className="col-lg-2">Tình trạng</div>
            <div className="d-sm-none d-lg-block col-2 text-center">
              Ngày đặt
            </div>
            <div className="col-1 text-end"></div>
          </div>
          <div>
            {this.state.filteredOrder !== null &&
            Object.entries(this.state.filteredOrder).length > 0 ? (
              Object.entries(this.state.filteredOrder).map(([key, value]) => (
                <div>
                  <div key={key} className={`ad_itempd`}>
                    <div className="row">
                      <div className="col-2 text-center">#S{key}</div>
                      <div className="col-sm-4 col-lg-3">
                        {value[0].fullname}
                      </div>
                      <div className="col-sm-4 col-lg-2">
                        <div>
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(value[0].totalPrice)}
                        </div>
                      </div>
                      <div
                        className={`col-lg-2 ${
                          value[0].status === 0
                            ? "sts_order_placed"
                            : value[0].status === 1
                            ? "sts_order_delivery"
                            : value[0].status === 2
                            ? "sts_order_received"
                            : value[0].status === 3
                            ? "sts_order_cancel"
                            : null
                        }`}
                      >
                        {value[0].status === 0
                          ? "Đã đặt hàng"
                          : value[0].status === 1
                          ? "Đang giao"
                          : value[0].status === 2
                          ? "Đã Nhận"
                          : value[0].status === 3
                          ? "Đã Hủy"
                          : ""}
                      </div>
                      <div className="d-sm-none d-lg-block col-2 text-center">
                        {moment.utc(value[0].createdAt).format("DD/MM/YYYY")}
                      </div>
                      <div className="col-1 text-end">
                        <button
                          onClick={() => this.clickDetail(key)}
                          className="btn_ad_detail"
                        >
                          {this.state.open.includes(key) ? (
                            <i className="fa-solid fa-angle-up"></i>
                          ) : (
                            <i className="fa-solid fa-angle-down"></i>
                          )}
                        </button>
                      </div>
                    </div>
                    <div
                      className={`detail_frame ${
                        this.state.open.includes(key) ? "d-block" : "d-none"
                      }`}
                    >
                      <div className="d-sm-block d-lg-none col-12 text-center">
                        Ngày đặt:{" "}
                        {moment.utc(value[0].createdAt).format("DD/MM/YYYY")}
                      </div>
                      <div className="row ad_detail_title">
                        <div className="col-6">
                          Tổng Số Sản Phẩm {this.state.total[key]}
                        </div>
                        <div className="col-5 phone">SĐT {value[0].phone}</div>
                      </div>
                      <table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Mã SP</th>
                            <th scope="col">Sản Phẩm</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Số Lượng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {value.map((pd, index) => (
                            <tr key={index}>
                              <td scope="row">{pd.productId}</td>
                              <td>{pd.name}</td>
                              <td>
                                {Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(pd.price)}
                              </td>
                              <td>{pd.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="add_user_contain">
                        <RoomIcon
                          style={{ fontSize: "20px", marginBottom: "3px" }}
                        />
                        <span
                          style={{
                            fontStyle: "italic",
                            fontWeight: "600",
                            fontFamily: '"Playpen Sans", cursive',
                          }}
                        >
                          Địa chỉ giao hàng:{" "}
                        </span>
                        <span> {value[0].address}</span>
                      </div>

                      <div className="ad_order_confirm">
                        <div className="col-sm-5 col-lg-4 ms-2">
                          {value[0].status === 0
                            ? "Đã đặt. Đang chờ duyệt đơn hàng."
                            : value[0].status === 1
                            ? "Đang giao đến khách hàng."
                            : value[0].status === 2
                            ? "Đã nhận hàng. Hoàn thành."
                            : value[0].status === 3
                            ? "Đơn hàng đã hủy"
                            : ""}
                        </div>
                        <div className="col-sm-5 col-lg-2">
                          <button
                            onClick={() =>
                              this.setStatusOrder(key, value[0].status)
                            }
                            className="ad_btn_order"
                            disabled={
                              value[0].status === 0
                                ? false
                                : value[0].status === 1
                                ? true
                                : value[0].status === 2
                                ? true
                                : value[0].status === 3
                                ? true
                                : true
                            }
                          >
                            Giao Hàng
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="search_not_allorders">
                <SearchOffIcon style={{ color: "red", marginRight: "1rem" }} />
                <span>Không có đơn hàng</span>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allOrders: state.admin.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrders: () => dispatch(getAllOrders()),
    setStatusOrder: (id, status) => dispatch(changeStatusOrder(id, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
