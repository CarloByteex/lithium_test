import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";


import authReducer, { IAuthSlice } from "./slices/Auth";
import tokenReducer, { IAuthTokenSlice } from "./slices/AuthToken";


interface IReducer {
  auth: IAuthSlice,
}

interface IPersist {
  token: IAuthTokenSlice
}

export interface IRedux {
  reducers: IReducer
  persists: IPersist
}

const reducers = combineReducers({
  auth: authReducer
});

const persistConfig = {
  key: "root",
  storage
};

const persistReducers = combineReducers({
  token: tokenReducer
});

const persists = persistReducer(persistConfig, persistReducers);

const reducer = combineReducers({
  reducers,
  persists
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type AppDispatch = typeof store.dispatch;
export default store;