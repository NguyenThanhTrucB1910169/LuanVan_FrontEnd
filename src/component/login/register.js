import React, { Fragment } from "react";
import { connect } from "react-redux";
import "./register.css";
import Footer from "../home/footer";
import { createUsers } from "../../store/actions/usersAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Toast from "../home/toast";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmpassword: "",
      email: "",
      gender: "",
      isValid: true,
      errors: {},
      creatClick: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
  
    if (this.isEmpty()) {
      try {
        await this.props.createNewAccount(this.state);
  
        if (this.props.result) {
          toast.success(<Toast message="Tạo tài khoản thành công." />, {
            onClose: () => {
              this.setState({
                username: "",
                password: "",
                confirmpassword: "",
                email: "",
                gender: "",
              });
              this.setState({errors: {}})
            },
            className: "success",
          });
        }
      } catch (error) {
        toast.error(<Toast message="Đã xảy ra lỗi khi tạo tài khoản." />, { className: "fail" });
        console.error("Lỗi: ", error);
      }
    } else {
      toast.error(<Toast message="Thông tin không hợp lệ" />, { className: 'fail' });
    }
  };
  

  handleReset = () => {
    this.setState({
      username: "",
      password: "",
      confirmpassword: "",
      email: "",
      gender: "",
      errors: {},
    });
  };

  isEmpty = () => {
    if (
      this.state.username !== "" &&
      this.state.password !== "" &&
      this.state.email !== "" &&
      this.state.gender !== "" &&
      this.state.confirmpassword !== "" &&
      this.state.isValid === true
    ) {
      return true;
    } else return false;
  };

  validateForm = (name) => {
    let errors = {};
    switch (name) {
      case "username":
        if (!this.state.username) {
          this.setState(
            {
              isValid: false,
              errors: { ...this.state.errors, username: "Nhập tên tài khoản" },
            },
            () => {}
          );
        } else
          this.setState(
            {
              isValid: true,
              errors: { ...this.state.errors, username: "" },
            },
            () => {}
          );
        return errors;
      case "confirmpassword":
        if (!this.state.confirmpassword) {
          this.setState(
            {
              isValid: false,
              errors: {
                ...this.state.errors,
                confirmpassword: "Nhập lại mật khẩu",
              },
            },
            () => {}
          );
        } else if (this.state.confirmpassword !== this.state.password) {
          this.setState({
            isValid: false,
            errors: {
              ...this.state.errors,
              confirmpassword: "Không trùng khớp",
            },
          });
        } else
          this.setState({
            isValid: true,
            errors: {
              ...this.state.errors,
              confirmpassword: "",
            },
          });
        return errors;
      case "password":
        if (!this.state.password) {
          this.setState(
            {
              passValid: false,
              errors: { ...this.state.errors, password: "Nhập mật khẩu" },
            },
            () => {}
          );
        }
        if (this.state.password.length < 8) {
          this.setState({
            isValid: false,
            errors: {
              ...this.state.errors,
              password: "Mật khẩu ít nhất 8 ký tự",
            },
          });
        } else
          this.setState(
            {
              isValid: true,
              errors: { ...this.state.errors, password: "" },
            },
            () => {}
          );
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
      case "gender":
        console.log(this.state.gender)
        if (!this.state.gender) {
          this.setState({
            isValid: false,
            errors: { ...this.state.errors, gender: "Chọn giới tính" },
          });
        } else
          this.setState({
            isValid: true,
            errors: { ...this.state.errors, gender: "" },
          });
        return errors;
      default:
        return errors;
    }
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.validateForm(event.target.name);
    });
  };

  render() {
    return (
      <Fragment>
        <div
          className="signup-img"
          // style={{ backgroundImage: 'url("./sign-7.avif")' }}
        >
          <img src="./sign-8.avif" alt="" />
        </div>
        {/* <div className="signup-container"> */}
        <div className="row g-0 justify-content-between signup">
          <div className="col-sm-12 col-xl-7 h-100 cus_font">
            <div className="card-body p-sm-3 p-md-5 text-black">
              <form
                action=""
                encType="multipart/form-data"
                // onSubmit={this.handleSubmit}
              >
                <h1 className="mb-3 text-uppercase text-center">đăng ký</h1>
                <div className="mb_1">
                  <label className="d-block">
                    Tên tài khoản
                    <input
                      type="text"
                      className="form-control form-control-lg border-bt"
                      name="username"
                      onChange={this.handleChange}
                      value={this.state.username}
                    />
                  </label>
                  {this.state.errors.username && (
                    <div className="reg_error">
                      {this.state.errors.username}
                    </div>
                  )}
                </div>
                <div className="mb_1">
                  <label className="d-block">
                    Email
                    <input
                      type="text"
                      className="form-control form-control-lg border-bt"
                      name="email"
                      onChange={this.handleChange}
                      value={this.state.email}
                    />
                  </label>
                  {this.state.errors.email && (
                    <div className="reg_error">{this.state.errors.email}</div>
                  )}
                </div>

                <div className="row mb_1">
                  <div className="col-sm-12 col-md-6">
                    <div className="">
                      <label className="w-100 form-label">
                        Mật khẩu
                        <input
                          type="password"
                          className="form-control form-control-lg border-bt"
                          name="password"
                          onChange={this.handleChange}
                          value={this.state.password}
                        />
                      </label>
                      {this.state.errors.password && (
                        <div className="reg_error">
                          {this.state.errors.password}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div className="">
                      <label className="w-100 form-label">
                        Xác nhận mật khẩu
                        <input
                          type="password"
                          className="form-control form-control-lg border-bt"
                          name="confirmpassword"
                          onChange={this.handleChange}
                          value={this.state.confirmpassword}
                        />
                      </label>
                      {this.state.errors.confirmpassword && (
                        <div className="reg_error">
                          {this.state.errors.confirmpassword}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-sm-column flex-md-row justify-content-start align-items-start py-2">
                  <h6 className="mb-0 me-4">Giới Tính: </h6>
                  <div
                    className="form-check form-check-inline mb-0 me-4"
                    name="gender"
                    // onChange={this.handleChange}
                    // value={this.state.gender}
                  >
                    <label className="form-check-label me-5">
                      <span className="label_gender">Nữ</span>
                      <input
                        className="form-check-input check-gerder"
                        type="radio"
                        name="gender"
                        checked={this.state.gender === "1" ? true : false}
                        onChange={this.handleChange}
                        value="1"
                      />
                    </label>
                    <label className="form-check-label me-5">
                      <span className="label_gender">Nam</span>
                      <input
                        className="form-check-input check-gerder"
                        type="radio"
                        name="gender"
                        checked={this.state.gender === "0" ? true : false}
                        onChange={this.handleChange}
                        value="0"
                      />
                    </label>
                    {this.state.errors.gender && (
                      <div className="reg_error">
                        {this.state.errors.gender}
                      </div>
                    )}
                    {/* <div className="reg_error">Chọn giới tính</div> */}
                  </div>
                </div>
                <div className="d-flex justify-content-end pt-3">
                  <button
                    type="button"
                    className="button-reset"
                    onClick={this.handleReset}
                  >
                    <i className="fa-solid fa-rotate-right me-2"></i>
                    Đặt lại
                  </button>
                  <div>
                    <button
                      type="submit"
                      className="btn-submit"
                      onClick={this.handleSubmit}
                    >
                      Đăng Ký
                    </button>
                  </div>
                </div>
                <p className="text-capitalize mt-4 mb-0">
                  bạn đã có tài khoản
                  {/* <a href=""></a> */}
                  <Link to="/login" className="btn-direct ps-2">
                    Đăng nhập
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <div className="col-sm-auto col-xl-5 d-none d-xl-block">
            <img
              // src="./signgif.gif"
              src="./rg.gif"
              alt="logo"
              className="img-fluid img-signup"
            />
          </div>
          {/* </div> */}
        </div>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    result: state.newUser.message,
  };
};

const mapDispatchToPro = (dispatch) => {
  return {
    createNewAccount: (val) => dispatch(createUsers(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToPro)(Register);
