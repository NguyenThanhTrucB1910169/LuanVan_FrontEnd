import React, { Fragment } from "react";
import OrderInfo from "./orderInfo";
import OrderPayment from "./orderPayment";
import OrderConfirm from "./orderConfirm"
import { connect } from "react-redux";
import { updateInfo } from "../../store/actions/usersAction";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CompleteOrder from "./completeOrder";
import { createOrder } from "../../store/actions/orderAction"; 

const stripe = loadStripe(
    "pk_test_51MWNRIDCE9QNRtxGVMQMl7RnfahEMvcytYHA9tGUUkAMshWYiQoasXdzYxz8DM4QbkUVGe86PnkAqZJGGnfqsKTs00WpdF3MUF"
  );
class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // step1: true,
            // step2: false,
            // step3: false,
            activeIndex: 1,
            pd_order: []
        }
    }

    handleUpdate = (info) => {
        this.props.updateInfo(info)
    }

    handleNext = (page) => {
        this.setState({activeIndex: page})
    }

    orderSubmit = async(isactive) => {
      var price = 0;
      if(isactive) {
      await this.props.cartItem.cartItem.map((item, index) => {
        price += item.price * item.quantity;
        console.log(price);
        this.setState((prev) => ({
          pd_order: [...prev.pd_order, { id: item.productId, quantity: item.quantity, price: item.price },],
          total: price
        }))
       })
       await this.props.orderSubmit({products: this.state.pd_order, total: this.state.total})
       if(this.props.isOrder){
        this.handleNext(3)
       }
      }
    }

    render() {
        // console.log(this.props.isUpdate)
        return (
          <Fragment>
            {this.state.activeIndex === 1 ? <OrderInfo updateInfo={this.handleUpdate} handleNext={this.handleNext} infoUser={this.props.infoUser}/> : null}
            {this.state.activeIndex === 2 ? <OrderConfirm handleNext={this.handleNext} info = {this.props.infoUser.user} cartInfo={this.props.cartItem} submit={this.orderSubmit}/> : null}
            {this.state.activeIndex === 3 ? 
                <CompleteOrder  /> 
            : null}
          </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        infoUser: state.login,
        cartItem: state.cart,
        isOrder: state.orderInfo.message,
    }
  }
  
  
  const mapDispatchToProps = (dispatch) => {
    return {
        updateInfo: (info) => dispatch(updateInfo(info)),
        orderSubmit: (data) => dispatch(createOrder(data))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Order);