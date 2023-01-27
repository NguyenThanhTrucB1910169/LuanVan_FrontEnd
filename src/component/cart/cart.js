import React from "react";
import CartItem from "./cartItem";
import CartSummary from "./cartSummary";
import { Fragment } from "react";
import Footer from "../home/footer";
import "./cart.css";
import CartHeader from "./cartHeader";
import { connect } from "react-redux";
import {
  getCartItem,
  getProductInCart,
  updateCartAmount,
  removeItem,
} from "../../store/actions/cartAction";
import { Link } from "react-router-dom";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listProducts: [],
      quantity: 0,
    };
  }

  componentDidMount = async (e) => {
    // e.preventDefault();
    // let getToken = localStorage.getItem("isactive")
    // let token = JSON.parse(getToken).user
    // console.log(token)
    await this.props.getListItems();
    this.setState({
      listProducts: this.props.listProductInCart,
    });
    // console.log()
    // if()
    // this.setState({
    //   listProducts: this.props.listProductInCart
    // })
    // this.props.listProductInCart.map((product) => {
    //   this.props.loadProduct(product.productId)
    // })
  };

  updateCart = async (qt, id) => {
    await this.props.handleUpdate(id, qt);
  };

  removeItem = (id) => {
    this.props.remove(id);
  };

  render() {
    return (
      <Fragment>
        <CartHeader />
        <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
          <div className="container py-5 h-100">
            <div className="row justify-content-around">
              <div className="col-lg-8 card-left">
                <h2 className="mb-3 text-center font-cart">CART</h2>
                <hr />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p className="mb-0">Have 4 products in cart</p>
                  </div>
                  <div>
                    <p className="mb-0">
                      <span className="text-muted">Sort by:</span>{" "}
                      <a href="#!" className="text-body text-decoration-none">
                        price <i className="fas fa-angle-down mt-1"></i>
                      </a>
                    </p>
                  </div>
                </div>
                {this.props.listProductInCart.map((product, index) => (
                  <CartItem
                    eachProduct={product}
                    key={index}
                    updateQuantity={this.updateCart}
                    removeItem={this.removeItem}
                  />
                ))}
                {/* <CartItem /> */}
                <h5 className="mb-3 mt-5">
                  <Link
                    to="/products"
                    className="text-body text-decoration-none"
                  >
                    <i className="fas fa-long-arrow-alt-left me-2"></i>Back
                  </Link>
                </h5>
              </div>
              <div className="col-lg-3">
                <CartSummary />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listProductInCart: state.cart.cartItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListItems: () => dispatch(getCartItem()),
    handleUpdate: (id, qt) => dispatch(updateCartAmount(id, qt)),
    remove: (id) => dispatch(removeItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
