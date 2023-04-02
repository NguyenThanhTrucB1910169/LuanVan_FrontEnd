import * as Types from "../constants/actionType";

const initState = {
  placed: false,
};

export const orderReduce = (state = initState, action) => {
  switch (action.type) {
    case Types.ORDER_SUCCESS:
      return { ...state, placed: action.payload };
    case Types.ORDER_FAILED:
      return { ...state, message: action.payload };
    case Types.GET_ORDERS_SUCCESS:
      // console.log(action.payload);
      return { ...state, listOrder: action.payload };
    case Types.GET_ORDERS_FAILED:
      return { ...state, error: action.payload };
    case Types.DETAIL_ORDER_SUCCESS:
      return { ...state, detail: action.payload };
    case Types.DETAIL_ORDER_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
