import "./header.css";
import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Notify from "../layouts/notify";
import User from "./user";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { logoutHandler } from "../../store/actions/usersAction";
import { getOrderDeliver } from "../../store/actions/orderAction";
import CancelIcon from "@material-ui/icons/Cancel";
import Toast from "./toast";
import { toast } from "react-toastify";
import { Fragment } from "react";
// function IsLogin (props) {
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
//           <button className="logout"
//           // onClick={handleClick}
//           >
//             Đăng Xuất
//           </button>
//         </li>
//       </ul>
//     </Fragment>
//     // </div>
//   );
// };
const Header = ({searchResult}) => {
  const dispatch = useDispatch();
  const { role, user } = useSelector((state) => state.login);
  const [slide, setSlide] = useState(true);
  const [show, setShow] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showOps, setShowOps] = useState(false);
  const [isSignin, setSignIn] = useState(false);
  const [highlightText, setHighlightText] = useState('');
  // const [is]
  // const  [order, setOrder] = useState({
  //   deliver: 0,
  // });
  // const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  // console.log('window.innerHeight', window.innerHeight)

  useEffect(() => {
    autoLogout();
    // console.log(role);
    if (role === 0) {
      dispatch(getOrderDeliver());
      setSignIn(true);
    } else {
      setSignIn(false);
    }
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      if (currentPosition < 200) {
        setShowHeader(true);
        setShowOps(false);
      } else {
        setShowHeader(false);
        setShowOps(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // useEffect(() => {
  //   // Thực hiện side effect sau khi showHeader và showOps đã thay đổi
  //   console.log("showHeader thay đổi:", showHeader);
  //   console.log("showOps thay đổi:", showOps);
  // }, [showHeader, showOps]);
  const showOptions = () => {
    setShowOps(!showOps);
  };
  // const countOrder = useSelector((state) => state.orderInfo);
  // const isLogin = useSelector((state) => state.orderInfo);
  // useEffect(() => {
  //   if (countOrder && countOrder.deliver) {
  //     setOrder({ deliver: { length: countOrder.deliver } });
  //   }
  // }, [countOrder]);
  // const renderElement = () => {
  //   if (isLogin !== undefined) {
  //     if (isLogin)
  //       // return <IsLogin handleClick={handleLogout} />;
  //       return {IsLogin(handleLogout)};
  //     else {
  //       return <UnLogin />;
  //     }
  //   } else {
  //     if (this.isActive) {
  //       return <IsLogin handleClick={handleLogout} />;
  //     }
  //     return <UnLogin />;
  //   }
  // };
  const autoLogout = async () => {
    const now = new Date();
    const isActive = await JSON.parse(localStorage.getItem("isactive"));
    // console.log(isActive);
    // if (isActive) {
    if (now.getTime() > isActive.expiry) {
      // console.log("logout");
      await dispatch(logoutHandler());
    }
    // }
  };
  useEffect(() => {
    // console.log(isSignin);
  }, [isSignin]);

  useEffect(() => {
    // console.log(role);
    if (role === 0) {
      dispatch(getOrderDeliver());
      setSignIn(true);
    } else {
      setSignIn(false);
    }
  }, [role]);

  const handleSearch = (searchTerm) => {
    const selectedText = document.body.innerText;
    // const searchResult = selectedText.includes(searchTerm);
    console.log(selectedText)
    console.log(searchTerm)
    const startIndex = selectedText.indexOf(searchTerm);
    console.log(startIndex)
    if (startIndex !== -1) {
      const endIndex = startIndex + searchTerm.length;
      console.log(endIndex)
      const foundText = selectedText.slice(startIndex, endIndex);
      const highlightedText = '<strong>' + foundText + '</strong>';
      searchResult = highlightedText;
      setHighlightText(highlightedText);
    } else {
      setHighlightText('')
    }
  };
    // console.log(searchResult);
    // setSearchResult(selectedText);
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
  // const handleLogout = async () => {
  //   dispatch(logoutHandler());
  //   if (isLogin === false) {
  //     toast.success(<Toast message="Đăng xuất thành công" />, {
  //       className: "success",
  //     });
  //   }
  // };
  // const showSideBar = () => {
  //   setSlide(!slide)
  //   this.setState(
  //     {
  //       slide: !slide,
  //     },
  //     () => {
  //       this.props.onBlurScreen(slide);
  //     }
  //   );
  // };
  // console.log('showHeader lớn hơn 200', showHeader)
  // console.log('showOps lớn hơn 200', showOps)
  return (
    <Fragment>
      <header className="header_main position-relative">
        <nav
        // className={`${show ? "d-block stick" : "d-block"} ${
        //   slide ? " d-none" : "d-block"
        // }`}
        >
          <div className={showHeader ? "position-relative" : "stick"}>
            <div className="header_top">
              <div className="ms-4">
                <div className={`${isSignin ? "" : "notLogin"} row_header`}>
                  <div className="col_header_a">
                    <button
                      className={showHeader ? "d-none" : "icon_nav"}
                      onClick={showOptions}
                    >
                      {showOps ? (
                        <i className="fa-solid fa-xmark"></i>
                      ) : (
                        <i className="fa-solid fa-bars"></i>
                      )}
                    </button>
                    <div className={showHeader ? "social_icone" : "d-none"}>
                      <ul>
                        <li>
                          <i className="fa-brands fa-facebook-f"></i>
                        </li>
                        <li>
                          <i className="fa-brands fa-twitter fs-5"></i>
                        </li>
                        <li>
                          <i className="fa-brands fa-instagram fs-5"></i>
                        </li>
                      </ul>
                    </div>
                    {/* <button
                      onClick={this.showSideBar}
                      style={{ color: "#fff" }}
                      className={`${
                        show ? "d-block bar-icon" : "d-none"
                      } ${slide ? "d-none" : ""}`}
                    >
                      <i className="fa-solid fa-bars"></i>
                    </button> */}
                  </div>
                  <div className="col_header_b float-end me-4 mt-3 top_right">
                    <div className="d-inline-block search">
                      <i className="fa-solid fa-magnifying-glass"></i>
                      <div className="search_frame">
                        <input type="text" onChange={(e) => handleSearch(e.target.value)}/>
                        <div className="icon_del">
                          <CancelIcon />
                        </div>
                      </div>
                    </div>
                    <div className="d-inline-block ms-4 alert position-relative">
                      <i className="fa-regular fa-bell noti_icon"></i>
                      <div className="alert_frame">
                        <Notify />
                      </div>
                    </div>
                    <div className="d-inline-block">
                      {isSignin ? (
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={showHeader ? "position-relative" : "stick set_index h-0"}
          >
            <div className="text-center">
              <div
                className={showHeader ? "logo" : "logo_scroll" + " text-center"}
              >
                {/* <p>The Moon</p> */}
                Shine
                <span className="and_word"> & </span>
                Lux
              </div>
            </div>
            <div className={showHeader || showOps ? "brand_logo" : "d-none"}>
              <img className="" src="./logo.png" alt="" />
            </div>
          </div>
          <div className={showHeader || showOps ? "d-block" : "d-none"}>
            <div className={showOps ? "stick_nav" : "" + " me-3"}>
              <div className="row align-items-center justify-content-around">
                <div className="sticky-header">
                  <div className="row align-items-center">
                    <div className="main_menu text-center">
                      <ul>
                        <li>
                          <Link to="/" className="text-decoration-none fs-2">
                            Trang Chủ
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/products"
                            className="text-decoration-none fs-2"
                          >
                            Trang sức
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/intro"
                            className="text-decoration-none fs-2"
                          >
                            Đồng hồ
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/products"
                            className="text-decoration-none fs-2"
                          >
                            Trang sức cưới
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/products"
                            className="text-decoration-none fs-2"
                          >
                            Phụ kiện & Quà tặng
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/products"
                            className="text-decoration-none fs-2"
                          >
                            Giới thiệu
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/contact"
                            className="text-decoration-none fs-2"
                          >
                            Liên Hệ
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="nav-stick"></div> */}
        </nav>

        {/* <div className={show ? "" : "d-none"}>
          <div className={slide ? "nav-menu active" : "nav-menu"}>
            <div className="nav-menu-items">
              <ul className="ps-0 mt-5">
                <li className="navbar-toggle">
                  <i className="fa-solid fa-house"></i>
                  <Link to="/" className="menu-bars">
                    Trang chủ
                  </Link>
                </li>
                <li className="navbar-toggle">
                  <i className="fa-solid fa-house"></i>
                  <Link to="/products" className="menu-bars">
                    Sản Phẩm
                  </Link>
                </li>
                <li className="navbar-toggle">
                  <i className="fa-solid fa-shop"></i>
                  <Link to="/intro" className="menu-bars">
                    Giới thiệu
                  </Link>
                </li>
                <li className="navbar-toggle">
                  <i className="fa-solid fa-comment"></i>
                  <Link to="/contact" className="menu-bars">
                    Liên hệ
                  </Link>
                </li>
              </ul>
              <div className="nav_social">
                <ul>
                  <li>
                    <i className="fa-brands fa-facebook-f fs-3"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-twitter fs-3"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-instagram fs-3"></i>
                  </li>
                </ul>
                <div
                  className={`nav_logout ${
                    isLogin ? "d-block" : "d-none"
                  }`}
                >
                  <button 
                  // onClick={this.handleLogout}
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* <button onClick={this.showSideBar} className="bar-open">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div> */}
      </header>
    </Fragment>
  );
};

export default Header;
