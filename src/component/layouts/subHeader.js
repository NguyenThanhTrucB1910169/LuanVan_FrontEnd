import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./subHeader.css";
import { Link, withRouter } from "react-router-dom";
import { logoutHandler } from "../../store/actions/usersAction";
import { getOrderDeliver } from "../../store/actions/orderAction";
import { connect, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../home/toast";
import { useHistory } from "react-router-dom";
import Notify from "./notify";
import User from "../home/user";

const SubHeader = () => {
  const [amout, setAmount] = useState(0);
  const [order, setOrder] = useState(0);
  // const [showHeader, setShowHeader] = useState(true);
  const [showOps, setShowOps] = useState(false);
  // const isLogin = useSelector((state) => state.isLogin);
  const lengthOfCart = useSelector((state) => state.cart.cartItem.length);
  const isEmpty = useSelector((state) => state.cart.empty);
  const isLogin = useSelector((state) => state.login.role);
  const deliver = useSelector((state) => state.orderInfo.deliver);
  const [isSignin, setSignIn] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory;
  // const logout = async () => {
  //   dispatch(logoutHandler());
  //   if (isLogin === false) {
  //     toast.success(<Toast message="Đăng xuất thành công" />, {
  //       className: "success",
  //     });
  //     history.push("/");
  //   }
  // };
  useEffect(() => {
    // Kiểm tra sự thay đổi trong cartItem.length và cập nhật amout
    if (isLogin === 1) {
      if (amout !== lengthOfCart) {
        setAmount(lengthOfCart);
      }

      // Kiểm tra sự thay đổi trong countOrder.deliver.length và cập nhật order
      if (deliver !== null) {
        if (order !== deliver.length) {
          setOrder(deliver.length);
        }
      }
    }
  }, [amout, order, lengthOfCart, deliver, isLogin]);

  useEffect(() => {
    if (isEmpty === true) {
      setAmount(0);
    } else {
      setAmount(lengthOfCart);
    }
    if (isLogin === 1) {
      dispatch(getOrderDeliver());
      if (deliver !== null) {
        if (deliver.length > 0) {
          setOrder(deliver.length);
        } else setOrder(0);
      }
    }
  }, []);

  return (
    <Fragment>
      <header className="sub_header me-0">
        <div className="">
          <div className="header_top">
            <div className="ms-4">
              <div className={isLogin === 0 ? 'row_header' : 'row_sub row_header'}>
                <div className="col_a">
                  <img src="./logo.png" alt="" className="icon_logo" />
                </div>
                  <div className="text-center">
                    <div
                      className="logo text-center"
                    >
                      Shine
                      <span className="and_word"> and </span>
                      Lux
                    </div>
                  </div>
                <div className="col_b float-end me-4 mt-3 top_right">
                  <div className="d-inline-block search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <div className="d-inline-block ms-4 alert position-relative">
                    <i className="fa-regular fa-bell noti_icon"></i>
                    <div className="alert_frame">
                      <Notify />
                    </div>
                  </div>
                  <div className="d-inline-block">
                      {isLogin === 0 ? (
                        <User />
                      ) : (
                        <div className="d-inline-block signin ms-3">
                          <Link
                            to={`/login/${1}`}
                            className="btn_links d-inline-block"
                          >
                            {" "}
                            Đăng Nhập
                          </Link>
                          <Link
                            to={`/login/${2}`}
                            className="btn_links sign_up d-inline-block position-relative"
                          >
                            {" "}
                            Đăng Ký
                          </Link>
                        </div>
                      )}
                    </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default SubHeader;

// class SubHeader extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       amout: 0,
//       order: 0,
//     };
//   }

//   logout = async () => {
//     await this.props.logout();
//     if (this.props.isLogin === false) {
//       toast.success(<Toast message="Đăng xuất thành công" />, {
//         className: "success",
//       });
//       this.props.history.push("/");
//     }
//   };

//   componentDidUpdate = (prevProps, prevState) => {
//     if (prevState.amout !== this.props.cartCurrent.cartItem.length) {
//       this.setState({ amout: this.props.cartCurrent.cartItem.length });
//     }
//     if (this.props.countOrder.deliver !== null) {
//       if (prevState.order !== this.props.countOrder.deliver.length) {
//         this.setState({ order: this.props.countOrder.deliver.length });
//       }
//     }
//   };

//   componentDidMount = async () => {
//     if (this.props.cartCurrent.empty === true) {
//       this.setState({ amout: 0 });
//     } else {
//       this.setState({ amout: this.props.cartCurrent.cartItem.length });
//     }
//     await this.props.getOrder();
//     if (this.props.countOrder.deliver !== null) {
//       if (this.props.countOrder.deliver.length > 0) {
//         this.setState({ order: this.props.countOrder.deliver.length });
//       } else this.setState({ order: 0 });
//     }
//   };

// renderElement = () => {
//   if (this.props.isLogin !== undefined) {
//     if (this.props.isLogin) return <IsLogin handleClick={this.logout} />;
//     else {
//       return <UnLogin />;
//     }
//   }
//   // else {
//   //   if (this.isActive) {
//   //     return <IsLogin handleClick={this.logout} cart={this.state.amout} />;
//   //   }
//   //   return <UnLogin />;
//   // }
// };

//   render() {
//     return (
//       <Fragment>
//         <header
//           className={`${
//             this.props.position !== undefined
//               ? this.props.position
//               : "position-fixed"
//           } sub_header me-0 ps-4 pt-2`}
//         >
//           <div className="row align-items-center justify-content-between w-100">
//             <div className="col-lg-2 col-md-1 col-xxl-3 col-xl-3">
//               <div className="main_menu">
//                 <div className="home_icon">
//                   <i className="fa-solid fa-house"></i>
//                   <div className="dropdown_sub">
//                     <Link to="/">Trang Chủ</Link>
//                     <Link to="/products">Sản Phẩm</Link>
//                     <Link to="/intro">Giới Thiệu</Link>
//                     <Link to="/contact">Liên Hệ</Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-sm-12 col-lg-7 col-md-12 text-md-center p-md-0 col-xxl-6 col-xl-6">
//               <div className="logo">
//                 <h1>Sparkle & Shine</h1>
//               </div>
//             </div>
//             <div className="col-lg-3 col-md-12 mb-md-3 mt-3 sub_top mb-sm-3 row justify-content-start">
//               <div className="col-5 me-3 top_links">
//                 {this.props.isLogin ? (
//                   <div>
//                     <span className="fs-6 position-relative">
//                       <span className="">Tài khoản</span>
//                       {this.state.order !== 0 ? (
//                         <i className="fa-solid fa-exclamation ms-1 alert_icon"></i>
//                       ) : (
//                         <i className="fa-solid fa-chevron-down ms-1"></i>
//                       )}
//                     </span>
//                     <ul className="dropdown_links">
//                       <li>
//                         <Link to="/profile">Thông Tin</Link>
//                       </li>
//                       <li>
//                         <Link to="/cart">Giỏ Hàng</Link>
//                       </li>
//                       <li>
//                         <Link to="/vieworder" className="position-relative">
//                           Đơn Hàng{" "}
//                           <span
//                             className={`order_deli ${
//                               this.state.order === 0 ? "d-none " : "d-block"
//                             }`}
//                           >
//                             {this.state.order}
//                           </span>
//                         </Link>
//                       </li>
//                       <li>
//                         <button className="logout" onClick={this.logout}>
//                           Đăng Xuất
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 ) : (
//                   <div>
//                     <Link to="/login" className="btn_links d-inline-block">
//                       {" "}
//                       Đăng Nhập
//                     </Link>
//                     <Link
//                       to="/register"
//                       className="btn_links sign_up d-inline-block position-relative"
//                     >
//                       {" "}
//                       Đăng Ký
//                     </Link>
//                   </div>
//                 )}
//               </div>
//               <div className="col-2 cart_icon">
//                 <i className="fa fa-shopping-cart text-muted"></i>
//                 {/* <div className="cart_amount">{this.state.amout}</div> */}
//               </div>
//             </div>
//           </div>
//         </header>
//       </Fragment>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     isLogin: state.login.isAuth,
//     cartCurrent: state.cart,
//     countOrder: state.orderInfo,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     logout: () => dispatch(logoutHandler()),
//     getOrder: () => dispatch(getOrderDeliver()),
//   };
// };

// const IsLogin = (props) => {
//   return (
//     <Fragment>
//       <span className="fs-6">
//         Tài khoản<i className="fa-solid fa-chevron-down ms-3"></i>
//       </span>
//       <ul className="dropdown_links">
//         <li>
//           <Link to="/profile">Thông Tin</Link>
//         </li>
//         <li>
//           <Link to="/cart">Giỏ Hàng</Link>
//         </li>
//         <li>
//           <Link to="/vieworder">Đơn Hàng</Link>
//         </li>
//         <li>
//           <button className="logout" onClick={props.handleClick}>
//             Đăng Xuất
//           </button>
//         </li>
//       </ul>
//     </Fragment>
//   );
// };

// const UnLogin = () => {
//   return (
//     <Fragment>
//       <Link to="/login" className="btn_links d-inline-block">
//         {" "}
//         Đăng Nhập
//       </Link>
//       <Link
//         to="/register"
//         className="btn_links sign_up d-inline-block position-relative"
//       >
//         {" "}
//         Đăng Ký
//       </Link>
//     </Fragment>
//   );
// };

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(SubHeader)
// );
