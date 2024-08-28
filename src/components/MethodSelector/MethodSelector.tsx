import { ChangeEvent, FC, useEffect, useState } from "react";
import { HttpMethod } from "src/types";
import { ArgType, getUrlData, replaceUrlData } from "src/utils/headersUtils";

const methods = Object.values(HttpMethod);
const MethodSelector: FC = () => {
  const [value, setValue] = useState("");
  const handleChange = ({
    currentTarget,
  }: ChangeEvent<HTMLSelectElement>): void => {
    setValue(currentTarget.value);
    replaceUrlData(ArgType.method, currentTarget.value);
  };

  useEffect(() => {
    const defaultValue = getUrlData().method;

    if (defaultValue) {
      setValue(defaultValue);
    }
  }, []);

  return (
    <select
      className="cursor-pointer font-medium p-2 focus:outline-primary"
      name="method"
      value={value}
      onChange={handleChange}
    >
      {methods.map((method) => (
        <option key={method} value={method}>
          {method}
        </option>
      ))}
    </select>
  );
};

export default MethodSelector;
