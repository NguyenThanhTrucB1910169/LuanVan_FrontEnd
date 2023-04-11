import React from "react";
import { Fragment } from "react";
import "./subHeader.css";
import { Link, withRouter } from "react-router-dom";
import { logoutHandler } from "../../store/actions/usersAction";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../home/toast";

class SubHeader extends React.Component {

  logout = () => {
    console.log('logged out');
    this.props.logout().then(() => {
      toast.success(<Toast message="Đăng xuất thành công"/>, {
        className: 'success',
      })
      this.props.history.push('/')
    })
  }

  render() {
    return (
      <Fragment>
        <header className="cart-header me-0 ps-4 pt-3">
          {/* <div className="cart-top"> */}
           
              <div className="row align-items-center justify-content-between w-100">
                <div className="col-lg-4 col-md-6 mt-4">
                  <div className="main_menu">
                    <nav>
                      <ul className="">
                        <li className="">
                          <Link to="/" className="text-decoration-none fs-6">
                            Trang Chủ <i className="ion-chevron-down"></i>
                          </Link>
                          {/* <ul className="sub_menu cart-nav">
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
                     

                        {/* <li>
                          <a href="/" className="text-decoration-none fs-6">
                            Giới Thiệu
                          </a>
                        </li>
                        <li>
                          <a href="/" className="text-decoration-none fs-6">
                            Liên Hệ
                          </a>
                        </li> */}
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-lg-5 col-md-6">
                  <div className="logo">
                    <h1>Sparkle & Shine</h1>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mt-3 nav_cart">
                  <div className="top_right text-center">
                    <ul className="p-0">
                     
                      {/* <li>
                      <div className="middel_right">
                    <div className="cart_link ms-0 mb-0">
                    <a href="/cart" className="text-decoration-none">
                        <i className="fa-solid fa-bag-shopping fs-4 me-4"></i>
                        {/* <span className="me-2">67,598</span> 
                        <i className="fa fa-solid fa-chevron-down"></i>
                          {this.props.amount ? ( <span className="quantity">{this.props.amount}</span>) : null}
                    </a>
                      {/* <a href="/" >
                      </a> */}
                      {/* 
                    </div>
                  </div>
                      </li> */}

                      <li className="top_links">
                        <div className="text-decoration-none fs-5">
                          Tài khoản<i className="fa-solid fa-chevron-down"></i>
                        </div>
                        <ul className="dropdown_links">
                          <li>
                            <Link to="/">Thông Tin</Link>
                          </li>
                          <li>
                            <Link to="/cart">Giỏ Hàng</Link>
                          </li>
                          <li>
                          <button onClick={this.logout} className="btn_logout">
                            Đăng Xuất
                          </button>
                          </li>
                        </ul>
                      </li>
                       {/* <li>
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
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            
          {/* </div> */}
        </header>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutHandler())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubHeader));
