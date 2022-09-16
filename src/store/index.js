import { applyMiddleware, combineReducers, createStore } from "redux";

import authReducer from "./reducers/auth.reducer";
import cartReducer from "./reducers/cart.reducer";
import thunk from "redux-thunk";

const RootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

export default createStore(RootReducer, applyMiddleware(thunk));
