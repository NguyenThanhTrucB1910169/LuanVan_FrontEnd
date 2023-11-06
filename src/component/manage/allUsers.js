import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import SideBar from "./sideBar";
import { getAllUsers } from "../../store/actions/adminAction";
import "./allUsers.css";

class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: [],
    };
  }
  componentDidMount = () => {
    this.props.getUsers();
  };
  clickDetail = (id) => {
    if (this.state.open.includes(id)) {
      this.setState((prevState) => ({
        open: prevState.open.filter((number) => number !== id),
      }));
    } else this.setState((prev) => ({ open: [...prev.open, id] }));
  };
  render() {
    // console.log(this.props.users)

    return (
      <Fragment>
        <div className="row">
          <SideBar />
          <div className="main_side col-sm-8 col-lg-6 my-4 ms-3">
            <h1 className="text-center text-uppercase" style={{fontFamily: '"Playpen Sans", cursive'}}>danh sách người dùng</h1>
            {this.props.users
              ? this.props.users.map((user, key) => (
                  <div key={key} className="row user_item">
                    <div className="col-2">
                      <img
                        src={user.avatar ? user.avatar : "/products/df-ava.png"}
                        alt=""
                        className="img_ad_profile"
                      />
                    </div>
                    <div className="col-4">
                    <span className="d-block username_ttk">Tên Tài Khoản</span>
                    {user.username}</div>
                    <div className="col-3 line_user">{user.gender ? "Nữ" : "Nam"}</div>
                    <div className="col-3 text-end">
                    <button
                      onClick={() => this.clickDetail(key)}
                      className="btn_ad_detail"
                    >
                      {this.state.open.includes(key) ? (
                        <i class="fa-solid fa-angle-up"></i>
                      ) : (
                        <i class="fa-solid fa-angle-down"></i>
                      )}
                    </button>

                    </div>
                    <div
                      className={`detail_frame_user ${
                        this.state.open.includes(key) ? "d-block" : "d-none"
                      }`}
                    >
                      <div>{user.name ? `Họ Tên: ${user.name}` : null}</div>                    
                      <div>Mã KH: {user.id}</div>
                      <div className="">{user.address ? `Địa Chỉ: ${user.address}` : null}</div>
                      <div>Email: {user.email}</div>
                      <div>Mật Khẩu: {user.password}</div>

                      <div className="phone">{user.phone ? `SĐT: ${user.phone}` : null}</div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.allusers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getAllUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
