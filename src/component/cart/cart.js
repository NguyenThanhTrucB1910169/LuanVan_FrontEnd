import React from "react";
import CartItem from "./cartItem";
import CartSummary from "./cartSummary";
import { Fragment } from "react";
import Footer from "../home/footer";
import "./cart.css";
import SubHeader from "../layouts/subHeader";
import { connect } from "react-redux";
import Toast from "../home/toast";
import { toast } from "react-toastify";
import {
  getCartItem,
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

  componentDidUpdate = (prevProps) => {
    if(prevProps.listProductInCart !== this.props.listProductInCart){
      this.setState({listProducts: this.props.listProductInCart});
    }
  }

  componentDidMount = async (e) => {
   
    await this.props.getListItems();
   
  };

  updateQt = async(newPd) => {
    await this.props.updateQuantity(newPd);
  }

  removeItem = async(id) => {
    await this.props.remove(id);
    if(this.props.isDelete) {
      toast.success(<Toast message="Đã xóa khỏi giỏ hàng."/>, {
        className: 'success',
      })
    }
  };

  render() {
    return (
      <Fragment>
        <SubHeader />
        <section className="h-100 h-custom" style={{ backgroundColor: "#eee", paddingTop: '3rem' }}>
          <div className="title_cart">
              <div className="col-5 text-end">
              <i className="fa-brands fa-opencart"></i>
              </div>
              <p className="col-7 text-uppercase">Giỏ Hàng</p>
          </div>
          <div className="container py-4 h-100">
            <div className="row justify-content-around">
              <div className="col-xl-8 card-left">
                {/* <h2 className="mb-3 text-center font-cart text-uppercase">giỏ hàng</h2> */}
                {/* d-flex justify-content-between align-items-center  */}
                <div className="mb-4">
                  <div>
                    <i className="fa-solid fa-tags d-inline-block me-3 ms-2"></i>
                    <p className="mb-0 d-inline-block font-cart">{this.state.listProducts.length} sản phẩm trong giỏ hàng</p>
                  </div>
                  <hr style={{ width: "95%"}} />
                  {/* <div> */}

                {/* <hr /> */}
                  {/* </div> */}
                </div>
                {
                 this.state.listProducts.length !== 0? 
                this.state.listProducts.map((product, index) => (
                  <CartItem
                    eachProduct={product}
                    key={index}
                    removeItem={this.removeItem}
                    update = {this.updateQt}
                    
                  />
                )) : (
                  <div className="text-center">
                  <img src="./empty-cart.gif" alt="" className="empty_cart_icon"/>
                  <h5 className="mt-4">Giỏ Hàng Trống</h5>
                  </div>
                )}
                {/* <CartItem /> */}
                <h5 className="mb-3 mt-5">
                  <Link
                    to="/products"
                    className="text-body text-decoration-none back_cart border-0"
                  >
                    <i className="fas fa-long-arrow-alt-left me-2"></i>
                  </Link>
                </h5>
              </div>
              <div className="col-xl-3">
                <CartSummary product={this.state.listProducts.length !== 0 ? this.state.listProducts : []} checkout={false}/>
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
    isDelete: state.cart.message,
    isEmpty: state.cart.empty
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListItems: () => dispatch(getCartItem()),
    updateQuantity: (newCart) => dispatch(updateCartAmount(newCart)),
    remove: (id) => dispatch(removeItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
