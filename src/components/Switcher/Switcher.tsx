"use client";

import { ChangeEvent, FC } from "react";

interface SwitcherProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  defaultValue: string;
}

const optionClassName =
  "cursor-pointer select-none text-center w-1/2 transition py-1";

const Switcher: FC<SwitcherProps> = ({
  name,
  onChange,
  options,
  defaultValue,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void =>
    onChange(event.currentTarget.value);

  return (
    <div className="flex py-1 items-center">
      <div className="relative inline-flex items-center w-28 bg-gray-300 rounded-full cursor-pointer">
        <input
          defaultChecked={options[0] === defaultValue}
          name={name}
          id={options[0]}
          value={options[0]}
          type="radio"
          hidden
          onChange={handleChange}
        />
        <label htmlFor={options[0]} className={`${optionClassName} left-4`}>
          {options[0]}
        </label>
        <input
          defaultChecked={options[1] === defaultValue}
          name={name}
          value={options[1]}
          id={options[1]}
          type="radio"
          className="peer"
          hidden
          onChange={handleChange}
        />
        <label htmlFor={options[1]} className={`${optionClassName} right-4`}>
          {options[1]}
        </label>
        <div className="absolute h-full w-14 bg-primary rounded-full shadow transform transition-transform duration-300 ease-in-out translate-x-0 peer-checked:translate-x-full"></div>
      </div>
    </div>
  );
};

export default Switcher;
