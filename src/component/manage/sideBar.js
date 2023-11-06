import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./sideBar.css";
import Toast from "../home/toast";
import { toast } from "react-toastify";
import { logoutHandler } from "../../store/actions/usersAction";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";

const SideBar = () => {
  const history = useHistory();
  const roleUser = useSelector((state) => state.login.role);
  const dispatch = useDispatch();
  const [logout, setLogout] = useState(false);
  useEffect(() => {
    if (logout) {
      console.log("roleUser ", roleUser);
      if (roleUser === 2) {
        toast.success(<Toast message="Đăng xuất" />, {
          onClose: () => {
            <Redirect to='/' />
          },
          className: "success",
        });
      } else if (roleUser === 1) {
        toast.error(<Toast message="Đăng xuất thất bại" />, {
          className: "fail",
        });
      }
      setLogout(false);
    }
  }, [roleUser, logout]);

  const handleLogout = async () => {
    await dispatch(logoutHandler());
    setLogout(true);
  };
  

  return (
    <div className="col-sm-4 col-lg-2 dash_nav position-fixed">
      <nav className="collapse d-block sidebar collapse">
        <div className="position-sticky">
          <div className="mx-sm-2 mx-lg-3 mt-4">
            <Link
              to="/ad/dashboard"
              className="py-2 my-sm-3 mx-sm-0 my-lg-3 mx-lg-3 item_nav_ad"
            >
              <i className="fas fa-tachometer-alt fa-fw me-3"></i>
              <span>Trang chính</span>
            </Link>
            <Link
              to="/ad/orders"
              className="py-2 my-sm-3 mx-sm-0 my-lg-3 mx-lg-3 item_nav_ad d-block"
            >
              <i className="fas fa-chart-bar fa-fw me-3"></i>
              <span>Đơn hàng</span>
            </Link>
            <div className="py-2 my-sm-3 mx-sm-0 my-lg-3 mx-lg-3 item_nav_ad ad_pd">
              <i className="fa-solid fa-file-pen me-3"></i>
              <span>Sản Phẩm</span>
              <i className="fa-solid fa-sort-down float-end"></i>
              <div className="drop_list">
                <ul className="p-0 pt-2" style={{ fontSize: "15px" }}>
                  <li>
                    <Link to="/ad/listpd">Danh Sách Sản Phẩm</Link>
                  </li>
                  <li>
                    <Link to="/ad/create">Thêm sản phẩm</Link>
                  </li>
                </ul>
              </div>
            </div>
            <Link
              to="/ad/allusers"
              className="item_nav_ad py-2 my-sm-3 mx-sm-0 my-lg-3 mx-lg-3"
            >
              <i className="fas fa-users fa-fw me-3"></i>
              <span>Người Dùng</span>
            </Link>
            <Link
              to="/ad/reviews"
              className="item_nav_ad py-2 my-sm-3 mx-sm-0 my-lg-3 mx-lg-3"
            >
              <i className="fa-solid fa-comments me-3"></i>
              <span>Đánh Giá</span>
            </Link>
            <button
              onClick={handleLogout}
              className="m-sm-0 m-lg-3 btn_logout_ad"
            >
              Đăng xuất
              <i className="fa-solid fa-arrow-right-from-bracket ms-3"></i>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
