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
      return { ...state, reviewsByProduct: {}, getReview: false };
    case Types.GET_USER_BYID_SUCCESS:
      return { ...state, getUserReview: action.payload };
    case Types.GET_USER_BYID_FAILED:
      return { ...state, getUserReview: {} };
    case Types.GET_REVIEW_OFUSER_SUCCESS:
      return { ...state, getReviewsByUser: action.payload };
    case Types.GET_REVIEW_OFUSER_FAILED:
      return { ...state, getReviewsByUser: [] };
    case Types.DEL_REVIEW_BY_USER_SUCCESS:
      return { ...state, delByUser: action.payload.message };
    case Types.DEL_REVIEW_BY_USER_FAILED:
      return { ...state, delByUser: action.payload };
    case Types.GET_TOTALPAGE_SUCCESS:
      return { ...state, totalPage: action.payload };
    case Types.GET_TOTALPAGE_FAILED:
      return { ...state, totalPage: null };
    case Types.UPD_REVIEW_BY_USER_SUCCESS:
      return { ...state, updByUser: action.payload.message };
    case Types.UPD_REVIEW_BY_USER_FAILED:
      return { ...state, updByUser: action.payload };
    default:
      return state;
  }
};
