import React from "react";
import "./cartItem.css";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listImages: [],
      quantity: this.props.eachProduct.quantity,
    };
  }

  configImage = (images) => {
    // console.log(images);
    if (images) {
      var myArrayImages = images.split(",");
      this.setState({
        listImages: myArrayImages,
      });
    }
  };

  handleDecrease = (cart_id) => {
    console.log(cart_id);
    let new_qt = this.props.eachProduct.quantity + 1;
    this.props.update({id: cart_id, qt: new_qt})
  }

  handleIncrease = (cart_id) => {
    console.log(cart_id);
    this.setState({qt: this.props.quantity})
    // let new_qt = this.props.eachProduct.quantity - 1;
    // this.props.update({id: cart_id, qt: new_qt})
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.quantity !== this.state.quantity) {
      this.props.update(
        {qt: this.state.quantity,
        pd: this.props.eachProduct.productId}
      );
    }
  };

  componentDidMount = () => {
    // console.log(this.props.eachProduct.productImage.split(','))
    this.configImage(this.props.eachProduct.image);
  };

  render() {
    return (
      <div className="card mb-3 item">
        <div className="card-body item-body">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center col-6">
              <div>
                <img
                  src={this.state.listImages[1]}
                  className="img-fluid rounded-3"
                  alt="Shopping item"
                  style={{ width: "65px" }}
                />
              </div>
              <div className="ms-3">
                <h5>{this.props.eachProduct.name}</h5>
                <p className="small mb-0">
                  Giá:{" "}
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(this.props.eachProduct.price)}
                </p>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center col-6 justify-content-around">
              <div className="quantity-cart col-4">
                {/* <h5 className="">2</h5> */}
                <button
                  className="quantity-change"
                  onClick={ 
                    // this.handleDecrease(this.props.eachProduct.productId)
                    () => {
                    if (this.state.quantity === 1)
                      console.log("cant decrease");
                    else
                      this.setState({
                        quantity: this.state.quantity - 1,
                      });
                  }
                  }
                >
                  -
                </button>
                <div
                  className="fw-bold text-black mb-0 d-inline-block"
                  // min="0"
                  // name="quantity"
                  // value=
                  // type="number"
                  // onChange={(e) => {
                  //   this.setState({ quantity: parseInt(e.target.value) });
                  // }}
                >{this.props.eachProduct.quantity}</div>
                <button
                  className="quantity-change"
                  onClick=
                    {
                  
                    () => {
                      this.setState({
                        quantity: this.state.quantity + 1,
                      });
                    }
                    }
                >
                  +
                </button>
              </div>
              <div style={{ width: "110px" }} className="col-6">
                <h5 className="mb-0">
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    this.props.eachProduct.price *
                      this.props.eachProduct.quantity
                  )}
                </h5>
              </div>
              <button
                className="btn-remove"
                onClick={() => {
                  this.props.removeItem(this.props.eachProduct.productId);
                }}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
