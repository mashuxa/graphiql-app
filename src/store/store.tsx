import { Action, configureStore, Store } from "@reduxjs/toolkit";

import { RequestData } from "src/types";
import bodyReducer, { BodyState } from "./bodySlice";
import contentTypeReducer, { ContentTypeState } from "./contentTypeSlice";
import historySlice, { HistoryState } from "./historySlice";
import methodReducer, { MethodState } from "./methodSlice";
import requestDataSlice from "./requestDataSlice";
import variablesReducer, { VariablesState } from "./variablesSlice";

export const makeStore = (): Store<
  {
    requestData: RequestData;
    body: BodyState;
    variables: VariablesState;
    method: MethodState;
    contentType: ContentTypeState;
    history: HistoryState;
  },
  Action,
  object
> => {
  return configureStore({
    reducer: {
      requestData: requestDataSlice,
      body: bodyReducer,
      variables: variablesReducer,
      method: methodReducer,
      contentType: contentTypeReducer,
      history: historySlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
