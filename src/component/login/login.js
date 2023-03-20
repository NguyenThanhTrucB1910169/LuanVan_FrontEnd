import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
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
        password: '',
        errors: {},
        userValid: false,
        passValid: false
    }
  }

  previousPage = () => {
    this.props.history.goBack();
  }


  validateForm = (name) => {
    let errors = {};
    // console.log(typeof name)
    switch(name) {
      case 'username':
        // console.log('name', this.state.name) 
      if (!this.state.username) {
        this.setState({
          userValid: false,
          errors: {...this.state.errors, username:'Nhập tên tài khoản'}},  () => {
          // console.log(this.state.errors)
        })
       }
       else this.setState({
        userValid: true,
        errors: {...this.state.errors, username:''}},  () => {
        // console.log(this.state.errors)
      })
      // console.log(errors)
      // this.setState((prevState) => {return {...prevState, errors}}, () => {
      //   console.log(this.state.errors)
      // });
      // console.log(this.state)

      return errors;
      case 'password':
        // console.log('name', this.state.name) 
      if (!this.state.password) {
        this.setState({
          passValid: false,
          errors: {...this.state.errors, password:'Nhập mật khẩu'}},  () => {
          // console.log(this.state.errors)
        })
       }
       else this.setState({
        passValid: true,
        errors: {...this.state.errors, password:''}},  () => {
        // console.log(this.state.errors)
      })
      // console.log(errors)
      // this.setState((prevState) => {return {...prevState, errors}}, () => {
      //   console.log(this.state.errors)
      // });
      // console.log(this.state)

      return errors;
    // this.setState({ errors });
      case 'email':
        // console.log('email', this.state.email) 
        if (!this.state.email) {
          // errors.email = '';
          this.setState({errors: {...this.state.errors, email:'requied'}})
        } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
          this.setState({errors: {...this.state.errors, email:'invalid'}}, () => {
            console.log(this.state.errors)
          })
        
        }
        console.log(this.state)
        // console.log(errors);
        // this.setState((prevState) => {return {...prevState.errors, errors}}, () => {
        //   console.log(this.state.errors)
        // });
        return errors;
      default: return errors;
    }
  }

  handleChange = (event) => {
    // let type = event.target.name
    // console.log(event.target.name)
    this.setState({ [event.target.name]: event.target.value }, () => {
      // console.log(this.state)
      this.validateForm(event.target.name);
    });
  };

  handleLogin = async(e) => {
    e.preventDefault();
    console.log(this.state.passValid, this.state.userValid)
    if(this.state.passValid && this.state.userValid) {

      await this.props.authUser({username: this.state.username, password: this.state.password})
      if(this.props.result){
        toast.success(<Toast message="Đăng nhập thành công"/>, {
          className: 'success',
        })
        this.props.history.push('/')
      }
      else {
        toast.error( <Toast message='Tên hoặc mật khẩu không hợp lệ'/>,{
          className: "fail"
        }
        )
       
      }
    }
}

render() {
    // console.log(this.props.user)
    return (
      <Fragment>
        <div className="login-container">
          <div className="screen">
            <div className="screen-content">
              {/* <Link to="/register" className="">
                
              </Link> */}
              <button className="back-icon" onClick={this.previousPage}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <form className="login">
                <h2 className="text-uppercase pb-4">đăng nhập</h2>
                <div className="login-field">
                <i className="login-icon fa-solid fa-user"></i>
                  <input type="text" className="login-input" name="username" placeholder="Tên tài khoản" 
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                   {this.state.errors.username && <div className="login_error">{this.state.errors.username}</div>}
                </div>
                <div className="login-field">
                  <i className="login-icon fa-solid fa-key"></i>
                  <input
                    type="password"
                    className="login-input"
                    placeholder="Mật khẩu"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                   {this.state.errors.password && <div className="login_error">{this.state.errors.password}</div>}
                </div>
                <button className="login_submit" onClick={this.handleLogin}>
                  <span className="">Đăng Nhập</span>
                  <i className="fa-solid fa-angles-right"></i>
                </button>
                <p className="text-capitalize mt-4 mb-0 text_rg">Chưa có tài khoản !
                  {/* <a href=""></a> */}
                  <Link to="/register" className="signup_link">
                  <span>Đăng ký ngay</span>
                  <i className="fa-solid fa-user-plus"></i>
                  </Link>
                </p>
                {/* <ToastContainer /> */}
              </form>
              {/* <h5 className="text-center text-lowercase">Hoặc</h5>
               
                <button className="btn btn-lg btn-block social">
            <i className="fab fa-google"></i>Tiếp tục với Google
          </button> */}
            
            </div>
            <div className="screen-background">
              <span className="screen-background-shape1"></span>
              <span className="screen-background-shape2"></span>
              {/* <span className="screen-background-shape screen-background-shape2"></span> */}
              {/* <span className="screen-background-shape screen-background-shape1"></span> */}
              {/* <span className="screen-background-shape screen-background-shape5"></span> */}
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
    result: state.login.isAuth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authUser: (val) => dispatch(authUsers(val))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
