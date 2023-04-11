import axios from "axios";
import * as Types from "../constants/actionType";

const createOrder = (data) => {
  return async (dispatch) => {
    try {
      // console.log(data);
      await axios
        .post("http://localhost:3005/api/order/", data, {
          withCredentials: true,
        })
        .then(async (response) => {
          //   console.log(response);
          if (response.data) {
            await axios.delete("http://localhost:3005/api/alldelete", {
              withCredentials: true,
            })
              .then((res) => {
                // console.log(rs)
                dispatch({
                  type: Types.ORDER_SUCCESS,
                  payload: res.data,
                });
              });
          }
        })
        .catch((error) => {
          dispatch({
            type: Types.ORDER_FAILED,
            payload: error,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
};

const getOrderByUser = () => {
  return async (dispatch) => {
    try {
      // console.log(1)
      await axios
        .get("http://localhost:3005/api/order/", { withCredentials: true })
        .then((data) => {
          // console.log(data.data)
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

export { createOrder, getOrderByUser, getDetailProduct };
