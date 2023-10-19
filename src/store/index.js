import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import { products } from "./reducers/productReducer";
import { createUser, loginAccount } from "./reducers/usersReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReduce } from "./reducers/orderReducer";
import { adminReducer } from "./reducers/adminReducer";
import { reviewsReducer } from "./reducers/reviewReducer";

const reducer = combineReducers({
  getAllProducts: products,
  newUser: createUser,
  cart: cartReducer,
  login: loginAccount,
  orderInfo: orderReduce,
  admin: adminReducer,
  reviews: reviewsReducer
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
