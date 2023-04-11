import "./header.css";
import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutHandler } from "../../store/actions/usersAction";
import Toast from "./toast";
import { toast } from "react-toastify";
import { Fragment } from "react";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slide: false,
      show: false,
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
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleLogout = async () => {
    await this.props.logoutHandler();
    toast.success(<Toast message="Đăng xuất thành công" />);
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
    // console.log(this.props.user)
    return (
      <header className="header_black">
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
                        <a href="/">
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/" className="ms-2">
                          <i className="fa-brands fa-twitter fs-5"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/" className="ms-2">
                          <i className="fa-brands fa-instagram fs-5"></i>
                        </a>
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
                <div
                  className="col_header_b"
                  // {
                  //   this.state.show ? "col_header_b" : "col_header_b" 
                  // }
                >
                  <div className="top_right float-end me-5">
                    <ul>

                      
                      {/* <li className="language">
                        <a href="/" className="text-decoration-none fs-6">
                          VietNamese{" "}
                          <i className="fa-solid fa-chevron-down"></i>
                        </a>
                        <ul className="dropdown_language">
                          <li>
                            <a href="/">English</a>
                          </li>
                          <li>
                            <a href="/">VietNamese</a>
                          </li>
                        </ul>
                      </li> */}
                      <li className="top_links">{this.renderElement()}</li>
                    {/* <li>
                        <div className="search_btn">
                          <a href="#">
                            <i className="fa-solid fa-magnifying-glass"></i>
                          </a>
                          <div className="dropdown_search">
                            <form action="/">
                              <input
                                type="text"
                                placeholder="Search Product ...."
                              />
                              <button type="submit">
                                <i className="fa-solid fa-magnifying-glass"></i>
                              </button>
                            </form>
                          </div>
                        </div>
                      </li> */}
                      </ul>
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
                    {/* <a href="index.html">
                    <img src="images/logo/logo-ash.png" alt="" />
                  </a> */}
                    <h1>Sparkle & Shine</h1>
                  </div>
                </div>
                <div className="">
                  <div className="sticky-header">
                    {/* <div className="container"> */}
                    <div className="row align-items-center">
                      {/* <div className="col-12"> */}
                      {/* <div className="main_menu_inner"> */}
                      <div className="logo_sticky"></div>
                      <div className="main_menu">
                        <nav>
                          <ul>
                            <li className="">
                              <Link to="/" className="text-decoration-none fs-2">
                                Trang Chủ <i className="ion-chevron-down"></i>
                              </Link>
                              {/* <ul className="sub_menu">
                                <li>
                                  <a href="/">Banner</a>
                                </li>
                                <li>
                                  <a href="/">Featured</a>
                                </li>
                                <li>
                                  <a href="/">Collection</a>
                                </li>
                                <li>
                                  <a href="/">Best Selling</a>
                                </li>
                                <li>
                                  <a href="/">News</a>
                                </li>
                                <li>
                                  <a href="/">Blog</a>
                                </li>
                              </ul> */}
                            </li>
                            <li>
                              <Link
                                to="/products"
                                className="text-decoration-none fs-2"
                              >
                                Sản Phẩm
                                {/* <i className="ion-chevron-down"></i> */}
                              </Link>
                              {/* <a href="/" className="text-decoration-none fs-2">
                              </a> */}
                              {/* <ul className="mega_menu">
                                <li>
                                  <ul>
                                    <li>
                                      <a href="/">Hoa Tai</a>
                                    </li>
                                    <li>
                                      <a href="/">Mặt Dây Chuyền</a>
                                    </li>
                                    <li>
                                      <a href="/">Nhẫn</a>
                                    </li>
                                    <li>
                                      <a href="/">Chuỗi ngọc</a>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <ul>
                                    <li>
                                      <a href="/">Lắc Tay</a>
                                    </li>

                                    <li>
                                      <a href="/">Vòng tay</a>
                                    </li>

                                    <li>
                                      <a href="/">Đá quý</a>
                                    </li>
                                  </ul>
                                </li>
                                <li> */}
                              {/* <a href="/">Other</a> */}
                              {/* <ul>
                                    <li>
                                      <a href="/">Bạch Kim</a>
                                    </li>
                                    <li>
                                      <a href="/">Bạc</a>
                                    </li> */}
                              {/* <li>
                                  <a href="/">Coins</a>
                                </li> */}
                              {/* <li>
                                      <a href="/">Pha Lê</a>
                                    </li>
                                  </ul>
                                </li>
                              </ul> */}
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
                            <Link to="/contact" className="text-decoration-none fs-2">
                              Liên Hệ
                            </Link>
                             
                            </li>
                          </ul>
                        </nav>
                      </div>
                      {/* </div> */}
                      {/* </div> */}
                      {/* </div> */}
                    </div>
                  </div>
                </div>

                {/* <div className="col-lg-3 col-md-7 col-6">
                  <div className="middel_right">
                    <div className="cart_link">
                      <a href="/" className="text-decoration-none">
                        <i className="fa-solid fa-bag-shopping fs-4 me-4"></i>
                        <span className="me-2">67,598</span>
                        <i className="fa fa-solid fa-chevron-down"></i>
                      </a>
                      <span className="cart_quantity">{}</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            {/* <ToastContainer /> */}
          </div>
          <div className="nav-stick"></div>
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
                    <a href="/" className="text-decoration-none">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/" className="ms-2 text-decoration-none">
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/" className="ms-2 text-decoration-none">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                </ul>
                <div className="nav_logout">
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutHandler: () => dispatch(logoutHandler()),
  };
};

const IsLogin = (props) => {
  return (
    <div>
      <a href="/" className="text-decoration-none fs-6">
        Tài khoản<i className="fa-solid fa-chevron-down"></i>
      </a>
      <ul className="dropdown_links">
        <li>
          <a href="/">Thông Tin</a>
        </li>
        <li>
          <Link to="/cart">Giỏ Hàng</Link>
        </li>
        <li>
          <button className="logout" onClick={props.handleClick}>
            Đăng Xuất
          </button>
        </li>
      </ul>
    </div>
  );
};

const UnLogin = () => {
  return (
    <Fragment>
      <Link to="/login" className="btn_links d-inline-block">
        {" "}
        Đăng Nhập
      </Link>
      <Link to="/register" className="btn_links sign_up d-inline-block">
        {" "}
        Đăng Ký
      </Link>
    </Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
