import React from "react";
import { connect } from "react-redux";
import { Fragment } from "react";
import { withRouter } from "react-router-dom";
import StepLayout from "./stepLayout";
import CartReview from "../cart/cartReview";
import CartSummary from "../cart/cartSummary";
import "./orderConfirm.css";

class OrderConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNext = (page) => {
    this.props.handleNext(page);
  };

  order = (data) => {};

  render() {
    return (
      <Fragment>
        <StepLayout activeStep={1} />
        <div>
            <button className="btn_back_order" onClick={() => this.handleNext(1)}><i className="fa-solid fa-circle-left"></i></button>
        </div>
        <div className="order_confirm">
          <div className="col-7 confirm_info">
            <div className="order_info">
              <h1>
                <i class="fa-solid fa-info"></i>
                Thông tin giao hàng
              </h1>
              <p>Họ tên: {this.props.info.fullname}</p>
              <p>Địa chỉ: {this.props.info.address}</p>
              <p>Số điện thoại: {this.props.info.phone}</p>
            </div>
            <div className="order_note">
              <label htmlFor="note" className="label_note">
                <i className="fa-regular fa-comment"></i>Ghi chú
              </label>
              <textarea
                name="note"
                id=""
                cols="25"
                rows="5"
                className="text_note"
                placeholder="write here"
                onChange={(e) => this.props.notes(e.target.value)}
              ></textarea>
            </div>
            <div className="order_review">
              <CartReview cart={this.props.cartInfo} />
            </div>
          </div>
          <div className="col-3 confirm_sum">
            <CartSummary
              product={this.props.cartInfo.cartItem}
              checkout={true}
              pay={this.handleNext}
              order={(isactive) => this.props.submit(isactive)}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default OrderConfirm;
