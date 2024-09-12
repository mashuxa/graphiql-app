"use client";

import { FC } from "react";
import { useSelector } from "react-redux";
import Button from "src/components/Button/Button";
import HeadersListItem from "src/components/HeadersList/HeadersListItem/HeadersListItem";
import { useAppDispatch } from "src/store/hooks";
import { RootState } from "src/store/store";
import { setVariables } from "src/store/variablesSlice";
import { ArgType, newItem, replaceUrlData } from "src/utils/headersUtils";

const VariablesList: FC = () => {
  const dispatch = useAppDispatch();
  const body = useSelector((state: RootState) => state.body.body);
  const variables = useSelector(
    (state: RootState) => state.variables.variables,
  );

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
          className="bg-neutral-50"
        >
          ➕
        </Button>
      </div>
    </>
  );
};

export default VariablesList;
