import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import carReducer from "./reducers/carReducer";
import categoryReducer from "./reducers/categoryReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    categoryReducer: categoryReducer,
    carReducer: carReducer,
    userReducer: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
