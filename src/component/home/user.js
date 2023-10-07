import React, { Fragment, useEffect, useState } from "react";
import "./user.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
// import { useAlert } from "react-alert";
import { logoutHandler } from "../../store/actions/usersAction";
// import { logout } from "../../../actions/userAction";
import Toast from "./toast";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const role = useSelector((state) => state.login.role);
  // const [prevRole, setPrevRole] = useState(role)
  const cartItem = useSelector((state) => state.cart.cartItem);
  const user = useSelector((state) => state.login.user);
  const [isLogout, setLogout] = useState(false);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  // const alert = useAlert();
  const dispatch = useDispatch();
  const isActive = JSON.parse(localStorage.getItem("isactive"));


  const options = [
    { icon: <HomeIcon />, name: "Trang Chủ", func: dashboard },
    { icon: <ListAltIcon />, name: "Đơn Hàng", func: orders },
    { icon: <PersonIcon />, name: "Tài Khoản", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItem.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `${cartItem.length}`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Đăng Xuất", func: logoutUser },
  ];

  function dashboard() {
    history.push("/");
  }

  function orders() {
    history.push("/vieworder");
  }
  function account() {
    history.push("/profile");
  }
  function cart() {
    history.push("/cart");
  }
  async function logoutUser() {
    console.log(role)
    // const currentRole = role;
    dispatch(logoutHandler());
    setLogout(true)
    history.push("/");
  }

  // useEffect(() => {
  //   if(isLogout){
  //     if(isActive){
  //       toast.error(<Toast message="Đăng xuất không thành công" />, {
  //         className: "error",
  //       });
  //     }else{
  //       toast.success(<Toast message="Đăng xuất thành công" />, {
  //         className: "success",
  //       });
  //     }
  //   }
      
  // }, [isActive]);

  useEffect(() => {
    console.log(role);
    console.log(isLogout);
  }, [role, isLogout]);
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "99" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "99" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img className="speedDialIcon" src={user && user.avatar ? user.avatar : "./avatar_default.png"} alt="Profile" />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default User;
