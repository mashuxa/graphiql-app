import { configureStore, EnhancedStore } from "@reduxjs/toolkit";

import { RequestData } from "src/types";
import bodyReducer, { BodyState } from "./bodySlice";
import requestDataSlice from "./requestDataSlice";
import variablesReducer, { VariablesState } from "./variablesSlice";

export const makeStore = (): EnhancedStore<{
  requestData: RequestData;
  body: BodyState;
  variables: VariablesState;
}> => {
  return configureStore({
    reducer: {
      requestData: requestDataSlice,
      body: bodyReducer,
      variables: variablesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
