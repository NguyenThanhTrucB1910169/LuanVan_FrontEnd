import * as Types from "../constants/actionType";
import axios from "axios";
const addNewReview = (reviewData) => {
  return async (dispatch) => {
    try {
      await axios
        .post("http://localhost:3005/api/reviews", reviewData, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          dispatch({
            type: Types.NEW_REVIEW_SUCCESS,
            message: res,
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
      var result = [];
      const res = await axios.get(
        `http://localhost:3005/api/getReviews/byProduct/${idProduct}`,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        if (res.data) {
          for (const review of res.data) {
            console.log(review.userId);
            const userResponse = await axios.get(
              `http://localhost:3005/api/getById/${review.userId}`,
              {
                withCredentials: true,
              }
            );
            const reviewWithUser = {
              user: userResponse.data,
              reviewData: review,
            };

            result.push(reviewWithUser);
          }
        }
        dispatch({
          type: Types.GET_REVIEW_PRODUCT_SUCCESS,
          payload: result,
        });
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

export { addNewReview, getReviewsByProduct };
