import * as Types from '../constants/actionType';
var initialState = {
    products: [],
    message: '',
};
 
export const products = (state = initialState, action) => {
    switch (action.type){
        case Types.FETCH_PRODUCTS:
            state.products = action.products
            return {
                ...state
            };
            // break;
        case Types.CREATE_PRODUCT:
            state.message = action.message
            // console.log(state.message);
            return { ...state};
        default:
            return state;
    } 
}