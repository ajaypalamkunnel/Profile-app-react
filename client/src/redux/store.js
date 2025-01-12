import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import adminReducer from './user/adminSlice.js'
const rootReducer = combineReducers({ user: userReducer,
    admin:adminReducer
 });

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
