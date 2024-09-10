import { configureStore } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";
import requestDataSlice from "./requestDataSlice";

export const store = configureStore({
  reducer: {
    requestData: requestDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): typeof store.dispatch =>
  useDispatch<AppDispatch>();
