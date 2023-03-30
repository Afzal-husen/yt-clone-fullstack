import { configureStore, combineReducers } from "@reduxjs/toolkit";
//The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to the store.
import userReducer from "../features/userSlice.js";
import videoReducer from "../features/videoSlice.js";
import commentReducer from "../features/commentSlice.js";
//redux-persist library is used to persist the state in the store
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PERSIST,
  PAUSE,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  video: videoReducer,
  comment: commentReducer,
});
//const rootReducer = combineReducers({userReducer, videoReducer}); ES6 feature

const persistedReducer = persistReducer(persistConfig, rootReducer); //the reducer that will persist the store

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PERSIST, PAUSE, PURGE, REGISTER],
      },
    }),
});

// console.log(store)

export const persistor = persistStore(store);
