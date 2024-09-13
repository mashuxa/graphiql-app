import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpMethod } from "src/types";

export interface MethodState {
  method: HttpMethod;
}

const initialState: MethodState = {
  method: HttpMethod.get,
};

const methodSlice = createSlice({
  name: "method",
  initialState,
  reducers: {
    setMethod(state, action: PayloadAction<HttpMethod>) {
      state.method = action.payload;
    },
  },
});

export const { setMethod } = methodSlice.actions;
export default methodSlice.reducer;
