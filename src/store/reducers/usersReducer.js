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
            console.log(action.payload)
            state.user = action.payload
            return {...state, isAuth: true};
        case Types.AUTH_WRONG_INFO:
            state.message = action.payload
            return {...state, isAuth: false};
        case Types.LOGOUT_SUCCESS: 
            return {
                user: null,
                isAuth: false,
            }
        case Types.LOGOUT_FAILED:
        case Types.LOGOUT_FAILED:
            return {
                ...state,
                user: null,
                isAuth: false,
                error: action.payload
            }
        default:
            return state;
    } 
}