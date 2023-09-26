import * as Types from "../constants/actionType";
import axios from "axios";

const createUsers = (req) => {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:3005/api/signup", req).then((val) => {
        if (val.data === true) {
          dispatch({
            type: Types.CREATE_USER,
          });
        } else {
          dispatch({
            type: Types.CREATE_USER_FAILED,
          });
        }
      });
    } catch (error) {
      dispatch({
        type: Types.CREATE_USER_FAILED,
      });
    }
  };
};

const authUsers = (req, res) => {
  return async (dispatch) => {
    try {
      await axios
        .post("http://localhost:3005/api/signup/auth", req, {
          withCredentials: true,
        })
        .then((val) => {
          console.log(val.data)
          const now = new Date();
          if (val.data.isAuth) {
            let isAccess = {
              key: val.data.key,
              expiry: now.getTime() + 28800000,
              // 86400000
            };
            localStorage.setItem("isactive", JSON.stringify(isAccess));
            dispatch({
              type: Types.IS_USER,
              payload: val.data.user,
            });
          } else if (val.data.isAdmin) {
            let isAccess = {
              role: val.data.role,
              expiry: now.getTime() + 86400000,
            };
            localStorage.setItem("isactive", JSON.stringify(isAccess));
            dispatch({
              type: Types.IS_ADMIN,
              payload: val.data,
            });
          } else {
            dispatch({
              type: Types.AUTH_WRONG_INFO,
              payload: "Info wrong",
            });
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };
};

const logoutHandler = () => {
  return async (dispatch) => {
    try {
      await axios
        .get("http://localhost:3005/api/logout", { withCredentials: true })
        .then((response) => {
          localStorage.setItem("isactive", false);
          dispatch({
            type: Types.LOGOUT_SUCCESS,
            payload: response.data.message,
          });
        });
    } catch (error) {
      console.log(error);
      dispatch({
        type: Types.LOGOUT_FAILED,
        payload: error,
      });
    }
  };
};

const updateInfo = (req) => {
  return async (dispatch) => {
    try {
      await axios
        .put("http://localhost:3005/api/updateinfo", req, {
          withCredentials: true,
        })
        .then((val) => {
          if (val.data) {
            dispatch({
              type: Types.UPDATE_INFO_SUCCESS,
              payload: val.data,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: Types.UPDATE_INFO_FAILED,
        payload: error,
      });
    }
  };
};

export { createUsers, authUsers, logoutHandler, updateInfo };
