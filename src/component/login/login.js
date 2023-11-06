import React, { useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Footer from "../home/footer";
import "./login.css";
import { authUsers, createUsers } from "../../store/actions/usersAction";
import Toast from "../home/toast";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
// import { Visibility } from "@material-ui/icons";

const Login = () => {
  const { tab } = useParams();
  const [username, setUsername] = useState("");
  const [current, setCurrent] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [onTab, setOnTap] = useState(tab);
  const role = useSelector((state) => state.login.role);
  const result = useSelector((state) => state.newUser.message);
  const [hasClickedLogin, setHasClickedLogin] = useState(false);
  const [error, setError] = useState({
    username: "",
    password: "",
    confirmpassword: "",
    email: "",
    gender: "",
  });
  const [info, setInfo] = useState({
    username: "",
    password: "",
    confirmpassword: "",
    email: "",
    gender: "",
    // showPassword:''
  });
  // const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [showPassword, setShowpass] = useState("");
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const validateForm = (name) => {
    let errors = {};
    // console.log(typeof name)
    switch (name) {
      case "username":
        console.log(info.username);
        if (info.username === "") {
          // setIsValid(false);
          setError((prevState) => ({
            ...prevState,
            username: "Nhập tên tài khoản",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            username: "",
          }));
        }
        return errors;
      case "password":
        console.log(info.password);
        if (info.password === "") {
          setError((prevState) => ({
            ...prevState,
            password: "Nhập mật khẩu",
          }));
        } else if (info.password.length < 8) {
          setError((prevState) => ({
            ...prevState,
            password: "Mật khẩu ít nhất 8 ký tự",
          }));
        } else
          setError((prevState) => ({
            ...prevState,
            password: "",
          }));
        return errors;
      case "confirmpassword":
        if (info.confirmpassword === "") {
          setError((prevState) => ({
            ...prevState,
            confirmpassword: "Nhập lại mật khẩu",
          }));
        } else if (info.confirmpassword !== info.password) {
          setError((prevState) => ({
            ...prevState,
            confirmpassword: "Mật khẩu không trùng khớp",
          }));
        } else
          setError((prevState) => ({
            ...prevState,
            confirmpassword: "",
          }));
        return errors;
      case "gender":
        if (!info.gender) {
          setError((prevState) => ({
            ...prevState,
            gender: "Vui lòng chọn giới tính",
          }));
        } else
          setError((prevState) => ({
            ...prevState,
            gender: "",
          }));
        return errors;
      case "email":
        console.log("CASE EMAIL");
        console.log(
          /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(info.email)
        );
        if (!info.email) {
          setError((prevState) => ({
            ...prevState,
            email: "Vui lòng nhập email",
          }));
        } else if (
          !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(info.email)
        ) {
          setError((prevState) => ({
            ...prevState,
            email: "Email không hợp lệ",
          }));
        } else
          setError((prevState) => ({
            ...prevState,
            email: "",
          }));
        return errors;
      default:
        return errors;
    }
  };
  const handleReset = () => {
    setInfo({
      username: "",
      password: "",
      confirmpassword: "",
      email: "",
      gender: "",
    });
    setError({
      username: "",
      password: "",
      confirmpassword: "",
      email: "",
      gender: "",
    });
    setCurrent('')
  };

  const handleChange = (event) => {
    setInfo((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    setCurrent(event.target.name);
  };
  useEffect(() => {
    console.log(info);
    console.log(current);
    validateForm(current);
  }, [current, info]);
  const switchTabs = (tab) => {
    if (tab === "login") {
      setOnTap("1");
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      setOnTap("2");
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  const isValid = () => {
    if (error.username === "" && error.password === "") {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    setInfo((prevInfo) => ({
      ...prevInfo,
    }));
    setError({
      username: "",
      password: "",
      confirmpassword: "",
      email: "",
      gender: "",
    });
    console.log(onTab);
    console.log(info);
  }, [onTab]);
  useEffect(() => {
    let name = "";
    if (tab === "1") {
      name = "login";
    } else {
      name = "register";
    }
    switchTabs(name);
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(isValid());
    if (isValid()) {
      await dispatch(
        authUsers({
          username: info.username,
          password: info.password,
        })
      );
      // console.log(role);
    }
    setHasClickedLogin(true);
  };

  useEffect(() => {
    console.log(role);
    console.log(hasClickedLogin);
    if (hasClickedLogin && typeof role === "number") {
      if (role === 0) {
        toast.success(<Toast message="Đăng nhập thành công" />, {
          className: "success",
        });
        history.push("/");
        return;
      } else if (role === 1) {
        history.push("/ad/dashboard");
        return;
      } else if (role === 2) {
        console.log("lỗi");
        toast.error(<Toast message="Tên hoặc mật khẩu không hợp lệ" />, {
          className: "fail",
        });
      }
    }
  }, [role, hasClickedLogin]);

  const checkRegis = () => {
    if (
      info.username !== "" &&
      info.password !== "" &&
      info.email !== "" &&
      info.gender !== "" &&
      info.confirmpassword !== ""
    ) {
      return true;
    } else return false;
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    if (checkRegis()) {
      await dispatch(createUsers(info));
      if (result) {
        toast.success(<Toast message="Tạo tài khoản thành công." />, {
          onClose: () => {
            setInfo({
              username: "",
              password: "",
              confirmpassword: "",
              email: "",
              gender: "",
            });
            setError({});
            setCurrent('')
          },
          className: "success",
        });
      }
    } else {
      toast.error(<Toast message="Thông tin không hợp lệ" />, {
        className: "fail",
      });
    }
  };
  return (
    <Fragment>
    <div className="position-relative" style={{height: '100vh'}}>
      <div className="d-flex flex-sm-column login-container">
      </div>
        <div className="m-sm-0 screen col-sm-12">
          <div className="screen-content">
            <button className="back-icon" onClick={() => history.goBack()}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div>
              <div className="login_toggle">
                <p onClick={() => switchTabs("login")}>Đăng Nhập</p>
                <p onClick={() => switchTabs("register")} className="">
                  Đăng Ký
                </p>
              </div>
              <button ref={switcherTab} className="line_swicth"></button>
            </div>
            <form className="loginForm" ref={loginTab}>
              {/* <h2 className="text-uppercase pb-4">đăng nhập</h2> */}
              <div className="login-field">
                <i className="login-icon fa-solid fa-user"></i>
                <input
                  type="text"
                  className="w-sm-100 w-xl-75 login-input"
                  name="username"
                  placeholder="Tên tài khoản"
                  value={info.username}
                  onChange={handleChange}
                />
                {error.username && (
                  <div className="login_error">{error.username}</div>
                )}
              </div>
              <div className="login-field position-relative">
                <i className="login-icon fa-solid fa-key"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  className="login-input"
                  placeholder="Mật khẩu"
                  name="password"
                  value={info.password}
                  onChange={handleChange}
                />
                <span
                  onClick={() => setShowpass(!showPassword)}
                  className="showpass_login"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </span>

                {error.password && (
                  <div className="login_error">{error.password}</div>
                )}
              </div>
              <button className="login_submit" onClick={handleLogin}>
                <span className="">Đăng Nhập</span>
                <i className="fa-solid fa-angles-right"></i>
              </button>
            </form>
            <form
              className="signUpForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="signup-field">
                <i className="signup-icon fa-solid fa-user"></i>
                <input
                  type="text"
                  className="w-sm-100 w-xl-75 signup-input"
                  name="username"
                  placeholder="Tên tài khoản"
                  value={info.username}
                  onChange={handleChange}
                />
                {error.username && (
                  <div className="login_error">{error.username}</div>
                )}
              </div>
              <div className="signup-field">
                <i className="signup-icon fa-solid fa-envelope"></i>
                <input
                  type="text"
                  className="w-sm-100 w-xl-75 signup-input"
                  name="email"
                  placeholder="Email"
                  value={info.email}
                  onChange={handleChange}
                />
                {error.email && <div className="reg_error">{error.email}</div>}
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="">
                    <div className="signup-field">
                      <i className="signup-icon fa-solid fa-key"></i>
                      <input
                        type="password"
                        className="form-control form-control-lg signup-input"
                        name="password"
                        placeholder="Mật khẩu"
                        value={info.password}
                        onChange={handleChange}
                      />
                      {error.password && (
                        <div className="reg_error">{error.password}</div>
                      )}
                    </div>
                    {/* <label className="w-100 form-label">
                      Mật khẩu
                      <input
                        type="password"
                        className="form-control form-control-lg border-bt"
                        name="password"
                        onChange={handleChange}
                        value={info.password}
                      />
                    </label> */}
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="signup-field">
                    <i className="signup-icon fa-solid fa-key"></i>
                    <input
                      type="password"
                      className="form-control form-control-lg signup-input"
                      name="confirmpassword"
                      placeholder="Xác nhận mật khẩu"
                      value={info.confirmpassword}
                      onChange={handleChange}
                    />
                    {error.confirmpassword && (
                      <div className="reg_error">{error.confirmpassword}</div>
                    )}
                  </div>
                  {/* <div className="">
                    <label className="w-100 form-label">
                      Xác nhận mật khẩu
                      <input
                        type="password"
                        className="form-control form-control-lg border-bt"
                        name="confirmpassword"
                        onChange={handleChange}
                        value={info.confirmpassword}
                      />
                    </label>
                    {error.confirmpassword && (
                      <div className="reg_error">{error.confirmpassword}</div>
                    )}
                  </div> */}
                </div>
              </div>
              <div className="d-flex flex-sm-column flex-md-row justify-content-start align-items-start py-3 ps-3 input_font">
                <h6 className="mb-0 me-4">Giới Tính: </h6>
                <div
                  className="form-check form-check-inline mb-0 me-4"
                  name="gender"
                  // onChange={handleChange}
                  // value={this.state.gender}
                >
                  <label className="form-check-label me-5">
                    <span className="label_gender">Nữ</span>
                    <input
                      className="form-check-input check-gerder"
                      type="radio"
                      name="gender"
                      checked={info.gender === "1" ? true : false}
                      onChange={handleChange}
                      value="1"
                    />
                  </label>
                  <label className="form-check-label me-5">
                    <span className="label_gender">Nam</span>
                    <input
                      className="form-check-input check-gerder"
                      type="radio"
                      name="gender"
                      checked={info.gender === "0" ? true : false}
                      onChange={handleChange}
                      value="0"
                    />
                  </label>
                  {error.gender && (
                    <div className="reg_error">{error.gender}</div>
                  )}
                </div>
              </div>
              <div className='text-center'>
                <button
                  type="submit"
                  className="btn-submit"
                  onClick={registerSubmit}
                >
                  Đăng Ký
                </button>
              </div>
              <button
                type="button"
                className="button-reset"
                onClick={handleReset}
              >
                <i className="fa-solid fa-rotate-right me-2"></i>
                Đặt lại
              </button>
            </form>
          </div>
          {/* <div className="d-sm-none d-lg-block screen-background">
            <span className="screen-background-shape2"></span>
          </div> */}
        </div>
    </div>
      <Footer />
    </Fragment>
  );
};

export default Login;
