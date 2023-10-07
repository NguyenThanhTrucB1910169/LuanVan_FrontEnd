import { Fragment } from "react";
import "./orderInfo.css";
import React from "react";
import StepLayout from "./stepLayout";
import UpdateInfoForm from "../user/updateInfoForm";
import { Link } from "react-router-dom";

class OrderInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: true,
    };
  }

  handleNext = (page) => {
    if (page !== null) {
      this.props.handleNext(page);
    } else {
      this.props.handleNext(2);
    }
  };

  componentDidMount = () => {
    let user = this.props.infoUser.user;
    if (user.fullname && user.email && user.address && user.phone) {
      this.setState({ complete: true });
    } else this.setState({ complete: false });
  };

  render() {
    let useraddress = this.props.infoUser.user.address;
    return (
      <Fragment>
        <StepLayout activeStep={0} linkToStep={this.handleNext} />
        {this.state.complete ? (
          <div className="info_order">
            <h1 className="info_title">Thông tin đặt hàng</h1>
            <ul className="info_text">
              <li>
                <i className="fa-solid fa-user"></i>
                <span>{this.props.infoUser.user.fullname}</span>
              </li>
              <li>
                <i className="fa-solid fa-genderless"></i>
                <span>{this.props.infoUser.user.gender ? "Nữ" : "Nam"}</span>
              </li>
              <li>
                <i className="fa-regular fa-envelope"></i>
                <span>{this.props.infoUser.user.email}</span>
              </li>
              <li>
                <i className="fa-solid fa-location-dot"></i>
                <span>{this.props.infoUser.user.address}</span>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <span>{this.props.infoUser.user.phone}</span>
              </li>
            </ul>
            <div className="grp_btn">
              <Link
                to={{
                  pathname: "/updateinfo",
                  state: { profile: false, edit: true },
                }}
                className="btn_change"
              >
                <i className="fa-solid fa-pen"></i>
                Thay đổi
              </Link>
              <button
                type="button"
                className="btn order_btn col-4"
                onClick={() => this.handleNext(2)}
              >
                Tiếp tục
                <i className="fa-solid fa-right-long"></i>
              </button>
            </div>
          </div>
        ) : (
          <div className="empty_info">
            <img src="./empty.gif" alt="" />
            <p>
              Thông tin giao hàng chưa hoàn thành. Vui lòng&nbsp;
              <Link
                to={{
                  pathname: "/updateinfo",
                  state: { profile: false },
                }}
                className="btn_update"
              >
                cập nhật
              </Link>
              &nbsp;để tiếp tục !
            </p>
          </div>
        )}
      </Fragment>
    );
  }
}

export default OrderInfo;
