import React from "react";
import { toast } from "react-toastify";
import Toast from "../home/toast";
import "./updateInfoForm.css";
import { Fragment } from "react";
import Header from "../home/header";
import Footer from "../home/footer";
import { connect } from "react-redux";
import { updateInfo } from "../../store/actions/usersAction";
import { Link, withRouter } from "react-router-dom";
class UpdateInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.info.address,
      phone: this.props.info.phone,
      fullname: this.props.info.fullname,
      email: this.props.info.email,
      pass: this.props.info.password,
      imgReview: this.props.info.avatar,
      avatar: "",
      isValid: false,
      isCoun: false,
      errors: {},
      isProfile: this.props.location.state.profile,
      showpass: false,
      imgUrl: "",
      option: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.isValid) {
      let info = {};
      const formData = new FormData();
      if (this.state.isProfile) {
        console.log(typeof this.state.avatar);
        if (typeof this.state.avatar === "object") {
          // await this.uploadImage(this.state.avatar[0]);
          console.log("this.state.avatar ", this.state.avatar);
          formData.append("address", this.state.address);
          formData.append("fullname", this.state.fullname);
          formData.append("phone", this.state.phone);
          formData.append("email", this.state.email);
          formData.append("password", this.state.pass);
          formData.append("isAvatar", true);
          formData.append("avatar", this.state.avatar);
          formData.append("updateAddress", false);
          formData.append("updateAvatar", true);
        } else if (this.state.avatar === "") {
          formData.append("address", this.state.address);
          formData.append("fullname", this.state.fullname);
          formData.append("phone", this.state.phone);
          formData.append("email", this.state.email);
          formData.append("password", this.state.pass);
          formData.append("avatar", this.state.imgReview);
          formData.append("isAvatar", true);
          formData.append("updateAddress", false);
          formData.append("updateAvatar", false);
        }
      } else {
        formData.append("address", this.state.address);
        formData.append("fullname", this.state.fullname);
        formData.append("phone", this.state.phone);
        formData.append("email", this.state.email);
        // formData.append("avatar", this.state.imgReview);
        formData.append("isAvatar", true);
        formData.append("updateAddress", true);
        formData.append("updateAvatar", false);
      }
      await this.props.updateInfo(formData);
      if (this.props.isUpdate) {
        toast.success(<Toast message="Cập nhật thông tin thành công" />, {
          className: "success",
        });
        this.setState({ isCoun: true });
      } else {
        toast.error(<Toast message="Cập nhật thông tin thất bại" />, {
          className: "fail",
        });
      }
    } else
      toast.error(<Toast message="Thông tin không hợp lệ" />, {
        className: "fail",
      });
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
        } else if (!/^(03|05|07)\d{8}$/.test(this.state.phone)) {
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
      case "pass":
        if (!this.state.pass) {
          this.setState({
            isValid: false,
            errors: { ...this.state.errors, pass: "Nhập mật khẩu" },
          });
        } else if (this.state.pass.length < 8) {
          this.setState({
            isValid: false,
            errors: {
              ...this.state.errors,
              pass: "Mật khẩu có ít nhất 8 ký tự",
            },
          });
        } else
          this.setState({
            isValid: true,
            errors: { ...this.state.errors, pass: "" },
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

  handleImage = (e) => {
    const selectedImage = e.target.files[0];
    this.setState({
      avatar: selectedImage,
      isValid: true,
    });
  };

  showOption = (option) => {
    this.setState({ option: option });
  };

  render() {
    return (
      <Fragment>
        <Header type={0} option={this.showOption} />

        <div className={`pt_cus ${this.state.option ? 'add_pt' : ''}`}>
          <div className="">
            {typeof this.props.location.state.edit !== "undefined" ? (
              <Link to="/order" className="return_order">
                <i className="fa-solid fa-left-long"></i>
              </Link>
            ) : (
              ""
            )}
          </div>
          {/* <div className="col-xl-11 col-sm-10"> */}
          <form
            onSubmit={this.handleSubmit}
            className="col-xl-7 col-sm-10 form_detail"
            enctype="multipart/form-data"
          >
            <h1 className="update_title">
              {this.state.isProfile
                ? "Cập nhật thông tin tài khoản"
                : "Cập nhật thông tin giao hàng"}
            </h1>
            <div className="mt-4">
              <label htmlFor="fullname">Họ Tên</label>
              <input
                name="fullname"
                type="text"
                className="update_input"
                // placeholder="Họ Tên"
                value={this.state.fullname}
                onChange={this.handleChange}
              />
              {this.state.errors.fullname && (
                <div className="reg_error">{this.state.errors.fullname}</div>
              )}
            </div>
            <div className="mt-4">
              <label htmlFor="email">Email</label>
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
            <div className="mt-4">
              <label htmlFor="address">Địa chỉ</label>
              <textarea
                name="address"
                type="text"
                className="update_textarea"
                placeholder="Địa chỉ"
                value={this.state.address}
                onChange={this.handleChange}
                rows="7"
              ></textarea>
              {this.state.errors.address && (
                <div className="reg_error">{this.state.errors.address}</div>
              )}
            </div>
            <div className="row mt-4">
              <div className={this.state.isProfile ? "col-10" : "col-12"}>
                <label htmlFor="phone">Số Điện Thoại</label>
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
              {/* <div
                className={`col-6 ${
                  this.state.isProfile ? "d-block" : "d-none"
                } position-relative`}
              >
                <label htmlFor="pass">Mật Khẩu</label>
                <input
                  name="pass"
                  type={this.state.showpass ? "text" : "password"}
                  className="update_input"
                  placeholder="Mật Khẩu"
                  value={this.state.pass}
                  onChange={this.handleChange}
                />
                <span
                  className="show_pass"
                  onClick={() =>
                    this.setState({ showpass: !this.state.showpass })
                  }
                >
                  {this.state.showpass ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </span>

                {this.state.errors.pass && (
                  <div className="reg_error">{this.state.errors.pass}</div>
                )}
              </div> */}
            </div>
            <div className={this.state.isProfile ? "d-block" : "d-none"}>
              <label htmlFor="avatar" className="update_avatar">
                Ảnh Đại Diện
              </label>
              <input
                id="avatar"
                name="avatar"
                type="file"
                style={{ display: "none" }}
                onChange={this.handleImage}
                accept="image/png , image/jpeg, image/webp"
              />
              <div className="text-center">
                <div>
                  {this.state.avatar ? (
                    <img
                      src={this.state.avatar.name}
                      alt=""
                      className="img_avatar"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {this.state.imgReview && !this.state.avatar ? (
                    <img
                      src={`http://localhost:3005/uploads/${this.state.imgReview}`}
                      alt=""
                      className="img_avatar"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div
              className={`col-12 mt-5 row ${
                this.state.isCoun
                  ? "justify-content-between"
                  : "justify-content-center"
              } text-center`}
            >
              {this.state.isCoun && this.state.isProfile ? (
                <Link to="/profile" className="col-3 btn_inupdate">
                  <i className="fa-solid fa-angles-left"></i>
                  Trở về
                </Link>
              ) : !this.state.isCoun && this.state.isProfile ? (
                <Link to="/profile" className="col-3 btn_inupdate">
                  <i className="fa-solid fa-angles-left"></i>
                  Thoát
                </Link>
              ) : !this.state.isCoun && !this.state.isProfile ? (
                <Link to="/cart" className="col-3 btn_inupdate">
                  <i className="fa-solid fa-angles-left"></i>
                  Thoát
                </Link>
              ) : null}
              <button
                onClick={this.handleSubmit}
                className="btn_updateinfo col-12 text-center"
              >
                Lưu thông tin
              </button>

              {this.state.isCoun && !this.state.isProfile ? (
                <Link to="/order" className="col-3 btn_inupdate">
                  Tiếp tục <i className="fa-solid fa-angles-right"></i>
                </Link>
              ) : null}
            </div>
          </form>
        </div>

        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.login.user,
    isUpdate: state.login.update,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateInfo: (info) => dispatch(updateInfo(info)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdateInfoForm));
