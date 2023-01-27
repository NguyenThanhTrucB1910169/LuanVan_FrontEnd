import * as Types from "../constants/actionType";
import axios from "axios";

const createUsers = (req) => {
  return async (dispatch) => {
    try {
      console.log(req)
      await axios.post('http://localhost:3001/api/signup', req)
      .then (() => {
        dispatch({
          type: Types.CREATE_USER,
          message: 'User create successfully',
        })
      })
      .catch((err) => {
        console.log(err)
      })
    } catch (error) {
      console.log(error);
    }
  }
}

const authUsers = (req) => {
  return async (dispatch) => {
    try {
      // console.log(req);
      await axios.post('http://localhost:3001/api/signup/auth', req)
      .then((val) => {
        console.log(val.data.success);
        if(!val.data.success) {
          dispatch({
            type: Types.AUTH_WRONG_INFO,
            payload: 'Info wrong'
          })
        }
        else {
          // console.log(now.getTime())
          const now = new Date()
          let isAccess = {
            user: val.data.token,
            id: val.data.user.id,
            expiry:  now.getTime() + 43200000  
            // 86400000 
          }
          console.log(val.data)
          localStorage.setItem("isactive", JSON.stringify(isAccess))
          dispatch({
          type: Types.AUTH_USER,
          payload: val.data
        })
        }       
      })
    } catch (error) {
      console.log(error.message);
    }
  }
}

const logoutHandler = () => {
  return (dispatch) => {
    console.log("logout")
    try {
    axios.get('http://localhost:3001/api/logout')
    .then((response) => {
      localStorage.setItem("isactive", null)      
      dispatch({ type: Types.LOGOUT_SUCCESS, payload: response.data.message})
    })
  } catch (error) {
    dispatch({type: Types.LOGOUT_FAILED, payload: error.response.data.message})
  }
  }
  
}

export {
    createUsers,
    authUsers,
    logoutHandler
}