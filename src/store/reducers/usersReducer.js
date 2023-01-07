import * as Types from '../constants/actionType';
var initialState = {
    user: {},
    message: '',
};
 
export const createUser = (state = initialState, action) => {
    switch (action.type){
        case Types.CREATE_USER:
            state.message = action.message
            return {...state};
        case Types.AUTH_USER: 
            state.user = action.payload
            return {...state, isAuth: true};
        case Types.AUTH_USER_FAILED:
            state.message = action.payload
            return {...state, isAuth: false};
        default:
            return state;
    } 
}