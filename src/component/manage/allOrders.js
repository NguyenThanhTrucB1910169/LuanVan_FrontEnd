import React, { Fragment } from "react";
import SideBar from "./sideBar";
import { connect } from "react-redux";
import { getAllOrders } from "../../store/actions/adminAction";
import moment from "moment";
import './allOrders.css'

class AllOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      open: [],
      total: {}
    };
  }

  clickDetail = (id) => {
    if(this.state.open.includes(id)) {
        this.setState(prevState => ({
            open: prevState.open.filter(number => number !== id)
          }));
    }
    else this.setState((prev) => ({open: [...prev.open, id]}));
  }

  componentDidMount = () => {
    this.props.getAllOrders();
    if (this.props.allOrders) {
      const custom = this.props.allOrders.reduce((result, product) => {
        const mdh = product.id;
        if (!result[mdh]) {
          result[mdh] = [];
        }
        result[mdh].push(product);
        // console.log(product)
        return result;
      }, {});
      //   Object.entries(custom);
      this.setState({ order: custom }, () => {
        Object.entries(this.state.order).map(([key, value]) => {
            var price = 0;
            value.map((item) => price += item.quantity)
            this.setState(prev => ({
                total: {...prev.total, [key]: price}
            }))
      })
      });
      
    }
  };

  render() {
    return (
      <Fragment>
        <SideBar />
        <div className="col-7 main_side">
          <h1 className="text-uppercase text-center my-4">tất cả đơn hàng</h1>
          <div className="row ad_pdhead">
            <div className="col-2">Mã Đơn</div>
            <div className="col-3">Người Đặt</div>
            <div className="col-2">Tổng Đơn</div>
            <div className="col-3 text-center">Ngày đặt</div>
            <div className="col-2 text-end">Chi Tiết</div>
          </div>
          <div>
            {this.state.order !== null ? (
              Object.entries(this.state.order).map(([key, value]) => (
                <div>
                  <div key={key} className="ad_itempd">
                    <div className="row">
                      <div className="col-2 text-center">#S{key}</div>
                      <div className="col-3">{value[0].fullname}</div>
                      <div className="col-2">
                        <div>
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(value[0].totalPrice)}
                        </div>
                      </div>
                      <div className="col-3 text-center">
                        {moment.utc(value[0].createdAt).format("DD/MM/YYYY")}
                      </div>
                      <div className="col-2 text-end">
                      <button onClick={() => this.clickDetail(key)} className="btn_ad_detail">
                        {this.state.open.includes(key) ? (<i class="fa-solid fa-angle-up"></i>) : ( <i class="fa-solid fa-angle-down"></i>)}
                      </button>
                      </div>
                    </div>
                    <div className={`detail_frame ${this.state.open.includes(key) ? 'd-block': 'd-none'}`}>
                      <div className="row ad_detail_title">
                        <div className="col-6">Tổng Số Sản Phẩm {this.state.total[key]}</div>
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
                              <td scope="row">
                                {pd.productId}
                              </td>
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
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Không có đơn hàng</div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
