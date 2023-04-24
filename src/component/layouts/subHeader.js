import React from "react";
import { Fragment } from "react";
import "./subHeader.css";
import { Link, withRouter } from "react-router-dom";
import { logoutHandler } from "../../store/actions/usersAction";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../home/toast";

class SubHeader extends React.Component {
  logout = async() => {
    // console.log("logged out");
    await this.props.logout()
    if(this.props.isLogin === false) {
      console.log("logged out")
      toast.success(<Toast message="Đăng xuất thành công" />, {
        className: "success",
      });
      this.props.history.push("/");
    }
    // });
  };

  renderElement = () => {
    if (this.props.isLogin !== undefined) {
      if (this.props.isLogin) return <IsLogin handleClick={this.logout} />;
      else {
        return <UnLogin />;
      }
    } else {
      if (this.isActive) {
        return <IsLogin handleClick={this.logout} />;
      }
      return <UnLogin />;
    }
  };

  render() {
    return (
      <Fragment>
        <header className="sub_header me-0 ps-4 pt-3">
          <div className="row align-items-center justify-content-between w-100">
            <div className="col-lg-2 col-md-1 col-xxl-3 col-xl-3">
              <div className="main_menu">
                <div className="home_icon">
                  <i className="fa-solid fa-house"></i>
                  <div className="dropdown_sub">
                    <Link to="/">Trang Chủ</Link>
                    <Link to="/products">Sản Phẩm</Link>
                    <Link to="/intro">Giới Thiệu</Link>
                    <Link to="/contact">Liên Hệ</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-7 col-md-12 text-md-center p-md-0 col-xxl-6 col-xl-6">
              <div className="logo">
                <h1>Sparkle & Shine</h1>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 mb-md-3 mt-3 sub_top mb-sm-3">
              <div className="top_links">{this.renderElement()}</div>
            </div>
          </div>
        </header>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.login.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutHandler()),
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
  );
};

const UnLogin = () => {
  return (
    <Fragment>
      <Link to="/login" className="btn_links d-inline-block">
        {" "}
        Đăng Nhập
      </Link>
      <Link to="/register" className="btn_links sign_up d-inline-block position-relative">
        {" "}
        Đăng Ký
      </Link>
    </Fragment>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SubHeader)
);
