import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from "../home/toast";
import {useSelector} from 'react-redux'

const AdRoute = (props) => {
  const [role] = useSelector((state) => state.login.role)
  useEffect(() => {
    const isActive = JSON.parse(localStorage.getItem('isactive'));

    if (!isActive) {
      toast.warning(<Toast message="Đăng nhập để tiếp tục" />, {
        className: 'warning',
      });
    } else if(isActive && role !== 1){
      toast.warning(<Toast message="Đăng nhập dưới quyền admin" />, {
        className: 'warning',
      });
    }
  }, []);

  const isActive = JSON.parse(localStorage.getItem('isactive'));

  return (
    <React.Fragment>
      {isActive ? (
        <Route component={props.component}></Route>
      ) : (
        <React.Fragment>
          <ToastContainer />
          <Redirect to="/login"></Redirect>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default AdRoute;