import { applyMiddleware, combineReducers, createStore } from "redux";

import authReducer from "./reducers/auth.reducer";
import thunk from "redux-thunk";

const RootReducer = combineReducers({
  auth: authReducer,
});

export default createStore(RootReducer, applyMiddleware(thunk));
