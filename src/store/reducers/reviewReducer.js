import * as Types from "../constants/actionType";
var initialState = {
  //   products: [],
};

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.NEW_REVIEW_SUCCESS:
      return { ...state, create: true };
    case Types.NEW_REVIEW_FAILED:
      return { ...state, create: false };
    case Types.GET_REVIEW_PRODUCT_SUCCESS:
      return { ...state, reviewsByProduct: action.payload, getReview: true };
    case Types.GET_REVIEW_PRODUCT_FAILED:
      return {...state, reviewsByProduct: {}, getReview: false };
    case Types.GET_USER_BYID_SUCCESS:
      return {...state, getUserReview: action.payload };
      case Types.GET_USER_BYID_FAILED:
        return {...state, getUserReview: {} };
    default:
      return state;
  }
};
