import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./cartSummary.css";
class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listProducts: [],
      total: 0,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.product !== this.props.product) {
      let price = 0;
      this.props.product.map((product) => {
        price += product.price * product.quantity     
      }
      );
      this.setState({
        total: price,
      })
    }
  };

  componentDidMount = () => {
    let price = 0;
    this.props.product.map((product) => {
      price += product.price * product.quantity     
    }
    );
    this.setState({
      total: price,
    })
  };

  render() {
    return (
      <div className="card mb-4 font_sum">
        <div className="card-header py-3 sum-head text-center">
          <h5 className="mb-0">Tổng Đơn</h5>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
              Tổng Sản Phẩm
                  <span>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.state.total)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
              Phí vận chuyển
              <span>Miễn Phí</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
              <div>
                <strong>Tổng Đơn</strong>
                <strong>
                  <p className="mb-0">(Bao gồm thuế)</p>
                </strong>
              </div>
              <span>
                <strong>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.state.total)}</strong>
              </span>
            </li>
          </ul>
          <div className="text-center">
          <button className="btn_order" onClick={() => this.props.history.push('/order')}>
            Đặt hàng
          </button>
          </div>
          
        </div>
      </div>
      //   </div>
    );
  }
}


export default withRouter(CartSummary)
