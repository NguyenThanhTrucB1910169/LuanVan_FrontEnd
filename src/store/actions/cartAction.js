import * as Types from "../constants/actionType";
import axios from "axios";

let addToCart = (idproduct, qt) => {
  return async (dispatch, getState) => {
    await axios.get(`http://localhost:3005/api/cart/${idproduct}/${1}`, {withCredentials: true})
    .then((val) => {
      if(val.data === 'success') {
        dispatch({
          type: Types.ADD_TO_CART_SUCCESS,
          payload: val.data,
        })
      }
    })
  };
};

const getCartItem = () => {
  return (dispatch, getState) => {
    axios.get('http://localhost:3005/api/cartload',{withCredentials: true}).then(response => {
      dispatch({
            type: Types.LOAD_CART_SUCCESS,
            payload: response.data,
          });
    })
    .catch((error) => {
      dispatch({
            type: Types.LOAD_CART_FAILED,
            payload: error,
            message: "dont have item",
          });
    })
  };
};

const updateCartAmount = (newCart) => {
  return async(dispatch, getState) => {
    await axios.put('http://localhost:3005/api/cartload', newCart, {withCredentials: true})
    .then((response) => {
      dispatch({
          type: Types.UPDATE_CART_SUCCESS,
          payload: response.data
        })
    })
    .catch((error) => {
      dispatch({
        type: Types.UPDATE_CART_FAILED,
        payload: error.message,
      })
    })
  };
};

const removeItem = (id) => {
  return (dispatch, getState) => {
   
  }
}

export { addToCart, getCartItem, updateCartAmount, removeItem };
