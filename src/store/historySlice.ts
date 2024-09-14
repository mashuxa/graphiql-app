"use client";
import { createSlice } from "@reduxjs/toolkit";
import { HistoryItem } from "src/types";
import { addHistoryItemToLocalStorage } from "src/utils/utils";

export interface HistoryState {
  history: HistoryItem[];
}

const initialState: HistoryState = { history: [] };

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistoryItem(state, action) {
      state.history.push(action.payload);
      addHistoryItemToLocalStorage(action.payload);

      return state;
    },
    setHistory(state, action) {
      return action.payload;
    },
  },
});

export const { addHistoryItem, setHistory } = historySlice.actions;
export default historySlice.reducer;
