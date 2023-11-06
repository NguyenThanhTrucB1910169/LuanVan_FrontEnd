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
            console.log(response.data);
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
              dispatch(getOrderDeliver());
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

const getAllReviews = (page) => {
  return async (dispatch) => {
    try {
      await axios
        .get(`http://localhost:3005/api/ad/allreviews/${page}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            dispatch({
              type: Types.AD_GET_REVIEWS_SUCCESS,
              payload: response.data,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: Types.AD_GET_REVIEWS_FAILED,
        payload: error,
      });
    }
  };
};

const delReview = (id) => {
  return async (dispatch) => {
    console.log("ID AT ACTION OF ADMIN ", id);
    try {
      await axios
        .delete("http://localhost:3005/api/ad/delReview", {
          withCredentials: true,
          data: {
            reviewId: id, // Truyền ID của đánh giá vào dưới dạng dữ liệu
          },
        })
        .then((response) => {
          console.log("RESPONSE.DATA PHẢN HỒI", response.data);
          dispatch({
            type: Types.DEL_REVIEW_BY_AD_SUCCESS,
            payload: response.data.message,
          });
        })
        .catch((data) => {
          dispatch({
            type: Types.DEL_REVIEW_BY_AD_FAILED,
            payload: data,
          });
        });
    } catch (error) {
      console.log("error ", error);
      dispatch({
        type: Types.DEL_REVIEW_BY_USER_FAILED,
        payload: error.response.data.message,
      });
    }
  };
};

const countTotalReviews = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3005/api/ad/getTotal", {
        withCredentials: true,
      });
      console.log('COUTN DATA AT AD ACTION ', res.data);
      if (res.data) {
        console.log(res.data);
        dispatch({
          type: Types.COUNT_TOTAL_SUCCESS,
          payload: res.data,
        });
      }
      // });
    } catch (error) {
      console.log("error ", error);
      dispatch({
        type: Types.COUNT_TOTAL_FAILED,
        payload: error,
      });
    }
  };
};

// const getAllDetailProducts = () => {
//   return async (dispatch) => {
//     try {
//       await axios
//         .get("http://localhost:3005/api/alldetailproducts", {
//           withCredentials: true,
//         })
//         .then((response) => {
//           dispatch({
//             type: Types.GET_ALL_DETAIL_PRODUCTS_SUCCESS,
//             payload: response.data,
//           });
//         });
//     } catch (error) {
//       dispatch({
//         type: Types.GET_ALL_DETAIL_PRODUCTS_FAILED,
//         payload: error,
//       });
//     }
//   };
// }

export {
  getAllUsers,
  getIdProducts,
  getAllOrders,
  changeStatusOrder,
  getAllReviews,
  delReview,
  countTotalReviews,
};
