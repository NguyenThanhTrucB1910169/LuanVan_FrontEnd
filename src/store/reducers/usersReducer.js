import * as Types from '../constants/actionType';
// var initialState = {
//     user: {},
//     message: '',
//     isAuth: false,
// };
 
export const createUser = (state={} , action) => {
    switch (action.type){
        case Types.CREATE_USER:
            // state.message = action.message
            return {...state, message: true};
        case Types.CREATE_USER_FAILED: 
            // state.message = action.message
            return {...state, message: false};
        default:
            return state;
    } 
}

export const loginAccount = (state={user: {}} , action) => {
    switch(action.type){
        case Types.AUTH_USER:
            state.user = action.payload
            // console.log(action.payload)
            return {...state, isAuth: true, isAdmin: false};
        case Types.AUTH_WRONG_INFO:
            // state.message = action.payload
            return {...state, isAuth: false, message: action.payload};
        case Types.LOGOUT_SUCCESS: 
            return {
                ...state,
                user: null,
                isAuth: false,
                isAdmin: false,
                update: false,
                message: null,
            }
        case Types.LOGOUT_FAILED:
            return {
                ...state,
                user: null,
                message: action.payload
            }
        case Types.UPDATE_INFO_SUCCESS: 
        console.log(action.payload)
        state.user = action.payload
            return {
                ...state,
                // user: action.payload,
                update: true,
            }
        case Types.UPDATE_INFO_FAILED: 
            return {
                ...state,
                message: action.payload,
                update: false,
            }
        case Types.IS_ADMIN: 
        // console.log(action.payload)
            return {
                ...state,
                isAdmin: true,
                isAuth: false
            }
        default:
            return state;
    }
}