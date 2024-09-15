import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Header } from "src/components/HeadersList/types";

export interface VariablesState {
  variables: Header[];
}

const initialState: VariablesState = {
  variables: [],
};

const variablesSlice = createSlice({
  name: "variables",
  initialState,
  reducers: {
    setVariables(state, action: PayloadAction<Header[]>) {
      state.variables = action.payload;
    },
  },
});

export const { setVariables } = variablesSlice.actions;
export default variablesSlice.reducer;
