import { ChangeEvent, LiHTMLAttributes } from "react";

interface ListItemsProps<T> extends LiHTMLAttributes<HTMLLIElement> {
  data: T[];
  itemRender: React.FC<{ itemData: T }>;
  updateData: (id: string, item: T) => void;
}

const ListItems = <T extends { key: string; id: string }>({
  data,
  itemRender,
  updateData,
  ...rest
}: ListItemsProps<T>): React.ReactNode => {
  const liClassName = "flex gap-2 justify-between";

  const handleChange = (e: ChangeEvent<HTMLLIElement>): void => {
    if (e.target instanceof HTMLInputElement) {
      const id = e.currentTarget.getAttribute("id") || "";
      const { name, value } = e.target;
      const i = data.findIndex((element) => element.id === id);
      const newItem = { ...data[i], [name]: value };

      updateData(id, newItem);
    }
  };

  return data.map((item) => {
    return (
      <li
        className={liClassName}
        key={item.id}
        {...rest}
        id={item.id}
        onChange={handleChange}
      >
        {itemRender({ itemData: item })}
      </li>
    );
  });
};

export default ListItems;
