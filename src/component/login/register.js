import React, { Fragment } from "react";
import { connect } from "react-redux";
import "./register.css";
import Footer from "../home/footer";
import { createUsers } from "../../store/actions/usersAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Toast from "../home/toast";
// import {Al}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmpassword: "",
      email: "",
      gender: "",
    };
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.createNewAccount(this.state);
    if (this.props.result) {
      toast.success(
          <Toast message="Tạo tài khoản thành công." />
        , {
        onClose: () => {
          this.setState({
            username: "",
            password: "",
            confirmpassword: "",
            email: "",
            gender: "",
          });
          // this.props.history.push("/");
        },
        className: 'success'
      });

      // console.log(e.target)
    }
  };

  render() {
    return (
      <Fragment>
        <div
          className="signup-img"
          style={{ backgroundImage: 'url("./sign-7.avif")' }}
        ></div>
        {/* <div className="signup-container"> */}
        <div className="row g-0 justify-content-between signup">
          <div className="col-xl-7 h-100">
            <div className="card-body p-md-5 text-black">
              <form
                action=""
                encType="multipart/form-data"
                // onSubmit={this.handleSubmit}
              >
                <h1 className="mb-2 text-uppercase text-center font-title">
                  đăng ký
                </h1>
              
                <div className="mb-4">
                  <label className="d-block">
                    Tên tài khoản
                    <input
                      type="text"
                      className="form-control form-control-lg border-bt"
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                      value={this.state.username}
                    />
                  </label>
                </div>
                <div className="mb-4">
                  <label className="d-block">
                    Email
                    <input
                      type="text"
                      className="form-control form-control-lg border-bt"
                      onChange={(e) => this.setState({ email: e.target.value })}
                      value={this.state.email}
                    />
                  </label>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="">
                      <label className="form-label">
                        Mật khẩu
                        <input
                          type="password"
                          className="form-control form-control-lg border-bt"
                          onChange={(e) =>
                            this.setState({ password: e.target.value })
                          }
                          value={this.state.password}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="">
                      <label className="form-label">
                        Xác nhận mật khẩu
                        <input
                          type="password"
                          className="form-control form-control-lg border-bt"
                          onChange={(e) =>
                            this.setState({ confirmpassword: e.target.value })
                          }
                          value={this.state.confirmpassword}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                  <h6 className="mb-0 me-4">Giới Tính: </h6>

                  <div
                    className="form-check form-check-inline mb-0 me-4"
                    onChange={(e) => this.setState({ gender: e.target.value })}
                    value={this.state.gender}
                  >
                    <label className="form-check-label me-5">
                      Nữ
                      <input
                        className="form-check-input check-gerder"
                        type="radio"
                        name="inlineRadioOptions"
                        value="Female"
                      />
                    </label>
                    <label className="form-check-label me-5">
                      Nam
                      <input
                        className="form-check-input check-gerder"
                        type="radio"
                        name="inlineRadioOptions"
                        value="Male"
                      />
                    </label>
                    <label className="form-check-label">
                      Khác
                      <input
                        className="form-check-input check-gerder"
                        type="radio"
                        name="inlineRadioOptions"
                        value="Others"
                      />
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-end pt-3">
                  <button type="button" className="button-reset">
                    <i class="fa-solid fa-rotate-right me-2"></i>
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
                    <ToastContainer />
                  </div>
                </div>
                <p className="text-capitalize mt-4 mb-0">bạn đã có tài khoản
                  {/* <a href=""></a> */}
                  <Link to="/login" className="btn-direct ps-2">Đăng nhập</Link>
                </p>
              </form>
            </div>
          </div>
          <div className="col-xl-5 d-none d-xl-block">
            <img
              src="./signgif.gif"
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
