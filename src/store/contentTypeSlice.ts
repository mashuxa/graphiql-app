import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentType } from "src/types";

export interface ContentTypeState {
  contentType: string;
}

const initialState = {
  contentType: Object.keys(ContentType)[0],
};

const contentTypeSlice = createSlice({
  name: "contentType",
  initialState,
  reducers: {
    setContentType(state, action: PayloadAction<ContentType>) {
      state.contentType = action.payload;
    },
  },
});

export const { setContentType } = contentTypeSlice.actions;
export default contentTypeSlice.reducer;
