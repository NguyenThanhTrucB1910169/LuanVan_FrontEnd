import React from "react";
// import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Toast from "../home/toast";
import "./updateInfoForm.css";
import { Fragment } from "react";
import SubHeader from "../layouts/subHeader";
import Footer from "../home/footer";
import { connect } from "react-redux";
import { updateInfo } from "../../store/actions/usersAction";
import { Link } from "react-router-dom";
class UpdateInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.info.address,
      phone: this.props.info.phone,
      fullname: this.props.info.fullname,
      email: this.props.info.email,
      isValid: false,
      isCoun: false,
      errors: {},
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.isValid){
      const info = {address: this.state.address, fullname: this.state.fullname, phone: this.state.phone, email: this.state.email};
      this.props.updateInfo(info);
      toast.success(<Toast message="Cập nhật thông tin thành công" />, {
        className: "success",
      });
      this.setState({isCoun: true});
    }
    else console.log('false')
  };

  validateForm = (name) => {
    const errors = {};
    switch (name) {
      case "fullname":
        if (!this.state.fullname) {
          this.setState({
            isValid: false,
            errors: { ...this.state.errors, fullname: "Nhập họ tên" },
          });
        } else
          this.setState({
            isValid: true,
            errors: { ...this.state.errors, fullname: "" },
          });
        return errors;
      case "email":
        if (!this.state.email) {
          this.setState({
            errors: { ...this.state.errors, email: "Nhập email" },
          });
        } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
          this.setState(
            { errors: { ...this.state.errors, email: "Email không hợp lệ" } },
            () => {
              console.log(this.state.errors);
            }
          );
        } else
          this.setState({
            isValid: true,
            errors: { ...this.state.errors, email: "" },
          });
        return errors;
      case "phone":
        if (!this.state.phone) {
          this.setState({
            isValid: false,
            errors: { ...this.state.errors, phone: "Nhập số điện thoại" },
          });
        } else if (! /^(03|05|07)\d{8}$/.test(this.state.phone)) {
          this.setState({
            isValid: false,
            errors: {
              ...this.state.errors,
              phone: "Số điện thoại không hợp lệ",
            },
          });
        } else
          this.setState({
            isValid: true,
            errors: { ...this.state.errors, phone: "" },
          });
          return errors;
      case "address":
        if (!this.state.address) {
          this.setState({
            isValid: false,
            errors: { ...this.state.errors, address: "Nhập địa chỉ" },
          });
        } else if (this.state.address.length < 10) {
          this.setState({
            isValid: false,
            errors: {
              ...this.state.errors,
              address: "Địa chỉ có ít nhất 10 ký tự",
            },
          });
        } else
          this.setState({
            isValid: true,
            errors: { ...this.state.errors, address: "" },
          });
        return errors;
      default:
        return errors;
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.validateForm(e.target.name);
    });
  };

  render() {
    return (
      <Fragment>
        <SubHeader />
        <div className="update_form">
          <h1 className="update_title">Cập nhật thông tin giao hàng</h1>
          <form action="" className="row justify-content-around form_detail">
            <div className="">
              <input
                name="fullname"
                type="text"
                className="update_input"
                placeholder="Họ Tên"
                value={this.state.fullname}
                onChange={this.handleChange}
              />
              {this.state.errors.fullname && (
                <div className="reg_error">{this.state.errors.fullname}</div>
              )}
            </div>
            <div className="">
              <input
                type="text"
                name="email"
                className="update_input"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {this.state.errors.email && (
                <div className="reg_error">{this.state.errors.email}</div>
              )}
            </div>
            <div className="">
              <input
                name="address"
                type="text"
                className="update_input"
                placeholder="Địa chỉ"
                value={this.state.address}
                onChange={this.handleChange}
              />
              {this.state.errors.address && (
                <div className="reg_error">{this.state.errors.address}</div>
              )}
            </div>
            <div className="">
              <input
                name="phone"
                type="text"
                className="update_input"
                placeholder="Số Điện Thoại"
                value={this.state.phone}
                onChange={this.handleChange}
              />
              {this.state.errors.phone && (
                <div className="reg_error">{this.state.errors.phone}</div>
              )}
            </div>
            <div className="col-6">
              <button onClick={this.handleSubmit}>Lưu thông tin</button>
              {this.state.isCoun ? (<Link to="/order">Tiếp tục</Link>) : null}
              
            </div>
          </form>
        </div>

        <Footer />
      </Fragment>
    );
  }
}

// const formScheme = Yup.object().shape({
//   num: Yup.number().required("Địa chỉ là bắt buộc"),
//   street: Yup.string().required("Địa chỉ là bắt buộc"),
//   ward: Yup.string().required("Địa chỉ là bắt buộc"),
//   district: Yup.string().required("Địa chỉ là bắt buộc"),
//   city: Yup.string().required("Địa chỉ là bắt buộc"),
//   phone: Yup.string()
//     .matches(/^\d{10}$/, "Số điện thoại phải có 10 số")
//     .required("Số điện thoại là bắt buộc"),
// });

const mapStateToProps = (state) => {
  return {
    info: state.login.user, 
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    updateInfo: (info) => dispatch(updateInfo(info))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfoForm);

