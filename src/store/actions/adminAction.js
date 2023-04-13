import axios from "axios"
import * as Types from '../constants/actionType'

const getAllUsers = () => {
    return async(dispatch) => {
        await axios.get('http://localhost:3005/api/getallusers', {withCredentials: true}).then((val) => {
           if(val.data){
            dispatch({
                type: Types.GET_ALLUSERS_SUCCESS,
                payload: val.data
            })
           }
        
    })
    .catch((err) => {
     dispatch({
         type: Types.GET_ALLUSERS_FAILED,
         payload: err.message
     })
    })
    }
}

const getIdProducts = () => {
    return async (dispatch) => {
      try {
        await axios.get('http://localhost:3005/api/allidproducts', {withCredentials: true}).then((response) => {
          dispatch({
            type: Types.GET_ALLID_PRODUCTS,
            payload: response.data
          })
        })
      } catch (error) {
        console.log(error);
      }
    }
}

const getAllOrders = () => {
  return async(dispatch) => {
    try {
      await axios.get('http://localhost:3005/api/allorders', {withCredentials: true}).then((response) => {
        if(response.data){
          dispatch({
            type: Types.GET_ALLORDERS_SUCCESS,
            payload: response.data
          })
        } 
      })
    } catch (error) {
      dispatch({
        type: Types.GET_ALLUSERS_FAILED,
        payload: error
      })
    }
  }
}


export {
    getAllUsers,
    getIdProducts,
    getAllOrders,
}