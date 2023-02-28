import {combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore} from 'redux'
import thunk from "redux-thunk";
// import { applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
import { persistReducer, persistStore  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from "redux-devtools-extension";
import {
  products
} from "./reducers/productReducer";

import {
  createUser, loginAccount
} from "./reducers/usersReducer";

import {cartReducer} from "./reducers/cartReducer";


const reducer = combineReducers({
  getAllProducts: products,
  newUser: createUser,
  cart: cartReducer,
  login: loginAccount
});

// let initialState = {
// };
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const middleware = [thunk];
// console.log(reducer.login)

const store = createStore(
  // reducer,
  // // initialState,
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store)

export {store, persistor};
