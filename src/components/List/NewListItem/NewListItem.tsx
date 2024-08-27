import React, { LiHTMLAttributes, useState } from "react";

interface NewListItemProps<T> extends LiHTMLAttributes<HTMLLIElement> {
  defaultData: T;
  itemRender: React.FC<{ itemData: T }>;
  className: string;
  updateData: (id: string, item: T) => void;
}

const NewListItem = <T,>({
  defaultData,
  itemRender,
  className,
  updateData,
  ...rest
}: NewListItemProps<T>): React.ReactNode => {
  const [values, setValues] = useState<T>(defaultData);
  const handleLiItemChange = (e: React.ChangeEvent<HTMLLIElement>): void => {
    if (e.target instanceof HTMLInputElement) {
      const { name } = e.target;
      const newValues = {
        ...values,
        [name]: e.target.value,
      };

      setValues(newValues);
    }
  };
  const liClassName = className;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    updateData("new", values);
    setValues(defaultData);
    e.currentTarget.querySelector("input")?.focus();
  };

  return (
    <>
      <form autoFocus onSubmit={handleSubmit}>
        <li
          className={liClassName}
          key="new"
          onChange={handleLiItemChange}
          {...rest}
        >
          {itemRender({ itemData: values })}
        </li>
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default NewListItem;
