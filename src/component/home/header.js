import "./header.css";
import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {logoutHandler} from '../../store/actions/usersAction'
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slide: false,
      show: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.logoutHandler();
  }

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
    return (
      <header className="header_black">
        <nav
          className={`${this.state.show ? "d-block stick" : "d-block"} ${
            this.state.slide ? " d-none" : "d-block"
          }`}
        >
          <div className="header_top">
            <div className=" me-0 ms-4">
              <div className="row align-items-center justify-content-between">
                <div className="col-lg-5 col-md-6">
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
                  className={
                    this.state.show ? "col-lg-3" : "col-lg-4" + " col-md-6"
                  }
                >
                  <div className="top_right text-right">
                    <ul>
                      <li>
                        <div className="search_btn">
                          <a href="/">
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
                      </li>
                      <li className="language">
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
                      </li>

                      <li className="top_links">
                        <a href="/" className="text-decoration-none fs-6">
                          Tài khoản<i className="fa-solid fa-chevron-down"></i>
                        </a>
                        <ul className="dropdown_links">
                          <li>
                            <a href="/">Thông Tin</a>
                          </li>
                          <li>
                            <a href="/">Giỏ Hàng</a>
                          </li>
                          <li>
                            <button className="logout" onClick={this.handleClick}>Đăng Xuất</button>
                            {/* <a href="/">Đăng Xuất</a> */}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header_middel">
            <div className="me-3">
              <div className="row align-items-center justify-content-around">
                <div className="col-lg-4">
                  <div className="sticky-header">
                    {/* <div className="container"> */}
                    <div className="row align-items-center">
                      {/* <div className="col-12"> */}
                      <div className="main_menu_inner">
                        <div className="logo_sticky"></div>
                        <div className="main_menu">
                          <nav>
                            <ul>
                              <li className="">
                                <a
                                  href="/"
                                  className="text-decoration-none fs-2"
                                >
                                  Trang Chủ <i className="ion-chevron-down"></i>
                                </a>
                                <ul className="sub_menu">
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
                                </ul>
                              </li>
                              <li>
                                <a
                                  href="/"
                                  className="text-decoration-none fs-2"
                                >
                                  Danh Mục <i className="ion-chevron-down"></i>
                                </a>
                                <ul className="mega_menu">
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
                                  <li>
                                    {/* <a href="/">Other</a> */}
                                    <ul>
                                      <li>
                                        <a href="/">Bạch Kim</a>
                                      </li>
                                      <li>
                                        <a href="/">Bạc</a>
                                      </li>
                                      {/* <li>
                                  <a href="/">Coins</a>
                                </li> */}
                                      <li>
                                        <a href="/">Pha Lê</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>

                              <li>
                                <a
                                  href="/"
                                  className="text-decoration-none fs-2"
                                >
                                  Giới Thiệu
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/"
                                  className="text-decoration-none fs-2"
                                >
                                  Liên Hệ
                                </a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                      {/* </div> */}
                      {/* </div> */}
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-3 col-4 text-center">
                  <div className="logo">
                    {/* <a href="index.html">
                    <img src="images/logo/logo-ash.png" alt="" />
                  </a> */}
                    <h1>Jazzy</h1>
                  </div>
                </div>

                <div className="col-lg-3 col-md-7 col-6">
                  <div className="middel_right">
                    <div className="cart_link">
                      <a href="/" className="text-decoration-none">
                        <i className="fa-solid fa-bag-shopping fs-4 me-4"></i>
                        <span className="me-2">67,598</span>
                        <i className="fa fa-solid fa-chevron-down"></i>
                      </a>
                      <span className="cart_quantity">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-stick"></div>
        </nav>

        <div className={this.state.show ? "" : "d-none"}>
          <div className={this.state.slide ? "nav-menu active" : "nav-menu"}>
            <div className="nav-menu-items">
              <div className="nav-img">
                <img src="./nav-bg.png" alt="" />
              </div>
              <ul className="ps-0">
                <li className="navbar-toggle">
                  <i className="fa-solid fa-house"></i>
                  <Link to="#" className="menu-bars">
                    Trang chủ
                  </Link>
                </li>
                <li className="navbar-toggle">
                  <i className="fa-solid fa-tags"></i>
                  <Link to="#" className="menu-bars">
                    Danh mục
                  </Link>
                </li>
                <li className="navbar-toggle">
                  <i className="fa-solid fa-shop"></i>
                  <Link to="#" className="menu-bars">
                    Giới thiệu
                  </Link>
                </li>
                <li className="navbar-toggle">
                  <i className="fa-solid fa-comment"></i>
                  <Link to="#" className="menu-bars">
                    Liên hệ
                  </Link>
                </li>
              </ul>
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
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutHandler: () => dispatch(logoutHandler()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
