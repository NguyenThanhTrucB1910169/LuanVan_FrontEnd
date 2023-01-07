import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../home/footer";
import "./login.css";
import {authUsers} from "../../store/actions/usersAction"
import Toast from "../home/toast";
import { toast, ToastContainer } from "react-toastify";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: ''
    }
  }

  handleLogin = async(e) => {
    e.preventDefault();
    // this.props.result = ''
    await this.props.authUser(this.state)
    console.log(this.props.user)
    if(this.props.result){
        this.props.history.push('/')
    }
    else {
      toast.error( <Toast message='Tên hoặc mật khẩu không hợp lệ'/>,{
        className: "fail"
      }
      )
     
    }
}

render() {
    // console.log(this.props.result)
    return (
      <Fragment>
        <div className="login-container">
          <div className="screen">
            <div className="screen-content">
              <Link to="/register" className="back-icon">
                <i className="fa-solid fa-chevron-left"></i>
              </Link>
              <form className="login">
                <h2 className="text-uppercase pb-4">đăng nhập</h2>
                <div className="login-field">
                <i className="login-icon fa-solid fa-user"></i>
                  <input type="text" className="login-input" placeholder="Tên tài khoản" 
                    value={this.state.username}
                    onChange={(e) => this.setState({username: e.target.value})}
                  />
                </div>
                <div className="login-field">
                  <i className="login-icon fa-solid fa-key"></i>
                  <input
                    type="password"
                    className="login-input"
                    placeholder="Mật khẩu"
                    value={this.state.password}
                    onChange={(e) => this.setState({password: e.target.value})}
                  />
                </div>
                <button className="button login-submit" onClick={this.handleLogin}>
                  <span className="button-text">Đăng Nhập</span>
                  <i className="button-icon fas fa-chevron-right"></i>
                </button>
                <ToastContainer />
              </form>
              <h5 className="text-center text-lowercase">Hoặc</h5>
               
                <button className="btn btn-lg btn-block social">
            <i className="fab fa-google"></i>Tiếp tục với Google
          </button>
            
            </div>
            <div className="screen-background">
              <span className="screen-background-shape screen-background-shape4"></span>
              <span className="screen-background-shape screen-background-shape3"></span>
              <span className="screen-background-shape screen-background-shape2"></span>
              <span className="screen-background-shape screen-background-shape1"></span>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.newUser.user,
    result: state.newUser.isAuth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authUser: (val) => dispatch(authUsers(val))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
