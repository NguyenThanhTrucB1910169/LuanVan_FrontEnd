import {combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore} from 'redux'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  products
} from "./reducers/productReducer";

import {
  createUser
} from "./reducers/usersReducer";

const reducer = combineReducers({
  getAllProducts: products,
  newUser: createUser,
  // authen: authUsers
});

let initialState = {
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
