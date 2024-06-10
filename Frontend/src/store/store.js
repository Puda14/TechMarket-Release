import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { thunk } from "redux-thunk";

import authReducer from "./reducers/authReducer";
import productsReducer from "./reducers/productsReducer.js";
import chatReducer from "./reducers/chatReducer.js";
import customersReducer from "./reducers/customersReducer.js";
import cartReducer from "./reducers/cartReducer.js";


const persistConfig = {
  key: 'root',
  storage,
  whitelist:['cart']
}
const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  customers: customersReducer,
  chat: chatReducer,
  cart: cartReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
    persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
export const persistor = persistStore(store)
