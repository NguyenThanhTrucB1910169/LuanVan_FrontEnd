import axios from "axios";
import * as Types from "../constants/actionType";
import { getCartItem } from "./cartAction";

const createOrder = (data) => {
  return async (dispatch) => {
    try {
      console.log('create Order info ', data);
      await axios
        .post("http://localhost:3005/api/order/", data, {
          withCredentials: true,
        })
        .then(async (response) => {
          console.log('create Order success', response.data);
          if (response.data) {
            await axios
              .delete("http://localhost:3005/api/alldelete", {
                withCredentials: true,
              })
              .then((res) => {
                console.log(res.data)
                dispatch({
                  type: Types.ORDER_SUCCESS,
                  payload: {info: response.data, result: res.data},
                });
              });
              // return response.data;
            dispatch(getCartItem());
          } 
        })
        .catch((error) => {
          dispatch({
            type: Types.ORDER_FAILED,
            payload: error,
          });
          return error;
        });
    } catch (error) {
      return error;
    }
  };
};

const getOrderByUser = () => {
  return async (dispatch) => {
    try {
      await axios
        .get("http://localhost:3005/api/orderByUser/", { withCredentials: true })
        .then((data) => {
          dispatch({
            type: Types.GET_ORDERS_SUCCESS,
            payload: data.data,
          });
        });
    } catch (error) {
      dispatch({
        type: Types.GET_ORDERS_FAILED,
        payload: error,
      });
    }
  };
};

const getDetailProduct = (id) => {
  return async (dispatch) => {
    try {
      await axios
        .get(`http://localhost:3005/api/order/${id}`, { withCredentials: true })
        .then((val) => {
          dispatch({
            type: Types.DETAIL_ORDER_SUCCESS,
            payload: val.data,
          });
        });
    } catch (error) {
      dispatch({
        type: Types.DETAIL_ORDER_FAILED,
        payload: error.message,
      });
    }
  };
};

const getOrderDeliver = () => {
  return async (dispatch) => {
    try {
      axios
        .get("http://localhost:3005/api/orderdeliver/", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data !== undefined) {
            dispatch({
              type: Types.GET_ORDER_DELIVER_SUCCESS,
              payload: response.data,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: Types.GET_ORDER_DELIVER_FAILED,
        payload: error.message,
      });
    }
  };
};

export { createOrder, getOrderByUser, getDetailProduct, getOrderDeliver };
