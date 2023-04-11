import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { logoutHandler } from "../../store/actions/usersAction";
import { Link } from "react-router-dom";
import './sideBar.css'

class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
          <div className="col-3 dash_nav position-fixed">
            <nav
              // id="sidebarMenu"
              className="collapse d-lg-block sidebar collapse"
            >
              <div className="position-sticky">
                <div className="mx-3 mt-4">
                  <Link
                    to="/ad/dashboard"
                    className="py-2 item_nav_ad"
                  >
                    <i className="fas fa-tachometer-alt fa-fw me-3"></i>
                    <span>Trang chính</span>
                  </Link>
                  <Link
                    to="/ad/orders"
                    className="py-2 item_nav_ad d-block"
                  >
                    <i className="fas fa-chart-bar fa-fw me-3"></i>
                    <span>Đơn hàng</span>
                  </Link>
                  <div className="py-2 item_nav_ad ad_pd">
                    <i className="fa-solid fa-file-pen me-3"></i>
                    <span>Sản Phẩm</span>
                    <i className="fa-solid fa-sort-down float-end"></i>
                  <div className="drop_list">
                    <ul>
                      <li>
                        <Link to="/ad/listpd">
                          Danh Sách Sản Phẩm
                        </Link>
                      </li>
                      <li>
                        <Link to="/ad/create">Thêm sản phẩm</Link>
                      </li>
                    </ul>
                  </div>
                  </div>
                  <Link
                    to="#"
                    className="item_nav_ad py-2"
                  >
                    <i className="fas fa-users fa-fw me-3"></i>
                    <span>Người Dùng</span>
                  </Link>
                  <Link onClick={() => this.props.logout()} to="/login" className="btn_logout_ad">
                    Đăng xuất
                  </Link>
                </div>
              </div>
            </nav>
          </div>
         
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutHandler()),
  };
};

export default connect(null, mapDispatchToProps)(SideBar);
