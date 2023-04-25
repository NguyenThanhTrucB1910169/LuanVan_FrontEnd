import "./header.css";
import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutHandler } from "../../store/actions/usersAction";
import { getOrderDeliver } from "../../store/actions/orderAction";
import Toast from "./toast";
import { toast } from "react-toastify";
import { Fragment } from "react";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slide: false,
      show: false,
      order:
        this.props.countOrder.deliver.length !== undefined
          ? this.props.countOrder.deliver.length
          : 0,
      // isActive: null,
    };
  }

  renderElement = () => {
    if (this.props.isLogin !== undefined) {
      if (this.props.isLogin)
        return <IsLogin handleClick={this.handleLogout} />;
      else {
        return <UnLogin />;
      }
    } else {
      if (this.isActive) {
        return <IsLogin handleClick={this.handleLogout} />;
      }
      return <UnLogin />;
    }
  };

  autoLogout = () => {
    const now = new Date();
    if (this.isActive) {
      if (now.getTime() > this.isActive.expiry) {
        this.props.logoutHandler();
      }
    }
  };

  componentDidMount() {
    this.autoLogout();
    window.addEventListener("scroll", this.handleScroll);
    this.props.getOrder();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleLogout = async () => {
    await this.props.logoutHandler();
    if (this.props.isLogin === false) {
      toast.success(<Toast message="Đăng xuất thành công" />, {
        className: "success",
      });
    }
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.countOrder.deliver !== null) {
      console.log(prevState.order, this.props.countOrder.deliver.length);
      if (prevState.order !== this.props.countOrder.deliver.length) {
        this.setState({ order: this.props.countOrder.deliver.length });
      }
    }
  };

  handleScroll = () => {
    if (window.scrollY > 200) this.setState({ show: true });
    else this.setState({ show: false });
  };

  showSideBar = () => {
    this.setState(
      {
        slide: !this.state.slide,
      },
      () => {
        this.props.onBlurScreen(this.state.slide);
      }
    );
  };
  render() {
    this.isActive = JSON.parse(localStorage.getItem("isactive"));
    return (
      <header className="header_main">
        <nav
          className={`${this.state.show ? "d-block stick" : "d-block"} ${
            this.state.slide ? " d-none" : "d-block"
          }`}
        >
          <div className="header_top">
            <div className="ms-4">
              <div className="row_header">
                <div className="col_header_a">
                  <div className="social_icone">
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
                  <button
                    onClick={this.showSideBar}
                    style={{ color: "#fff" }}
                    className={`${
                      this.state.show ? "d-block bar-icon" : "d-none"
                    } ${this.state.slide ? "d-none" : ""}`}
                  >
                    <i className="fa-solid fa-bars"></i>
                  </button>
                </div>
                <div className="col_header_b float-end me-4 mt-3 top_right">
                  <div className="top_links">
                    {this.props.isLogin ? (
                      <div>
                        <span className="fs-6 position-relative">
                          <span className="">Tài khoản</span>
                          {this.state.order !== 0 ? (
                            <i className="fa-solid fa-exclamation ms-1 alert_icon"></i>
                          ) : (
                            <i className="fa-solid fa-chevron-down ms-1"></i>
                          )}
                        </span>
                        <ul className="dropdown_links">
                          <li>
                            <Link to="/profile">Thông Tin</Link>
                          </li>
                          <li>
                            <Link to="/cart">Giỏ Hàng</Link>
                          </li>
                          <li>
                            <Link to="/vieworder" className="position-relative">
                              Đơn Hàng{" "}
                              <span
                                className={`order_deli ${
                                  this.state.order === 0 ? "d-none " : "d-block"
                                }`}
                              >
                                {this.state.order}
                              </span>
                            </Link>
                          </li>
                          <li>
                            <button
                              className="logout"
                              onClick={this.handleLogout}
                            >
                              Đăng Xuất
                            </button>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <div>
                        <Link to="/login" className="btn_links d-inline-block">
                          {" "}
                          Đăng Nhập
                        </Link>
                        <Link
                          to="/register"
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
          <div className="header_middel">
            <div className="me-3">
              <div className="row align-items-center justify-content-around">
                <div className="text-center">
                  <div className="logo text-center">
                    <h1>Sparkle & Shine</h1>
                  </div>
                </div>
                <div className="">
                  <div className="sticky-header">
                    <div className="row align-items-center">
                      <div className="logo_sticky"></div>
                      <div className="main_menu">
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
                              Sản Phẩm
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/intro"
                              className="text-decoration-none fs-2"
                            >
                              Giới Thiệu
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
          </div>
          {/* <div className="nav-stick"></div> */}
        </nav>

        <div className={this.state.show ? "" : "d-none"}>
          <div className={this.state.slide ? "nav-menu active" : "nav-menu"}>
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
                    this.props.isLogin ? "d-block" : "d-none"
                  }`}
                >
                  <button onClick={this.handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </button>
                </div>
              </div>
            </div>

            <button onClick={this.showSideBar} className="bar-open">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cartItem,
    isLogin: state.login.isAuth,
    user: state.login,
    countOrder: state.orderInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutHandler: () => dispatch(logoutHandler()),
    getOrder: () => dispatch(getOrderDeliver()),
  };
};

const IsLogin = (props) => {
  return (
    <Fragment>
      <span className="fs-6">
        Tài khoản<i className="fa-solid fa-chevron-down ms-3"></i>
      </span>
      <ul className="dropdown_links">
        <li>
          <Link to="/profile">Thông Tin</Link>
        </li>
        <li>
          <Link to="/cart">Giỏ Hàng</Link>
        </li>
        <li>
          <Link to="/vieworder">Đơn Hàng</Link>
        </li>
        <li>
          <button className="logout" onClick={props.handleClick}>
            Đăng Xuất
          </button>
        </li>
      </ul>
    </Fragment>
    // </div>
  );
};

const UnLogin = () => {
  return (
    <Fragment>
      <Link to="/login" className="btn_links d-inline-block">
        {" "}
        Đăng Nhập
      </Link>
      <Link
        to="/register"
        className="btn_links sign_up d-inline-block position-relative"
      >
        {" "}
        Đăng Ký
      </Link>
    </Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
