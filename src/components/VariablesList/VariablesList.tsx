"use client";

import { FC } from "react";
import Button from "src/components/Button/Button";
import HeadersListItem from "src/components/HeadersList/HeadersListItem/HeadersListItem";
import { useGlobalState } from "src/context/VariablesContext";
import { ArgType, replaceUrlData } from "src/utils/headersUtils";

const VariablesList: FC = () => {
  const { body, variables, setVariables } = useGlobalState();

  const handleAddVariable = (): void => {
    setVariables([...variables, { key: "", value: "" }]);
  };

  const handleRemoveVariable = (index: number): void => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const handleVariableChange = (
    index: number,
    field: "key" | "value",
    value: string,
  ): void => {
    const newVariables = [...variables];

    newVariables[index][field] = value;

    setVariables(newVariables);
    console.log(variables);
  };

  const handleBlur = (): void => {
    replaceUrlData(ArgType.body, body, variables);
  };

  return (
    <>
      <div className="flex">
        <div className="flex-grow pr-6">
          {variables.map((variable, index) => (
            <HeadersListItem
              key={index}
              index={index}
              header={variable}
              onChange={handleVariableChange}
              onRemove={handleRemoveVariable}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <Button
          type="button"
          onClick={handleAddVariable}
          className="bg-neutral-50"
        >
          ➕
        </Button>
      </div>
    </>
  );
};

export default VariablesList;
