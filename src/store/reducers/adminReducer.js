import * as Types from "../constants/actionType";
const initState = {
  delAction: false,
};

export const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.GET_ALLUSERS_SUCCESS:
      return { ...state, allusers: action.payload };
    case Types.GET_ALLID_PRODUCTS:
      return { ...state, idproducts: action.payload };
    case Types.DELETE_PRODUCT_FAILED:
      return { ...state, deleteProduct: action.payload };
    case Types.GET_ALLORDERS_SUCCESS:
      return { ...state, orders: action.payload };
    case Types.GET_ALLORDERS_FAILED:
      return { ...state, message: action.payload };
    case Types.UPDATE_ORDER_SUCCESS:
      return { ...state, orders: action.payload };
    case Types.UPDATE_ORDER_FAILED:
      return { ...state, message: action.payload, orders: null };
    case Types.AD_GET_REVIEWS_SUCCESS:
      return { ...state, reviews: action.payload, delAction: false };
    case Types.AD_GET_REVIEWS_FAILED:
      return { ...state, reviews: null };
    case Types.DEL_REVIEW_BY_AD_SUCCESS:
      return { ...state, delAction: action.payload };
    case Types.DEL_REVIEW_BY_AD_FAILED:
      return { ...state, delAction: false };
    case Types.COUNT_TOTAL_SUCCESS:
      return { ...state, count: action.payload };
    case Types.COUNT_TOTAL_FAILED:
      return { ...state, count: 0 };
    default:
      return state;
  }
};
