import { createSlice } from "@reduxjs/toolkit";
import { RequestData } from "src/types";

const initialState: RequestData = {
  sdlUrl: "" /*, searchParams: new URLSearchParams()*/,
};

const requestDataSlice = createSlice({
  name: "requestData",
  initialState,
  reducers: {
    update(state, action) {
      const newParams = {
        ...state,
        ...action.payload,
      };

      return newParams;
    },
  },
});

export const { update } = requestDataSlice.actions;
export default requestDataSlice.reducer;
