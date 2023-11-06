import * as Types from "../constants/actionType";
import axios from "axios";
const addNewReview = (reviewData) => {
  return async (dispatch) => {
    try {
      await axios
        .post("http://localhost:3005/api/reviews", reviewData, {
          withCredentials: true,
        })
        .then(async (res) => {
          console.log(res);
          dispatch({
            type: Types.NEW_REVIEW_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: Types.NEW_REVIEW_FAILED,
            message: err,
          });
        });
    } catch (error) {
      dispatch({
        type: Types.NEW_REVIEW_FAILED,
        payload: error.response.data.message,
      });
    }
  };
};

const getReviewsByProduct = (idProduct) => {
  return async (dispatch) => {
    try {
      console.log(idProduct);
      console.log("VAO getReviewsByProduct");
      var result = [];
      const res = await axios.get(
        `http://localhost:3005/api/getReviews/byProduct/${idProduct}`,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        console.log(res.data);
        dispatch({
          type: Types.GET_REVIEW_PRODUCT_SUCCESS,
          payload: res.data,
        });
        // if (res.data) {
        //   for (const review of res.data) {
        //     console.log(review.userId);
        //     const userResponse = await axios.get(
        //       `http://localhost:3005/api/getById/${review.userId}`,
        //       {
        //         withCredentials: true,
        //       }
        //     );
        //     const reviewWithUser = {
        //       user: userResponse.data,
        //       reviewData: review,
        //     };

        //     result.push(reviewWithUser);
        //   }
        // }
        // dispatch({
        //   type: Types.GET_REVIEW_PRODUCT_SUCCESS,
        //   payload: result,
        // });
      }
      // });
    } catch (error) {
      dispatch({
        type: Types.GET_REVIEW_PRODUCT_FAILED,
        payload: error.response.data.message,
      });
    }
  };
};

const getReviewsByUser = (page) => {
  return async (dispatch) => {
    try {
      console.log(page);
      const res = await axios.get(
        `http://localhost:3005/api/getReviewsByUser/${page}`,
        { withCredentials: true }
      );
      if (res.data) {
        console.log(res.data);
        dispatch({
          type: Types.GET_REVIEW_OFUSER_SUCCESS,
          payload: res.data,
        });
      }
      // });
    } catch (error) {
      console.log("error ", error);
      dispatch({
        type: Types.GET_REVIEW_OFUSER_FAILED,
        payload: error,
      });
    }
  };
};

const getTotalPage = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3005/api/getTotalPage", {
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data) {
        console.log(res.data);
        dispatch({
          type: Types.GET_TOTALPAGE_SUCCESS,
          payload: res.data,
        });
      }
      // });
    } catch (error) {
      console.log("error ", error);
      dispatch({
        type: Types.GET_TOTALPAGE_FAILED,
        payload: error,
      });
    }
  };
};

const delReviewByUser = (id) => {
  return async (dispatch) => {
    console.log("id at action ", id);
    try {
      await axios
        .delete("http://localhost:3005/api/delReviewByUser", {
          withCredentials: true,
          data: {
            reviewId: id, // Truyền ID của đánh giá vào dưới dạng dữ liệu
          },
        })
        .then((response) => {
          console.log("response.data PHẢN HỒI", response.data);
          dispatch({
            type: Types.DEL_REVIEW_BY_USER_SUCCESS,
            payload: response.data,
          });
        })
        .catch((data) => {
          dispatch({
            type: Types.DEL_REVIEW_BY_USER_FAILED,
            payload: data,
          });
        });
      //   console.log('res data ', res.data)
      //   if (res.data) {
      //     console.log(res.data);
      //     dispatch({
      //       type: Types.GET_REVIEW_OFUSER_SUCCESS,
      //       payload: res.data,
      //     });
      //   }
      // });
    } catch (error) {
      console.log("error ", error);
      dispatch({
        type: Types.DEL_REVIEW_BY_USER_FAILED,
        payload: error.response.data.message,
      });
    }
  };
};

const updateReviewByUser = (id, reviews) => {
  return async (dispatch) => {
    console.log("id at action ", id);
    console.log("reviews at action ", reviews);
    const data = {
      reviewId: id,
      review: reviews,
    };
    try {
      await axios
        .put("http://localhost:3005/api/updatebyuser/review", data, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("response.data PHẢN HỒI", response.data);
          dispatch({
            type: Types.UPD_REVIEW_BY_USER_SUCCESS,
            payload: response.data,
          });
        })
        .catch((data) => {
          dispatch({
            type: Types.UPD_REVIEW_BY_USER_FAILED,
            payload: data,
          });
        });
    } catch (error) {
      console.log("error ", error);
      dispatch({
        type: Types.UPD_REVIEW_BY_USER_FAILED,
        payload: error.response.data.message,
      });
    }
  };
};

export {
  addNewReview,
  getReviewsByProduct,
  getReviewsByUser,
  delReviewByUser,
  getTotalPage,
  updateReviewByUser,
};
