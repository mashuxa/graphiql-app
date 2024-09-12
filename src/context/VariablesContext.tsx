"use client";

import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
// import { HttpMethod } from "src/types";

export type Variable = {
  key: string;
  value: string;
};

type GlobalStateContextType = {
  // method: HttpMethod;
  // setMethod: React.Dispatch<React.SetStateAction<HttpMethod>>;
  // url: string;
  // setUrl: React.Dispatch<React.SetStateAction<string>>;
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  variables: Variable[];
  setVariables: React.Dispatch<React.SetStateAction<Variable[]>>;
};

// interface VariablesContextType {
//   variables: Variable[];
//   setVariables: React.Dispatch<React.SetStateAction<Variable[]>>;
// }

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined,
);

export const GlobalStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [body, setBody] = useState<string>("");
  const [variables, setVariables] = useState<Variable[]>([]);

  return (
    <GlobalStateContext.Provider
      value={{ body, setBody, variables, setVariables }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalStateContextType => {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error("useVariables must be used within a VariablesProvider");
  }

  return context;
};
