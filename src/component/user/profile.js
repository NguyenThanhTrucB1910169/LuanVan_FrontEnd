import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./profile.css";
import { Fragment } from "react";
import SubHeader from "../layouts/subHeader";
import Footer from "../home/footer";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    return (
      <Fragment>
        <SubHeader />
        {this.props.info !== null ? (
           <div className="py-5 h-100 mb_pf">
          <div className="user_profile">
            <div className="row g-0">
              <div className="col-md-3 card profile_card">
                <img
                  src={
                    this.props.info.avatar
                      ? this.props.info.avatar
                      : "./products/df-ava.png"
                  }
                  alt="Avatar"
                  className="img-fluid"
                />
                <h5>{this.props.info.username}</h5>
                <p>{this.props.info.gender ? "Nữ" : "Nam"}</p>
                <Link
                  className="edit_pf"
                  to={{
                    pathname: "/updateinfo",
                    state: { profile: true },
                  }}
                >
                  <i className="far fa-edit mb-5"></i>
                </Link>
              </div>
              <div className="col-md-8">
                <div className="profile_body">
                  <h1 className="text-center mb-5 mt-0">Thông Tin</h1>

                  <div className="detail_profile">
                    <div className="row justify-content-between">
                      <h5 className="col-4 profile_title">
                        <i class="fa-regular fa-envelope"></i>
                        Email
                      </h5>
                      <h5 className="col-6 text-muted profile_content">
                        {this.props.info.email}
                      </h5>
                    </div>
                    <div className="row justify-content-between">
                      <h5 className="col-4 profile_title">
                        <i class="fa-solid fa-signature"></i>Họ Tên
                      </h5>
                      <h5 className="col-6 text-muted profile_content">
                        {this.props.info.fullname
                          ? this.props.info.fullname
                          : "Chưa cập nhật"}
                      </h5>
                    </div>
                    <div className="row justify-content-between">
                      <h5 className="col-4 profile_title">
                        <i class="fa-solid fa-phone-volume"></i>SĐT
                      </h5>
                      <h5 className="col-6 text-muted profile_content">
                        {this.props.info.phone
                          ? this.props.info.phone
                          : "Chưa cập nhật"}
                      </h5>
                    </div>
                    <div className="row justify-content-between">
                      <h5 className="col-3 profile_title">
                        <i class="fa-solid fa-location-pin"></i>Địa chỉ
                      </h5>
                      <h5 className="col-6 text-muted profile_content">
                        {this.props.info.address
                          ? this.props.info.address
                          : "Chưa cập nhật"}
                      </h5>
                    </div>
                    <div className="row justify-content-between">
                      <h5 className="col-3 profile_title">
                        <i class="fa-solid fa-lock"></i>Mật Khẩu
                      </h5>
                      <h5 className="col-6 text-muted profile_content">
                        <span>
                          {this.state.show
                            ? this.props.info.password
                            : "*".repeat(8)}
                        </span>

                        <button
                          onClick={() =>
                            this.setState({ show: !this.state.show })
                          }
                          className="icon_showpass"
                        >
                          {this.state.show ? (
                            <i class="fa-regular fa-eye-slash"></i>
                          ) : (
                            <i class="fa-regular fa-eye"></i>
                          )}
                        </button>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        ) : null}
       
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.login.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
