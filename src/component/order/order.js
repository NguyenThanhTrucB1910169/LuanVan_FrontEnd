import React, { Fragment, useState } from "react";
import OrderInfo from "./orderInfo";
import OrderConfirm from "./orderConfirm";
import { connect, useDispatch, useSelector } from "react-redux";
import { updateInfo } from "../../store/actions/usersAction";
import CompleteOrder from "./completeOrder";
import { createOrder } from "../../store/actions/orderAction";
import OrderPayment from "./orderPayment";

// class Order extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeIndex: 1,
//       pd_order: [],
//       notes: ''
//     };
//   }

//   handleUpdate = (info) => {
//     this.props.updateInfo(info);
//   };

//   handleNext = (page) => {
//     this.setState({ activeIndex: page });
//   };

//   notes = (notes) => {
//     this.setState({notes: notes});
//   }

//   orderSubmit = async (isactive) => {
//     var price = 0;
//     if (isactive) {
//       await this.props.cartItem.cartItem.map((item, index) => {
//         price += item.price * item.quantity;
//         console.log(price);
//         this.setState((prev) => ({
//           pd_order: [
//             ...prev.pd_order,
//             { id: item.productId, quantity: item.quantity, price: item.price },
//           ],
//           total: price,
//         }));
//       });
//       await this.props.orderSubmit({
//         products: this.state.pd_order,
//         total: this.state.total,
//         status: 0,
//         note: this.state.notes
//       });
//       if (this.props.isOrder) {
//         this.handleNext(3);
//       }
//     }
//   };

//   render() {
//     // console.log(this.props.isUpdate)
//     return (
//       <Fragment>
//         {this.state.activeIndex === 1 ? (
//           <OrderInfo
//             updateInfo={this.handleUpdate}
//             handleNext={this.handleNext}
//             infoUser={this.props.infoUser}
//           />
//         ) : null}
//         {this.state.activeIndex === 2 ? (
//           <OrderConfirm
//             handleNext={this.handleNext}
//             info={this.props.infoUser.user}
//             cartInfo={this.props.cartItem}
//             submit={this.orderSubmit}
//             notes={this.notes}
//           />
//         ) : null}
//         {this.state.activeIndex === 3 ? (
//           <OrderPayment
//             handleNext={this.handleNext}
//             // info={this.props.infoUser.user}
//             // cartInfo={this.props.cartItem}
//             submit={this.orderSubmit}
//             notes={this.notes}
//           />
//         ) : null}
//         {this.state.activeIndex === 3 ? <CompleteOrder /> : null}
//       </Fragment>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     infoUser: state.login,
//     cartItem: state.cart,
//     isOrder: state.orderInfo.placed,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateInfo: (info) => dispatch(updateInfo(info)),
//     orderSubmit: (data) => dispatch(createOrder(data)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Order);

const Order = () => {
  const [activeIndex, setActiveIndex] = useState(1)
  const [pd_order, setPdOrder] = useState([]);
  const [notes, setNotes] = useState("");
  const infoUser = useSelector((state) => state.login);
  const cartItem = useSelector((state) => state.cart);
  const isOrder = useSelector((state) => state.orderInfo.placed);
  const dispatch = useDispatch();
  const handleUpdate = (info) => {
    dispatch(updateInfo(info));
  };

  const handleNext = (page) => {
    console.log(page);
    setActiveIndex(page);
  };

  const handleNotes = (notes) => {
    setNotes(notes);
  };

  const orderSubmit = async (isactive) => {
    var price = 0;
    if (isactive) {
      await cartItem.cartItem.forEach((item) => {
        price += item.price * item.quantity;
        console.log(price);
        setPdOrder((prev) => [
          ...prev,
          { id: item.productId, quantity: item.quantity, price: item.price },
        ]);
      });
      await dispatch(
        orderSubmit({
          products: pd_order,
          total: price,
          status: 0,
          note: notes,
        })
      );
      if (isOrder) {
        handleNext(3);
      }
    }
  };

  return (
    <Fragment>
      {activeIndex === 1 ? (
        <OrderInfo
          updateInfo={handleUpdate}
          handleNext={handleNext}
          infoUser={infoUser}
        />
      ) : null}
      {activeIndex === 2 ? (
        <OrderConfirm
          handleNext={handleNext}
          info={infoUser.user}
          cartInfo={cartItem}
          submit={orderSubmit}
          notes={handleNotes}
        />
      ) : null}
      {activeIndex === 3 ? (
        <OrderPayment
          handleNext={handleNext}
        //   onPay={setPay}
        //   notes={handleNotes}
        />
      ) : null}
      {activeIndex === 4 ? <CompleteOrder /> : null}
    </Fragment>
  );
};

export default Order;
