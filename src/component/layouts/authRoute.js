import React from "react";
import { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import Toast from "../home/toast";
import { toast, ToastContainer } from "react-toastify";

class AuthRoute extends React.Component {

  componentDidMount = () => {
    if(this.isActive === false){
      toast.warning(<Toast message="Đăng nhập để tiếp tục"/>,{
          className: "warning",
        })
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
            <Redirect to="/login"></Redirect>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default AuthRoute;
