import axios from "axios";
import * as Types from "../constants/actionType";
import { getOrderDeliver } from "./orderAction";

const getAllUsers = () => {
  return async (dispatch) => {
    await axios
      .get("http://localhost:3005/api/getallusers", { withCredentials: true })
      .then((val) => {
        if (val.data) {
          console.log(val.data);
          dispatch({
            type: Types.GET_ALLUSERS_SUCCESS,
            payload: val.data,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: Types.GET_ALLUSERS_FAILED,
          payload: err.message,
        });
      });
  };
};

const getIdProducts = () => {
  return async (dispatch) => {
    try {
      await axios
        .get("http://localhost:3005/api/allidproducts", {
          withCredentials: true,
        })
        .then((response) => {
          dispatch({
            type: Types.GET_ALLID_PRODUCTS,
            payload: response.data,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
};

const getAllOrders = () => {
  return async (dispatch) => {
    try {
      await axios
        .get("http://localhost:3005/api/allorders", { withCredentials: true })
        .then((response) => {
          if (response.data) {
            dispatch({
              type: Types.GET_ALLORDERS_SUCCESS,
              payload: response.data,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: Types.GET_ALLUSERS_FAILED,
        payload: error,
      });
    }
  };
};

const changeStatusOrder = (id, status) => {
  return async (dispatch) => {
    try {
      await axios
        .put(
          "http://localhost:3005/api/updatestatus",
          { id: id, status: status },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data[0] === 1) {
            if (Array.isArray(response.data)) {
              dispatch({
                type: Types.UPDATE_ORDER_SUCCESS,
                payload: response.data.slice(1),
              });
            } else {
              dispatch({
                type: Types.UPDATE_ORDER_FAILED,
                payload: false,
              });
            }
          } else {
            if (Array.isArray(response.data)) {
              dispatch({
                type: Types.CONFIRM_ORDER_SUCCESS,
                payload: response.data.slice(1),
              });
              dispatch(getOrderDeliver())
            } else {
              dispatch({
                type: Types.CONFIRM_ORDER_FAILED,
                payload: false,
              });
            }
          }
        });
    } catch (error) {
      dispatch({
        type: Types.UPDATE_ORDER_FAILED,
        payload: error,
      });
    }
  };
};

export { getAllUsers, getIdProducts, getAllOrders, changeStatusOrder };
