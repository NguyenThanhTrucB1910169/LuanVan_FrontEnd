import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../home/toast";
import { useSelector } from "react-redux";

const AdRoute = (props) => {
  const role = useSelector((state) => state.login.role);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  useEffect(() => {
    const isActive = JSON.parse(localStorage.getItem("isactive"));
    if (isActive) {
      if (role === 2 || role === 0) {
        toast.warning(
          <Toast
            message={
              role === 2
                ? "Đăng nhập để tiếp tục"
                : "Đăng nhập dưới quyền admin"
            }
          />,
          { className: "warning" }
        );
        setShouldRedirect(true);
      } else {
        setShouldRedirect(false);
      }
    } else {
      toast.warning(<Toast message="Đăng nhập để tiếp tục" />, {
        className: "warning",
      });
      setShouldRedirect(true);
    }
  }, []);

  const isActive = JSON.parse(localStorage.getItem("isactive"));
  if (shouldRedirect) {
    return <Redirect to={`/login/${1}`} />;
  }

  return (
    <React.Fragment>
      {isActive ? (
        <Route component={props.component}></Route>
      ) : (
        <React.Fragment>
          <ToastContainer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default AdRoute;
