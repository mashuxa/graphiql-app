"use client";

import { ChangeEvent, FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { setMethod } from "src/store/methodSlice";
import { HttpMethod, httpMethodList } from "src/types";
import { ArgType, getUrlData, replaceUrlData } from "src/utils/headersUtils";

const MethodSelector: FC = () => {
  const value = useAppSelector((state) => state.method.method);
  const dispatch = useAppDispatch();

  const handleChange = ({
    currentTarget,
  }: ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setMethod(currentTarget.value as HttpMethod));
    replaceUrlData(ArgType.method, currentTarget.value);
  };

  useEffect(() => {
    const defaultValue = getUrlData().method;

    if (defaultValue) {
      dispatch(setMethod(defaultValue as HttpMethod));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <select
      className="cursor-pointer font-medium p-2 focus:outline-primary"
      name="method"
      value={value}
      onChange={handleChange}
    >
      {httpMethodList.map((method) => (
        <option key={method} value={method}>
          {method}
        </option>
      ))}
    </select>
  );
};

export default MethodSelector;
