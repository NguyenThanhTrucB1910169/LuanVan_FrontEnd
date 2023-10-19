import React from "react";
import { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import Toast from "../home/toast";
import { toast, ToastContainer } from "react-toastify";

class AuthRoute extends React.Component {
  // constructor() {
  //   this.shouldRedirect = true; // Điều kiện để xác định xem có chuyển hướng hay không
  // }

  // toRedirect = () => {
  //   if (this.shouldRedirect) {
  //     // Nếu điều kiện đúng, sẽ chuyển hướng đến /login/1
  //     return 
  //   }
  // }
  componentDidMount = () => {
    if(this.isActive === false){
      toast.warning(<Toast message="Đăng nhập để tiếp tục"/>,{
          className: "warning",
        })
      return  <Redirect to={`/login/${1}`} />
    }
  };

  render() {
    this.isActive = JSON.parse(localStorage.getItem("isactive"));
    return (
      <Fragment>
        {this.isActive !== false ? (
          <Route component={this.props.component}></Route>
        ) : (
          <Fragment>
            <ToastContainer />
            {/* <Redirect to="/login/1"></Redirect> */}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default AuthRoute;
