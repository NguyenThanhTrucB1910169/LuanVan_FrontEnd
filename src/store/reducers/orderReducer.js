import * as Types from "../constants/actionType";

const initState = {
  placed: false,
};

export const orderReduce = (state = initState, action) => {
  switch (action.type) {
    case Types.ORDER_SUCCESS:
      return { ...state, placed: action.payload };
    case Types.ORDER_FAILED:
      return { ...state, error: action.payload, placed: false };
    case Types.GET_ORDERS_SUCCESS:
      return { ...state, listOrder: action.payload};
    case Types.GET_ORDERS_FAILED:
      return { ...state, error: action.payload };
    case Types.CONFIRM_ORDER_SUCCESS:
      return { ...state, listOrder: action.payload};
    case Types.CONFIRM_ORDER_FAILED: 
      return { ...state, error: action.payload, };
    case Types.DETAIL_ORDER_SUCCESS:
      return { ...state, detail: action.payload };
    case Types.DETAIL_ORDER_FAILED:
      return { ...state, error: action.payload };
    case Types.GET_ORDER_DELIVER_SUCCESS:
      return { ...state, deliver: action.payload}
    case Types.GET_ORDER_DELIVER_FAILED:
      return { ...state, error: action.payload, deliver: null };
    default:
      return state;
  }
};
