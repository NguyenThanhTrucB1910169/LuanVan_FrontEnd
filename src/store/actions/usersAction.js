import * as Types from "../constants/actionType";
import axios from "axios";

const createUsers = (req) => {
  return async (dispatch) => {
    try {
      await axios
        .post("http://localhost:3005/api/signup", req)
        .then(() => {
          dispatch({
            type: Types.CREATE_USER,
            message: "User create successfully",
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: Types.CREATE_USER_FAILED,
            message: "User create failed",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
};

const authUsers = (req, res) => {
  return async (dispatch) => {
    try {
      // axios.defaults.withCredentials = true;
      await axios
        .post("http://localhost:3005/api/signup/auth", req, {withCredentials: true})
        .then((val) => {
          if (!val.data.success) {
            dispatch({
              type: Types.AUTH_WRONG_INFO,
              payload: "Info wrong",
            });
          } else {
            const now = new Date();
            let isAccess = {
              key: val.data.key,
              expiry: now.getTime() + 28800000,
              // 86400000
            };
            localStorage.setItem("isactive", JSON.stringify(isAccess));
            dispatch({
              type: Types.AUTH_USER,
              payload: val.data.user,
            });
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };
};

const logoutHandler = () => {
  return async(dispatch) => {
    // console.log("logout");
    try {
      // axios.defaults.withCredentials = true;
      await axios.get("http://localhost:3005/api/logout", {withCredentials: true})
      .then((response) => {
        // console.log(response)
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
  return async(dispatch) => {
    try {
      // console.log(req)
      await axios.put('http://localhost:3005/api/updateinfo', req, {withCredentials: true})
      .then((val) => {
        if(val.data){
           dispatch({
          type: Types.UPDATE_INFO_SUCCESS,
          payload: val.data
        })
        }       
      })
    } catch (error) {
      dispatch({
        type: Types.UPDATE_INFO_FAILED,
        payload: error
      })
    }
  }
}

export { createUsers, authUsers, logoutHandler, updateInfo };
