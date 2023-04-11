import * as Types from "../constants/actionType";
var initialState = {
  products: [],
};

export const products = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_PRODUCTS:
      state.products = action.products;
      return {...state};
    case Types.CREATE_PRODUCT_SUCCESS:
      return { ...state, message: action.message };
    case Types.CREATE_PRODUCT_FAILED:
      return { ...state, message: action.message };
    case Types.UPDATE_PRODUCT_SUCCESS: 
      return { ...state, update: action.payload };
    case Types.UPDATE_PRODUCT_FAILED:
      return { ...state, message: action.payload };
    case Types.DETAIL_PRODUCT:
      return { ...state, detail: action.payload };
    default:
      return state;
  }
};
