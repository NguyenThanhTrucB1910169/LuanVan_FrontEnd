import React from "react";
import { Fragment } from "react";
import "./productCard.css";

class ProductCard extends React.Component {
  render() {
    return (
      <Fragment>
        <div
          className="m-3 product-card"
          style={{ backgroundImage: `url("${this.props.cardItem.image}")` }}
        >
          <div className="product_hover">
            <div className="card">
              <div className="row img-slide">
                <span className="col-1 text-center">
                  <i className="fa fa-angle-left"></i>
                </span>
                <div className="col-10 p-0">
                  <img src="./pd-2.webp" className="h-100"/>
                </div>
                <span className="col-1 text-center">
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </div>
              <div className="mt-3">
                <h4 className="text-center">{this.props.cardItem.name}</h4>
              </div>
              <button className="row add-btn">
                <div className="col-9 h-100 text-start">
                  <p>
                    <span id="price">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.props.cardItem.price)}</span>
                  </p>
                </div>
                <div className="col-3 h-100 add-icon">
                  <i className="fa-solid fa-cart-plus"></i>
                </div>
              </button>
              <div className="text-end">
                <button className="button-detail">
                  Chi tiết
                  <i className="ms-1 fa-solid fa-angles-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ProductCard;
