import * as Types from "../constants/actionType";

const initState = {
  placed: false,
  infoByOrderId: {},
  error: null
};

export const orderReduce = (state = initState, action) => {
  switch (action.type) {
    case Types.ORDER_SUCCESS:
      return { ...state, placed: action.payload.result, infoByOrderId: action.payload.info};
    case Types.ORDER_FAILED:
      return { ...state, error: action.payload, placed: false, infoByOrderId: null };
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
      return { ...state, error: action.payload, detail: {}};
    case Types.GET_ORDER_DELIVER_SUCCESS:
      return { ...state, deliver: action.payload}
    case Types.GET_ORDER_DELIVER_FAILED:
      return { ...state, error: action.payload, deliver: null };
    case Types.SEND_SERVER_SUCCESS:
      return {...state, payment: true};
    case Types.SEND_SERVER_FAILED:
      return {...state, payment: false};
    default:
      return state;
  }
};
