import React from "react";
import "./cartItem.css";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listImages: [],
      quantity: 1,
    };
  }

  configImage = (images) => {
    if (images) {
      var myArrayImages = images.split(",");
      this.setState({
        listImages: myArrayImages,
      });
    }
  };

  handleIncrease = () => {
    this.props.handleIncrease(this.props.eachProduct.productId);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.quantity !== this.state.quantity) {
      this.props.updateQuantity(
        this.state.quantity,
        this.props.eachProduct.productId
      );
    }
  };

  componentDidMount = () => {
    // console.log(this.props.eachProduct.productImage.split(','))
    this.configImage(this.props.eachProduct.productImage);
  };

  render() {
    return (
      <div className="card mb-3 item">
        <div className="card-body item-body">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center col-6">
              <div>
                <img
                  src={this.state.listImages[2]}
                  className="img-fluid rounded-3"
                  alt="Shopping item"
                  style={{ width: "65px" }}
                />
              </div>
              <div className="ms-3">
                <h5>{this.props.eachProduct.productName}</h5>
                <p className="small mb-0">{this.props.eachProduct.productType}</p>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center col-6 justify-content-around">
              <div className="quantity-cart col-4">
                {/* <h5 className="">2</h5> */}
                <button
                  className="quantity-change"
                  onClick={() => {
                    if (this.props.eachProduct.quantity === 1)
                      console.log("cant decrease");
                    else this.setState({ quantity: this.props.eachProduct.quantity - 1 });
                  }}
                >
                  -
                </button>
                <input
                  className="fw-bold text-black mb-0"
                  min="0"
                  name="quantity"
                  value={this.props.eachProduct.quantity}
                  type="number"
                  onChange={(e) => {
                    this.setState({ quantity: parseInt(e.target.value) });
                  }}
                />
                <button
                  className="quantity-change"
                  onClick={
                    () => {
                      this.setState({
                        quantity: this.props.eachProduct.quantity + 1,
                      });
                    }
                    // this.handleIncrease
                  }
                >
                  +
                </button>
              </div>
              <div style={{ width: "110px" }} className="col-6">
                <h5 className="mb-0">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.props.eachProduct.productPrice)}</h5>
              </div>
              <button className="btn-remove" onClick = {() => {
                this.props.removeItem(this.props.eachProduct.productId)
              }}>
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
