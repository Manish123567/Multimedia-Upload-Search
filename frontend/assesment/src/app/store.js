import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import fileReducer from "../features/fileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    files: fileReducer
  }
});