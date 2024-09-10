"use client";

import { Provider } from "react-redux";
import { store } from "src/store/store";
import GraphiqlForm from "../GraphiqlForm/GraphiqlForm";

const GraphiqlFormRedux = (): JSX.Element => {
  return (
    <Provider store={store}>
      <GraphiqlForm />
    </Provider>
  );
};

export default GraphiqlFormRedux;
