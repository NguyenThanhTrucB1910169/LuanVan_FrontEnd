import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getOrderByUser,
  detailOrder,
  getOrderDeliver,
} from "../../store/actions/orderAction";
import { changeStatusOrder } from "../../store/actions/adminAction";
import "./viewOrders.css";
import moment from "moment";
import Footer from "../home/footer";
import { toast } from "react-toastify";
import Toast from "../home/toast";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getDetailProduct } from "../../store/actions/orderAction";
import Loading from "../layouts/loading";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Header from "../home/header";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorIcon from "@mui/icons-material/Error";
import FmdBadIcon from "@mui/icons-material/FmdBad";

class ViewOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetail: {},
      listOrders: [],
      isUpdate: null,
      detailArray: {},

      showAt: 0,
      option: false,
      openDialog: {},
      // listNotExist: {},
      // showMore: {},
    };
    this.myElementRef = React.createRef();
  }
  componentDidMount = () => {
    this.props.viewAllOrders();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.orders !== this.props.orders) {
      this.setState({ listOrders: this.props.orders });
    }
  };

  updateStatus = async (id, currentstatus) => {
    if (currentstatus === 1) {
      await this.props.updateStatusOrder(id, 2).then(() => {
        toast.success(<Toast message="Xác nhận nhận hàng." />, {
          className: "success",
        });
      });
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

  handleCancel = async (id, currentstatus) => {
    if (currentstatus === 0) {
      await this.props.updateStatusOrder(id, 3).then(() => {
        toast.success(<Toast message="Hủy đơn hàng thành công." />, {
          className: "success",
        });
        this.setState((prevState) => ({
          openDialog: {
            ...prevState.openDialog,
            [id]: false,
          },
        }));
      });
    } else {
      toast.warning(<Toast message="Không thể hủy đơn" />, {
        className: "warning",
      });
    }
  };

  showDetail = (id) => {
    this.setState({
      isDetail: {
        ...this.state.isDetail,
        [id]: !this.state.isDetail[id],
      },
    });
    this.props.getOrderById(id).then(() => {
      if (Object.keys(this.props.detail).length > 0) {
        var { OrderItems, ...rest } = this.props.detail;
        // if (this.props.detail.length > 0) {
        // var filteredItems = this.props.detail.filter(
        //   (item) => item.id === id
        // );
        if (OrderItems.length > 2) {
          OrderItems = OrderItems.slice(0, 2);
        }
        this.setState(
          (prevState) => ({
            detailArray: {
              ...prevState.detailArray,
              [id]: { rest, detailProducts: OrderItems },
            },
          }),
          () => {
            console.log("this.state.detailArray ", this.state.detailArray);
            console.log("this.state.listOrders ", this.state.listOrders);
          }
        );
        // }
        // if (this.props.detail.idNotExists.length > 0) {
        //   this.setState((prevState) => ({
        //     listNotExist: {
        //       ...prevState.listNotExist,
        //       [id]: this.props.detail.idNotExists,
        //     },
        //   }));
        // } else {
        //   this.setState((prevState) => ({
        //     listNotExist: {
        //       ...prevState.listNotExist,
        //       [id]: [],
        //     },
        //   }));
        // }
      }
    });
  };

  showOption = (op) => {
    this.setState({ option: op });
  };

  render() {
    return (
      <Fragment>
        <Header type={0} option={this.showOption} />
        <div
          className={`container view_order_contain ${
            this.state.option ? "add_padding" : ""
          }`}
        >
          <div className="d-flex justify-content-center row">
            {this.state.listOrders.length > 0 ? (
              <div className="col-md-10 col-xl-10">
                <div className="his_order">
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
                  {this.state.listOrders.length > 0
                    ? this.state.listOrders.map((order, index) => (
                        <div
                          className={`order_card ${
                            this.state.isDetail[order.id] ? "" : "trans_effect"
                          }`}
                          key={order.id}
                        >
                          <div
                            className={`row justify-content-between div_order ${
                              this.state.isDetail[order.id] ? "pb-4" : ""
                            }`}
                          >
                            <div className="col-1">#S{order.id}</div>
                            <div className="col-3">
                              {this.props.user.fullname}
                            </div>
                            <div className="col-sm-2 col-3">
                              {order.status === 0 ? (
                                <span className="wait">Đã Đặt.</span>
                              ) : order.status === 1 ? (
                                <span className="delivery">Chờ nhận hàng.</span>
                              ) : order.status === 2 ? (
                                <span className="complete_btn">Đã Nhận.</span>
                              ) : order.status === 3 ? (
                                <span className="cancel">Đã Hủy.</span>
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
                            <div className="col-1">
                              <button
                                className={`detail_order ${
                                  this.state.isDetail[order.id]
                                    ? "d-none"
                                    : "d-block"
                                }`}
                                onClick={() => this.showDetail(order.id)}
                              >
                                <ArrowDropDownIcon />
                              </button>
                            </div>
                          </div>
                          <div
                            className={`frame_detail ${
                              this.state.isDetail[order.id] ? "display" : ""
                            }`}
                          >
                            <div className="h_frame_detail" key={order.id}>
                              {this.state.isDetail[order.id] &&
                              this.state.detailArray[order.id] &&
                              this.state.detailArray[order.id].detailProducts
                                ? this.state.detailArray[
                                    order.id
                                  ].detailProducts.map((item, index) => (
                                    <div>
                                      <div className="row justify-content-between m-0 mt-4">
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
                                        <div className="col-6 text-start">
                                          {/* <p>
                                            #<span>{item.id}</span>
                                          </p> */}
                                          <p className="title_pd">
                                            {item.name}
                                          </p>
                                          <p
                                            className=""
                                            style={{ fontSize: "17px" }}
                                          >
                                            {" "}
                                            {Intl.NumberFormat("vi-VN", {
                                              style: "currency",
                                              currency: "VND",
                                            }).format(item.price)}
                                            <span
                                              style={{
                                                fontWeight: "700",
                                                fontSize: "14px",
                                              }}
                                            >
                                              {" "}
                                              x
                                            </span>{" "}
                                            <span>{item.quantity}</span>
                                          </p>
                                        </div>
                                        <div className="col-4 text-end pt-4">
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
                                            }).format(
                                              item.price * item.quantity
                                            )}
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                : null}
                              {/* return item.Products !== null &&
                                      Object.keys(item.Products).length > 0 ? ( */}
                              {/* ) : null; */}
                              {/* {this.state.isDetail[order.id] &&
                              this.state.listNotExist[order.id]
                                ? this.state.listNotExist[order.id].map(
                                    (item, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className="id_not_exist"
                                        >
                                          <FmdBadIcon
                                            className="d-inline-block"
                                            style={{
                                              color: "red",
                                              margin: "0 7px 3px 0",
                                            }}
                                          />

                                          {order.status === 0
                                            ? ` Sản phẩm ${item} mà bạn đang đặt hàng
                                      hiện không còn bán tại cửa hàng
                                      của chúng tôi. Chúng tôi rất tiếc về sự
                                      bất tiện này. Cảm ơn bạn đã ủng hộ chúng
                                      tôi.`
                                            : order.status === 1
                                            ? ` Sản phẩm có mã ${item} trong đơn hàng của bạn đang
                                           được giao đến bạn. Tuy nhiên, chúng tôi muốn thông báo 
                                           rằng sản phẩm này hiện không còn sẵn có trong cửa hàng 
                                           của chúng tôi và không thể hiển thị chi tiết sản phẩm.
                                            Chúng tôi rất xin lỗi về sự bất tiện này và 
                                            cảm ơn bạn đã ủng hộ cửa hàng của chúng tôi.`
                                            : order.status === 2
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
                                      );
                                    }
                                  )
                                : null} */}
                            </div>
                            <div className="row justify-content-between">
                              <div className="col-6">
                                <div className="btn_group_confirm">
                                  <button
                                    className="btn_recieved"
                                    disabled={
                                      order.status === 0
                                        ? true
                                        : order.status === 1
                                        ? false
                                        : order.status === 2
                                        ? true
                                        : true
                                    }
                                    onClick={() =>
                                      this.updateStatus(order.id, order.status)
                                    }
                                  >
                                    Đã nhận hàng
                                  </button>
                                  <div className="d-inline-block">
                                    <button
                                      className="btn_cancel"
                                      disabled={
                                        order.status === 0
                                          ? false
                                          : order.status === 1
                                          ? true
                                          : order.status === 2
                                          ? true
                                          : true
                                      }
                                      onClick={() =>
                                        this.setState((prevState) => ({
                                          openDialog: {
                                            ...prevState.openDialog,
                                            [order.id]: true,
                                          },
                                        }))
                                      }
                                    >
                                      Hủy đơn
                                    </button>
                                    <Dialog
                                      open={this.state.openDialog[order.id]}
                                      onClose={() =>
                                        this.setState((prevState) => ({
                                          openDialog: {
                                            ...prevState.openDialog,
                                            [order.id]: false,
                                          },
                                        }))
                                      }
                                    >
                                      <DialogTitle>Xác nhận</DialogTitle>
                                      <DialogContent>
                                        <DialogContentText>
                                          Bạn có chắc muốn hủy đơn hàng này?
                                        </DialogContentText>
                                      </DialogContent>
                                      <DialogActions>
                                        <Button
                                          onClick={() =>
                                            this.setState((prevState) => ({
                                              openDialog: {
                                                ...prevState.openDialog,
                                                [order.id]: false,
                                              },
                                            }))
                                          }
                                          color="primary"
                                        >
                                          No
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            this.handleCancel(
                                              order.id,
                                              order.status
                                            )
                                          }
                                          color="primary"
                                        >
                                          Yes
                                        </Button>
                                      </DialogActions>
                                    </Dialog>
                                  </div>
                                </div>
                              </div>
                              <div className="col-5">
                                <div className="more_dsp text-end mb-3">
                                  <Link to="/detailorder">
                                    Xem chi tiết
                                    <NavigateNextIcon />
                                  </Link>
                                </div>
                                <div
                                  className="d-flex pb-3 me-2"
                                  style={{ justifyContent: "end" }}
                                >
                                  <button
                                    className={`btn_hide ${
                                      this.state.isDetail[order.id]
                                        ? "d-block"
                                        : "d-none"
                                    }`}
                                    onClick={() => this.showDetail(order.id)}
                                  >
                                    <span>Ẩn bớt</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            ) : (
              <div className="text-capitalize listorder_empty">
                <ErrorIcon className="no_order_icon" />
                Không có lịch sử đặt hàng
              </div>
            )}
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
    detail: state.orderInfo.detail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewAllOrders: () => dispatch(getOrderByUser()),
    updateStatusOrder: (id, status) => dispatch(changeStatusOrder(id, status)),
    reloadDeliver: () => dispatch(getOrderDeliver()),
    getOrderById: (id) => dispatch(getDetailProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrders);
