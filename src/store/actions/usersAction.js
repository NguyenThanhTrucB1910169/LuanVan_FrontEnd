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
        dispatch({
          type: Types.AUTH_USER,
          payload: val
        })
      })
      .catch((error) => {
          // console.log(error.response.data.message);   
          dispatch({
            type: Types.AUTH_USER_FAILED,
            payload: error.response.data.message
          })    
      })
    } catch (error) {
      console.log(error.message);
    }
  }
}

export {
    createUsers,
    authUsers
}