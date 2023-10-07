import React from "react";
import { Fragment } from "react";
import "./cartReview.css";

class CartReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listImages: [],
      totalPrice: 0,
      totalQuantity: 0,
    };
  }

  componentWillMount = () => {
    this.props.cart.cartItem.map((item, index) => {
      var myArrayImages = item.image.split(",");
      var total1 = total1 + item.price * item.quantity;
      var total2 = total2 + item.quantity;
      this.setState({
        totalPrice: total1,
        totalQuantity: total2,
      });
      this.setState(
        (prev) => ({
          listImages: { ...prev.listImages, [index]: myArrayImages },
        }),
        () => {}
      );
    });
  };

  render() {
    return (
      <Fragment>
        <h1 className="text-center my-5 review_title">
          <i class="fa-regular fa-clipboard"></i>
          Chi Tiết Đơn Hàng
        </h1>

        <div className="review_pd">
          {this.props.cart.cartItem.map((item, index) => (
            <div
              className="row mb-4 justify-content-between align-items-center"
              key={index}
            >
              <div className="col-md-3 col-lg-3 col-xl-2">
                <img
                  src={`http://localhost:3005/uploads/${this.state.listImages[index][2]}`}
                  className="rounded-4"
                />
              </div>
              <div className="col-md-3 col-lg-3 col-xl-7">
                <h6 className="text-muted review_name">{item.name}</h6>
                <p className="text-black mb-0">
                  Giá:{" "}
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.price)}{" "}
                  x {item.quantity}SL
                </p>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-2">
                <ps>
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.price * item.quantity)}
                </ps>
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default CartReview;
