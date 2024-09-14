"use client";

import { FC } from "react";
import Button from "src/components/Button/Button";
import Details from "src/components/Details/Details";
import HeadersListItem from "src/components/HeadersList/HeadersListItem/HeadersListItem";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { setVariables } from "src/store/variablesSlice";
import { ArgType, newItem, replaceUrlData } from "src/utils/headersUtils";

const VariablesList: FC = () => {
  const dispatch = useAppDispatch();
  const body = useAppSelector((state) => state.body.body);
  const variables = useAppSelector((state) => state.variables.variables);

  const handleAddVariable = (): void => {
    dispatch(setVariables([...variables, newItem()]));
  };

  const handleRemoveVariable = (index: number): void => {
    dispatch(setVariables(variables.filter((_, i) => i !== index)));
  };

  const handleVariableChange = (
    index: number,
    field: "key" | "value",
    value: string,
  ): void => {
    const newVariables = [...variables];

    newVariables[index] = {
      ...newVariables[index],
      [field]: value,
    };

    dispatch(setVariables(newVariables));
  };

  const handleBlur = (): void => {
    replaceUrlData(ArgType.body, body, variables);
  };

  return (
    <Details title="Variables">
      <div className="flex">
        <div className="flex-grow pr-6 space-y-2">
          {variables.map((variable, index) => (
            <HeadersListItem
              key={variable.id}
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
          className="bg-neutral-50 text-secondary"
        >
          +
        </Button>
      </div>
    </Details>
  );
};

export default VariablesList;
