import React, { useState } from "react";
import { useSelector } from "react-redux"; 
import { Link } from "react-router-dom";
import "./profile.css";
import { Fragment } from "react";
import Header from "../home/header";
import Footer from "../home/footer";

const Profile = () => {
  const info = useSelector((state) => state.login.user); 
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <Header />
      {info !== null ? (
        <div className="h-100 mb_pf">
          <div className="user_profile">
            <div className="row g-0">
              <div className="col-md-3 card profile_card">
                <img
                  src={
                    info.avatar
                      ? `http://localhost:3005/uploads/${info.avatar}`
                      : "./products/df-ava.png"
                  }
                  alt="Avatar"
                  className="img-fluid"
                />
                <h5>{info.username}</h5>
                <p>{info.gender ? "Nữ" : "Nam"}</p>
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
                        <i className="fa-regular fa-envelope"></i>
                        Email
                      </h5>
                      <h5 className="col-6 text-muted profile_content">
                        {info.email}
                      </h5>
                    </div>
                    <div className="row justify-content-between">
                      <h5 className="col-4 profile_title">
                        <i className="fa-solid fa-signature"></i>Họ Tên
                      </h5>
                      <h5 className="col-6 text-muted profile_content">
                        {info.fullname
                          ? info.fullname
                          : "Chưa cập nhật"}
                      </h5>
                    </div>
                    <div className="row justify-content-between">
                      <h5 className="col-4 profile_title">
                        <i className="fa-solid fa-phone-volume"></i>SĐT
                      </h5>
                      <h5 className="col-6 text-muted profile_content">
                        {info.phone
                          ? info.phone
                          : "Chưa cập nhật"}
                      </h5>
                    </div>
                    <div className="row justify-content-between">
                      <h5 className="col-3 profile_title">
                        <i className="fa-solid fa-location-pin"></i>Địa chỉ
                      </h5>
                      <h5 className="col-6 text-muted profile_content">
                        {info.address
                          ? info.address
                          : "Chưa cập nhật"}
                      </h5>
                    </div>
                    <div className="row justify-content-between">
                      <h5 className="col-3 profile_title">
                        <i className="fa-solid fa-lock"></i>Mật Khẩu
                      </h5>
                      <h5 className="col-6 text-muted profile_content">
                        <span>
                          {show
                            ? info.password
                            : "*".repeat(8)}
                        </span>

                        <button
                          onClick={() => setShow(!show)}
                          className="icon_showpass"
                        >
                          {show ? (
                            <i className="fa-regular fa-eye-slash"></i>
                          ) : (
                            <i className="fa-regular fa-eye"></i>
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
};

export default Profile;
