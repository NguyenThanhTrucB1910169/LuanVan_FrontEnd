import * as Types from "../constants/actionType";

const initState = {
  cartItem: [],
};

export const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.ADD_TO_CART_SUCCESS:
      return { ...state, isAdd: true };
    case Types.ADD_TO_CART_FAILED:
      return { ...state, isAdd: false}
    case Types.LOAD_CART_SUCCESS:
      state.cartItem = action.payload;
      return { ...state, empty: false };
    case Types.CART_EMPTY:
      return { ...state, empty: action.payload, cartItem: [] };
    case Types.UPDATE_CART_SUCCESS:
      state.cartItem = action.payload;
      return { ...state };
    case Types.UPDATE_CART_FAILED:
      return { ...state, message: action.payload };
    case Types.REMOVE_ITEM_SUCCESS:
      state.cartItem = action.payload;
      return { ...state, message: true };
    case Types.REMOVE_ITEM_FAILED:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
