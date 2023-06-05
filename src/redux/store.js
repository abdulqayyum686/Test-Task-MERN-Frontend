import { configureStore , getDefaultMiddleware, } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import messageReducer from "./reducers/messageReducer";
import adminReducer from "./reducers/adminReducer"
import clientReducer from "./reducers/clientReducer"

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    client: clientReducer,
    user: userReducer,
    messageReducer: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
