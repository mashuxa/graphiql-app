import { Action, configureStore, Store } from "@reduxjs/toolkit";

import { RequestData } from "src/types";
import bodyReducer, { BodyState } from "./bodySlice";
import contentTypeReducer, { ContentTypeState } from "./contentTypeSlice";
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
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
