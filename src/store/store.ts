import { configureStore } from "@reduxjs/toolkit";
import widgetSlice from "./WidgetSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const persistConfig = {
  timeout: 100,
  key: "root",
  version: 1,
  storage,
};

const persistedWidgets = persistReducer(persistConfig, widgetSlice);

export const store = configureStore({
  reducer: {
    widgets: persistedWidgets,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
