import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import appReducer from "./features/appSlice";
const appPersistConfig = {
  key: "sixteen-meet-app",
  storage,
};
const appPersisitedReducer = persistReducer(appPersistConfig, appReducer);
const rootReducer = combineReducers({
  app: appPersisitedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
