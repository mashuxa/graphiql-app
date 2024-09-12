import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BodyState {
  body: string;
}

const initialState: BodyState = {
  body: "",
};

const bodySlice = createSlice({
  name: "body",
  initialState,
  reducers: {
    setBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
    },
  },
});

export const { setBody } = bodySlice.actions;
export default bodySlice.reducer;
