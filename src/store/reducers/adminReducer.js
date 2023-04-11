import * as Types from '../constants/actionType'

export const adminReducer = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_ALLUSERS_SUCCESS:
            return {...state, allusers: action.payload}
        case Types.GET_ALLID_PRODUCTS:
            return {...state, idproducts: action.payload}
        case Types.DELETE_PRODUCT_FAILED:  
            return {...state, deleteProduct: action.payload}
        case Types.GET_ALLORDERS_SUCCESS:
            return {...state, orders: action.payload}
        case Types.GET_ALLORDERS_FAILED:
            return {...state, message: action.payload}
        default:
            return state;
    }
}