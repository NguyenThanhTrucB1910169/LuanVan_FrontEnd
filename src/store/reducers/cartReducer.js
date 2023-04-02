import * as Types from "../constants/actionType";

const initState = {
  cartItem: [],
};

export const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.ADD_TO_CART_SUCCESS:
      // let item = {
      //   ...state,
      //   cartItem: [...state.cartItem, action.payload]
      //   // message: action.payload,
      // };
      // state = {...state, } 
      // state.cartItem.push(action.payload);
      // console.log(state);
      // state.cartItem
      // console.log(action.payload);
      // console.log(item);
      return {
        ...state,
        // cartItem: [...state.cartItem, action.payload]
        message: action.payload,
      };
      // const item = action.payload;
      // // console.log(item);
      // // console.log(state.cartItem)

      // // const isItemExist = state.cartItem.filter(
      // //   (i) => {
      // //     console.log(i.productId)
      // //     return i.productId === item.productId}
      // // );
      // //   console.log(isItemExist);
      // // if (isItemExist) {
      // //   return {
      // //     ...state,
      // //     cartItem: state.cartItem.map((i) =>
      // //       i.productId === isItemExist.productId ? item : i
      // //     ),
      // //   };
      // // } else {
      //   return {
      //     ...state,
      //     cartItem: [...state.cartItem, item],
      //   };
      // }
    case Types.LOAD_CART_SUCCESS: 
      state.cartItem = action.payload;
      // console.log(state)
      // console.log(state.cartItem);
      return {...state}
    case Types.UPDATE_CART_SUCCESS: 
      state.cartItem = action.payload;
      return {...state}
    case Types.UPDATE_CART_FAILED: 
      return {...state, message: action.payload}
    case Types.REMOVE_ITEM_SUCCESS: 
      state.cartItem = action.payload;
      return {...state, message: true}
      case Types.REMOVE_ITEM_FAILED: 
      return {...state, message: action.payload}
    default:
      return state;
  }
};
