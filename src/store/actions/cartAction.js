import * as Types from "../constants/actionType";
import axios from "axios";

let addToCart = (idproduct, qt) => {
  return async (dispatch, getState) => {
    console.log(getState().login.isAuth)
    if(getState().login.isAuth) {
      await axios
      .get(`http://localhost:3005/api/cart/${idproduct}/${qt}`, {
        withCredentials: true,
      })
      .then((val) => {
        console.log(val.data)
        if (val.data === "success") {
          dispatch({
            type: Types.ADD_TO_CART_SUCCESS,
          });
        } else {
          dispatch({
            type: Types.ADD_TO_CART_FAILED,
          })
        }
      });
    }
    else {
      dispatch({
        type: Types.ADD_TO_CART_FAILED,
      })
    }
  }
};

const getCartItem = () => {
  return (dispatch, getState) => {
    axios
      .get("http://localhost:3005/api/cartload", { withCredentials: true })
      .then((res) => {
        // console.log(res);
        if(res.data.length === 1 && res.data[0].cartId === null){
          dispatch({
            type: Types.CART_EMPTY,
            payload: true, 
          })
        }
        else 
        // console.log(res)
        dispatch({
          type: Types.LOAD_CART_SUCCESS,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: Types.LOAD_CART_FAILED,
          payload: error,
        });
      });
  };
};

const updateCartAmount = (newCart) => {
  return async (dispatch, getState) => {
    await axios
      .put("http://localhost:3005/api/cartload", newCart, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch({
          type: Types.UPDATE_CART_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: Types.UPDATE_CART_FAILED,
          payload: error.message,
        });
      });
  };
};

const removeItem = (id) => {
  return async (dispatch, getState) => {
    // console.log(id)
    await axios
      .delete("http://localhost:3005/api/deletecart/", {
        data: { id: id },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if(response.data.length === 1 && response.data[0].cartId === null){
          dispatch({
            type: Types.CART_EMPTY,
            payload: true, 
          })
        } else
        dispatch({
          type: Types.REMOVE_ITEM_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: Types.REMOVE_ITEM_FAILED,
          payload: error.message,
        });
      });
  };
};

export { addToCart, getCartItem, updateCartAmount, removeItem };
