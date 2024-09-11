"use client";

import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

export type Variable = {
  key: string;
  value: string;
};

interface VariablesContextType {
  variables: Variable[];
  setVariables: React.Dispatch<React.SetStateAction<Variable[]>>;
}

const VariablesContext = createContext<VariablesContextType | undefined>(
  undefined,
);

export const VariablesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [variables, setVariables] = useState<Variable[]>([]);

  return (
    <VariablesContext.Provider value={{ variables, setVariables }}>
      {children}
    </VariablesContext.Provider>
  );
};

export const useVariables = (): VariablesContextType => {
  const context = useContext(VariablesContext);

  if (!context) {
    throw new Error("useVariables must be used within a VariablesProvider");
  }

  return context;
};
