import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice"; // Auth Slice import kar rahe hain

const store = configureStore({
  reducer: {
    auth: authReducer, // Authentication reducer
  },
});

export default store;